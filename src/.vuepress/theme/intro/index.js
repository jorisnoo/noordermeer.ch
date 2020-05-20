import Matter from 'matter-js';
import 'matter-dom-plugin';
import {throttle, debounce} from 'throttle-debounce';
import {decycle} from 'json-decycle';
import {fixMouseUpTouchEvent} from "./touchmouse";
import {getBlockConfig, domBodyConstructor, wallBodyConstructor} from "./blocks";

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
        isOnMobile: isMobile(),
    };

    // create engine
    let engine = Engine.create({
        timing: {
            timeScale: 0.4,
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
            wallLeft: wallBody(blockData.wallLeft),
            wallRight: wallBody(blockData.wallRight),
        };
    };

    const resetWorld = () => {
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
    resetWorld();

    /*
     * Resize Event
     */
    const resizeWalls = () => {
        Matter.Composite.remove(world, Object.values(introState.walls));
        introState.blockData = calculateBlockData();
        introState.walls = wallBodies(introState.blockData);
        World.add(world, Object.values(introState.walls));
    };

    const onResizeCanvas = () => {
        if (isMobile() || !isMobile() && introState.isOnMobile) {
            resetWorld();
        } else {
            resizeWalls();
        }

        setGravity();
        introState.isOnMobile = isMobile();
    };

    // Listen to window resize
    window.addEventListener('resize', debounce(200, onResizeCanvas));

    // check for block positions
    // Events.on(runner, 'tick', throttle(500, checkBlockPositions));


    // TODO
    // function checkBlockPositions() {
    //
    //     // Remove the "Web Development" block once it fell down
    //     if (!webDevLeft && Math.abs(render.mapping.worldToView(blocks.webDevelopment.position.y)) > windowHeight * 3) {
    //         Matter.Composite.remove(world, blocks.webDevelopment);
    //         console.log('webdev left', blocks.webDevelopment.position.y);
    //         webDevLeft = true;
    //         // todo: hide dom element
    //         // options.callbacks.removeWebdev();
    //     }
    //
    //     // Revert the positions of the others in case the fall down
    //     if (Math.abs(render.mapping.worldToView(blocks.joris.position.y)) > windowHeight * 3) {
    //         reInsertBlock(blocks.joris, 'joris');
    //     }
    //     if (Math.abs(render.mapping.worldToView(blocks.noordermeer.position.y)) > windowHeight * 3) {
    //         reInsertBlock(blocks.noordermeer, 'noordermeer');
    //     }
    //
    //
    //     // Todo..
    //     if (!blocksHavePassedContentArea
    //         && render.mapping.worldToView(blocks.joris.position.y) > Math.min(500, windowHeight * 0.75)
    //         && render.mapping.worldToView(blocks.noordermeer.position.y) > Math.min(500, windowHeight * 0.75)
    //     ) {
    //         blocksHavePassedContentArea = true;
    //         options.callbacks.end();
    //
    //         if (!isMobile) {
    //             introHasRun = true;
    //             options.callbacks.endOnMobile();
    //         }
    //         // else {
    //         //     removeTouchEvents();
    //         // }
    //     }
    //
    //     if (!introHasRun
    //         && isMobile
    //         && render.mapping.worldToView(blocks.joris.position.y) > windowHeight * 1.5
    //         && render.mapping.worldToView(blocks.noordermeer.position.y) > windowHeight * 1.5
    //     ) {
    //         introHasRun = true;
    //         options.callbacks.endOnMobile();
    //         // stopEngine();
    //     }
    // }

    // function resizeCanvas() {
    //     // if (window.innerWidth < 1024 && runner.enabled && introHasRun) {
    //     //     stopEngine();
    //     //     toggleMobileView();
    //     // } else if (window.innerWidth >= 1024 && !runner.enabled) {
    //     //     startEngine();
    //     //     toggleMobileView();
    //     //     return;
    //     // }
    //
    //     if (window.innerWidth < 1024) {
    //         toggleMobileView();
    //         return;
    //     }
    //
    //     if (windowHeight > window.innerHeight) {
    //         // Push up the blocks on resize
    //         DomBody.applyForce(blocks.joris,
    //             {x: blocks.joris.position.x, y: blocks.joris.position.y},
    //             {x: 0, y: -0.03},
    //         );
    //         DomBody.applyForce(blocks.noordermeer,
    //             {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y},
    //             {x: 0, y: -0.07},
    //         );
    //
    //         setTimeout(resizeWalls, 300);
    //     } else {
    //         resizeWalls();
    //     }
    //
    //     updateWindowSize();
    // }


    // function toggleMobileView() {
    //     updateWindowSize();
    //     resizeWalls();
    //     reInsertBlock(blocks.joris, 'joris');
    //     reInsertBlock(blocks.noordermeer, 'noordermeer');
    // }

    // function reInsertBlock(block, blockKey) {
    //     Matter.Composite.remove(world, block);
    //     blockData[blockKey].element.style = '';
    //     blockData = calculateBlockData();
    //     blocks[blockKey] = domBody(blockData[blockKey]);
    //     block = blocks[blockKey];
    //     World.add(world, block);
    //     // DomBody.setPosition(block, {
    //     //     x: render.mapping.viewToWorld(blockData.x),
    //     //     y: render.mapping.viewToWorld(blockData.y),
    //     // });
    //     if (blockData[blockKey].rotation) {
    //         DomBody.rotate(block, blockData[blockKey].rotation - block.angle);
    //     }
    // }

    // function stopEngine() {
    //     Runner.stop(runner, engine);
    //     RenderDom.stop(render);
    //     runner.enabled = false;
    //     removeTouchEvents();
    //     // Stop tick event
    //     Events.off(runner, 'tick', throttle(500, checkBlockPositions));
    // }

    // function startEngine() {
    //     RenderDom.run(render);
    //     Runner.run(runner, engine);
    //     runner.enabled = true;
    //     addTouchEvents();
    //     // Bind tick event
    //     Events.on(runner, 'tick', throttle(500, checkBlockPositions));
    // }

    // function addTouchEvents() {
    // if(mouse) {
    //     mouse.element.add('touchstart', mouse.mousedown);
    //     mouse.element.add('touchend', mouse.mouseup);
    //     mouse.element.add('touchmove', mouse.mousemove);
    // }
    // }

    // function removeTouchEvents() {
    // console.log('touch removed 2')
    // if (mouse) {
    //     mouse.element.removeEventListener('touchstart', mouse.mousedown);
    //     mouse.element.removeEventListener('touchend', mouse.mouseup);
    // mouse.element.removeEventListener('touchmove', mouse.mousemove);
    // }
    // }
}



