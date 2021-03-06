import Matter from 'matter-js';
import { MatterDomPlugin } from 'matter-dom-plugin';
import { throttle, debounce } from 'throttle-debounce';
import { fixMouseUpTouchEvent, changeRelativeMousePosition } from './mouse-fixes.js';
import { getBlockConfig, domBodyConstructor, wallBodyConstructor, getDomElementSizes } from './block-positions.js';

export default function runIntro (options) {
    Matter.use(MatterDomPlugin);

    const Engine = Matter.Engine;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const Events = Matter.Events;
    const RenderDom = Matter.RenderDom;
    const DomBody = Matter.DomBody;
    const DomMouseConstraint = Matter.DomMouseConstraint;
    const Mouse = Matter.Mouse;

    const isMobile = () => window.innerWidth < 1024;

    const state = {
        previousWindowHeight: window.innerHeight,
        wasOnMobile: isMobile(),
        webDevelopmentBlockIsAround: true,
        profileBlockIsAround: false,
        blocksHavePassedContentArea: false,
        blockData: {},
        blocks: {},
        walls: {},
        domSizes: getDomElementSizes(options.elements),
    };

    // create engine
    const engine = Engine.create({
        timing: {
            timeScale: isMobile() ? 0.3 : 0.4,
        },
    });
    const world = engine.world;

    const setGravity = function () {
        engine.world.gravity.y = isMobile() ? -1 : 1;
    };
    setGravity();

    // create renderer
    const render = RenderDom.create({ engine });
    RenderDom.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    /*
     * Mouse
     */
    const AdjustedMouse = changeRelativeMousePosition(Mouse);
    const mouse = AdjustedMouse.create(document.body);
    fixMouseUpTouchEvent(mouse);

    // Remove scroll listeners
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const MouseConstraint = DomMouseConstraint.create(engine, {
        mouse, constraint: { stiffness: 0.003 },
    });

    // Bind mouse events
    Events.on(MouseConstraint, 'startdrag', options.callbacks.startdrag);
    Events.on(MouseConstraint, 'enddrag', options.callbacks.enddrag);

    /*
     * Blocks
     */
    const calculateBlockData = () => getBlockConfig(options.elements);
    const domBody = domBodyConstructor(render);
    const wallBody = wallBodyConstructor(render);

    const blocks = (blockData) => {
        return {
            joris: domBody(blockData.joris),
            noordermeer: domBody(blockData.noordermeer),
            webDevelopment: domBody(blockData.webDevelopment),
            profile: domBody(blockData.profile),
        };
    };

    const wallBodies = (blockData) => {
        return {
            wallBottom: wallBody(blockData.wallBottom),
            wallTop: wallBody(blockData.wallTop),
            wallLeft: wallBody(blockData.wallLeft),
            wallRight: wallBody(blockData.wallRight),
        };
    };

    const initWorld = () => {
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);

        state.blockData = calculateBlockData();
        state.blocks = blocks(state.blockData);
        state.walls = wallBodies(state.blockData);

        World.add(world, [
            ...Object.values(state.blocks),
            ...Object.values(state.walls),
            MouseConstraint,
        ]);

        // Rotate bodies on start
        DomBody.rotate(state.blocks.joris, state.blockData.joris.rotation);
        DomBody.rotate(state.blocks.noordermeer, state.blockData.noordermeer.rotation);
        DomBody.rotate(state.blocks.webDevelopment, state.blockData.webDevelopment.rotation);

        // Freeze image
        Matter.Body.setStatic(state.blocks.profile, true);
    };
    initWorld();

    /*
     * Resize Event
     */
    const resizeWalls = () => {
        Matter.Composite.remove(world, Object.values(state.walls));
        state.blockData = calculateBlockData();
        state.walls = wallBodies(state.blockData);
        World.add(world, Object.values(state.walls));
    };

    const resizeBlocks = () => {
        const newDomSizes = getDomElementSizes(options.elements);

        ['joris', 'noordermeer', 'webDevelopment', 'profile'].forEach((block) => {
            DomBody.scale(state.blocks[block],
                newDomSizes[block].width / state.domSizes[block].width,
                newDomSizes[block].height / state.domSizes[block].height,
            );
        });

        state.domSizes = newDomSizes;
    };

    const pushBlocksUp = () => {
        if (!isMobile() && !state.wasOnMobile && state.previousWindowHeight > window.innerHeight) {
            [
                'joris',
                'noordermeer',
                ...state.profileBlockIsAround ? ['profile'] : [],
                ...state.webDevelopmentBlockIsAround ? ['webDevelopment'] : [],
            ].forEach((block) => {
                DomBody.applyForce(state.blocks[block], state.blocks[block].position, {
                    x: 0, y: -state.blocks[block].mass * 0.1 * Math.max(0.5, Math.random()),
                });
            });
            return true;
        }
    };

    const resizeWorld = debounce(200, () => {
        resizeBlocks();
        setGravity();

        if (pushBlocksUp()) {
            setTimeout(resizeWalls, 300);
        } else {
            resizeWalls();
        }

        // Update state
        state.wasOnMobile = isMobile();
        state.previousWindowHeight = window.innerHeight;
    });

    // Listen to window resize
    window.addEventListener('resize', resizeWorld);

    /*
     * Catch fleeing blocks
     */
    const catchFleeingBlocks = throttle(1000, () => {
        ['joris', 'noordermeer', 'webDevelopment', 'profile'].forEach((block) => {
            if (Math.abs(render.mapping.worldToView(state.blocks[block].position.y)) > window.innerHeight * 3) {
                if (block === 'webDevelopment') {
                    // We'll loose "webDevelopment" once its out
                    Matter.Composite.remove(world, state.blocks[block]);
                    state.webDevelopmentBlockIsAround = false;
                    options.callbacks.removeWebdev();
                } else {
                    state.blockData = calculateBlockData();
                    DomBody.setPosition(state.blocks[block], {
                        x: render.mapping.viewToWorld(state.blockData[block].x),
                        y: render.mapping.viewToWorld(state.blockData[block].y),
                    });
                    if (state.blockData[block].rotation) {
                        DomBody.rotate(state.blocks[block], state.blockData[block].rotation - state.blocks[block].angle);
                    }
                }
            }
        });
    });

    setTimeout(() => {
        Events.on(runner, 'tick', catchFleeingBlocks);
    }, 5000);

    const throwInProfile = () => {
        Matter.Body.setStatic(state.blocks.profile, false);
        state.profileBlockIsAround = true;
    };

    return {
        throwInProfile,
    };

    // setTimeout(() => {
    //     ['joris', 'noordermeer', 'webDevelopment'].forEach((block) => {
    //
    //         const pos = state.blocks[block].position;
    //         // pos.x += 0.2;
    //         DomBody.applyForce(state.blocks[block], pos, {
    //             x: 0, y: -state.blocks[block].mass * 0.01,
    //         });
    //     });
    // }, 5000);

    /*
     * Wait for blocks to reach the middle of the page
     */
    // const checkIfBlocksHavePassedCenter = throttle(500, () => {
    //     if (
    //         (isMobile() &&
    //             render.mapping.worldToView(state.blocks.joris.position.y) < window.innerHeight * 0.5 &&
    //             render.mapping.worldToView(state.blocks.noordermeer.position.y) < window.innerHeight * 0.5) ||
    //         (!isMobile() &&
    //             render.mapping.worldToView(state.blocks.joris.position.y) > window.innerHeight * 0.5 &&
    //             render.mapping.worldToView(state.blocks.noordermeer.position.y) > window.innerHeight * 0.5)
    //     ) {
    //         Events.off(runner, 'tick', checkIfBlocksHavePassedCenter);
    //     }
    // });
    //
    // Events.on(runner, 'tick', checkIfBlocksHavePassedCenter);
}
