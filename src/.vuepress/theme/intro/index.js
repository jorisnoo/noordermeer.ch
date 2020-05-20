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

    let introState = {
        previousWindowHeight: window.innerHeight,
        blocksHavePassedContentArea: false,
        webDevLeft: false,
        blockData: {},
        blocks: {},
        walls: {},
        domSizes: getDomElementSizes(options.elements),
    };

    // create engine
    let engine = Engine.create({
        timing: {
            timeScale: 0.5,
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
        };
    };

    const wallBodies = (blockData) => {
        return {
            wallBottom: wallBody(blockData.wallBottom),
            wallTop: wallBody(blockData.wallTop),
            // wallDoubleTop: wallBody(blockData.wallDoubleTop),
            wallLeft: wallBody(blockData.wallLeft),
            wallRight: wallBody(blockData.wallRight),
        };
    };

    const initWorld = () => {
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);

        introState.blockData = calculateBlockData();
        introState.blocks = blocks(introState.blockData);
        introState.walls = wallBodies(introState.blockData);

        World.add(world, [
            ...Object.values(introState.blocks),
            ...Object.values(introState.walls),
            MouseConstraint,
        ]);

        // Rotate bodies on start
        DomBody.rotate(introState.blocks.joris, introState.blockData.joris.rotation);
        DomBody.rotate(introState.blocks.noordermeer, introState.blockData.noordermeer.rotation);
        DomBody.rotate(introState.blocks.webDevelopment, introState.blockData.webDevelopment.rotation);
    };
    initWorld();

    /*
     * Resize Event
     */
    const resizeWalls = () => {
        Matter.Composite.remove(world, Object.values(introState.walls));
        introState.blockData = calculateBlockData();
        introState.walls = wallBodies(introState.blockData);
        World.add(world, Object.values(introState.walls));
    };

    const resizeBlocks = () => {
        let newDomSizes = getDomElementSizes(options.elements);

        ['joris', 'noordermeer', 'webDevelopment'].forEach(block => {
            DomBody.scale(introState.blocks[block],
                newDomSizes[block].width / introState.domSizes[block].width,
                newDomSizes[block].height / introState.domSizes[block].height,
            );
        });

        introState.domSizes = newDomSizes;
    };

    const resizeWorld = debounce(200, () => {
        resizeWalls();
        resizeBlocks();
        setGravity();
    });

    // Listen to window resize
    window.addEventListener('resize', resizeWorld);


    /*
     * Catch fleeing blocks
     */
    const catchFleeingBlocks = throttle(500, () => {
        ['joris', 'noordermeer', 'webDevelopment'].forEach(block => {
            if (Math.abs(render.mapping.worldToView(introState.blocks[block].position.y)) > window.innerHeight * 3) {

                if (block === 'webDevelopment') {
                    // We'll loose "webDevelopment" once its out
                    Matter.Composite.remove(world, introState.blocks[block]);
                } else {

                    introState.blockData = calculateBlockData();
                    DomBody.setPosition(introState.blocks[block], {
                        x: render.mapping.viewToWorld(introState.blockData[block].x),
                        y: render.mapping.viewToWorld(introState.blockData[block].y),
                    });
                    if (introState.blockData[block].rotation) {
                        DomBody.rotate(introState.blocks[block], introState.blockData[block].rotation - introState.blocks[block].angle);
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
                && render.mapping.worldToView(introState.blocks.joris.position.y) < window.innerHeight * 0.5
                && render.mapping.worldToView(introState.blocks.noordermeer.position.y) < window.innerHeight * 0.5)
            ||
            (!isMobile()
                && render.mapping.worldToView(introState.blocks.joris.position.y) > window.innerHeight * 0.5
                && render.mapping.worldToView(introState.blocks.noordermeer.position.y) > window.innerHeight * 0.5)
        ) {
            options.callbacks.end();
            Events.off(runner, 'tick', checkIfBlocksHavePassedCenter);
        }
    });

    Events.on(runner, 'tick', checkIfBlocksHavePassedCenter);
}



