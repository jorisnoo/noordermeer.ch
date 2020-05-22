import Matter from 'matter-js';
import 'matter-dom-plugin';
import {throttle, debounce} from 'throttle-debounce';
import {fixMouseUpTouchEvent} from "./touchmouse";
import {getBlockConfig, domBodyConstructor, wallBodyConstructor, getDomElementSizes} from "./blocks";

export default function runIntro(options) {
    Matter.use('matter-dom-plugin');

    let Engine = Matter.Engine,
        Runner = Matter.Runner,
        World = Matter.World,
        Events = Matter.Events,
        RenderDom = Matter.RenderDom,
        DomBody = Matter.DomBody,
        DomMouseConstraint = Matter.DomMouseConstraint,
        Mouse = Matter.Mouse;

    const isMobile = () => window.innerWidth < 1024;

    let state = {
        previousWindowHeight: window.innerHeight,
        wasOnMobile: isMobile(),
        webDevelopmentBlockIsAround: true,
        blocksHavePassedContentArea: false,
        blockData: {},
        blocks: {},
        walls: {},
        domSizes: getDomElementSizes(options.elements),
    };

    // create engine
    let engine = Engine.create({
        timing: {
            timeScale: 0.7,
        },
    });
    let world = engine.world;

    const setGravity = () => engine.world.gravity.y = isMobile() ? -1 : 1;
    setGravity();

    // create renderer
    let render = RenderDom.create({engine});
    RenderDom.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    /*
     * Mouse
     */
    let mouse = Mouse.create(document.body);
    fixMouseUpTouchEvent(mouse);

    let MouseConstraint = DomMouseConstraint.create(engine, {
        mouse, constraint: {stiffness: 0.003},
    });

    // Bind mouse events
    Events.on(MouseConstraint, 'startdrag', options.callbacks.startdrag);

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
        let newDomSizes = getDomElementSizes(options.elements);

        ['joris', 'noordermeer', 'webDevelopment'].forEach(block => {
            DomBody.scale(state.blocks[block],
                newDomSizes[block].width / state.domSizes[block].width,
                newDomSizes[block].height / state.domSizes[block].height,
            );
        });

        state.domSizes = newDomSizes;
    };

    const pushBlocksUp = () => {
        if (!isMobile() && !state.wasOnMobile && state.previousWindowHeight > window.innerHeight) {
            ['joris', 'noordermeer', ...state.webDevelopmentBlockIsAround ? ['webDevelopment'] : []].forEach(block => {
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

        if(pushBlocksUp()) {
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
    const catchFleeingBlocks = throttle(500, () => {
        ['joris', 'noordermeer', 'webDevelopment'].forEach(block => {
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

    Events.on(runner, 'tick', catchFleeingBlocks);

    /*
     * Wait for blocks to reach the middle of the page
     */
    const checkIfBlocksHavePassedCenter = throttle(500, () => {
        if (
            (isMobile()
                && render.mapping.worldToView(state.blocks.joris.position.y) < window.innerHeight * 0.5
                && render.mapping.worldToView(state.blocks.noordermeer.position.y) < window.innerHeight * 0.5)
            ||
            (!isMobile()
                && render.mapping.worldToView(state.blocks.joris.position.y) > window.innerHeight * 0.5
                && render.mapping.worldToView(state.blocks.noordermeer.position.y) > window.innerHeight * 0.5)
        ) {
            options.callbacks.end();
            Events.off(runner, 'tick', checkIfBlocksHavePassedCenter);
        }
    });

    Events.on(runner, 'tick', checkIfBlocksHavePassedCenter);
}



