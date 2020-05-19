import Matter from 'matter-js';
import 'matter-dom-plugin';
import {throttle, debounce} from 'throttle-debounce';

export default function intro(options) {
    Matter.use('matter-dom-plugin');

    let Engine = Matter.Engine,
        Runner = Matter.Runner,
        World = Matter.World,
        Events = Matter.Events,
        RenderDom = Matter.RenderDom,
        DomBodies = Matter.DomBodies,
        Bodies = Matter.Bodies,
        DomBody = Matter.DomBody,
        DomMouseConstraint = Matter.DomMouseConstraint,
        Mouse = Matter.Mouse;

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let isMobile = windowWidth < 1024;
    let blocksHavePassedContentArea, introHasRun = false;

    // create engine
    let engine = Engine.create({timing: {timeScale: 0.4}});
    let world = engine.world;

    // create renderer
    let render = RenderDom.create({engine});
    RenderDom.run(render);

    // create runner
    let runner = Runner.create();
    startEngine();

    let blockData = {};
    const calculateBlockData = () => {
        blockData = {
            joris: {
                x: isMobile ? windowWidth * 0.3 : 32 + options.elements.joris.offsetWidth / 2,
                y: isMobile ? -700 : -600,
                rotation: Math.PI / 12,
                collisionFilter: {category: 0x0002},
            },
            noordermeer: {
                x: isMobile ? windowWidth * 0.6 : document.querySelector('#right-side').offsetLeft - 32 + options.elements.noordermeer.offsetWidth / 2,
                y: isMobile ? -600 : -700,
                rotation: -Math.PI / 6,
                collisionFilter: {category: 0x0002},
            },
            webDevelopment: {
                x: windowWidth * 0.5,
                y: -300,
                rotation: Math.PI / 6,
                collisionFilter: {category: 0x0004},
            },
            wallBottom: {x: windowWidth * 0.5, y: windowHeight - 22, width: windowWidth, height: 1},
            wallLeft: {x: -1, y: windowHeight * 0.5, width: 1, height: windowHeight},
            wallRight: {x: windowWidth, y: windowHeight * 0.5, width: 1, height: windowHeight},
        };
    };
    calculateBlockData();

    const domBody = (blockData, element) => {
        return DomBodies.block(blockData.x, blockData.y, {
            Dom: {render, element},
            chamfer: {radius: 6},
            collisionFilter: blockData.collisionFilter,
            frictionAir: 0.1,
        });
    };

    const wallBody = (blockData) => {
        return Bodies.rectangle(
            render.mapping.viewToWorld(blockData.x),
            render.mapping.viewToWorld(blockData.y),
            blockData.width === 1 ? 1 : render.mapping.viewToWorld(blockData.width),
            blockData.height === 1 ? 1 : render.mapping.viewToWorld(blockData.height),
            {
                isStatic: true,
                // Walls only collide with blocks if on desktop
                collisionFilter: {mask: isMobile ? 0x0001 : 0x0001 | 0x0002},
            },
        );
    };

    let blocks = {
        // Add objects
        joris: domBody(blockData.joris, options.elements.joris),
        noordermeer: domBody(blockData.noordermeer, options.elements.noordermeer),
        webDevelopment: domBody(blockData.webDevelopment, options.elements.webDevelopment),
        // Add Walls
        wallBottom: wallBody(blockData.wallBottom),
        wallLeft: wallBody(blockData.wallLeft),
        wallRight: wallBody(blockData.wallRight),
    };

    World.add(world, Object.values(blocks));

    // Add mouse control
    let mouse = Mouse.create(document.body);
    let MouseConstraint = DomMouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {stiffness: 0.003},
    });
    World.add(world, MouseConstraint);

    // Rotate bodies on start
    DomBody.rotate(blocks.joris, blockData.joris.rotation);
    DomBody.rotate(blocks.noordermeer, blockData.noordermeer.rotation);
    DomBody.rotate(blocks.webDevelopment, blockData.webDevelopment.rotation);

    // Bind mouse events
    Events.on(MouseConstraint, 'startdrag', options.callbacks.startdrag);
    Events.on(MouseConstraint, 'enddrag', options.callbacks.enddrag);

    // Listen to window resize
    window.addEventListener('resize', debounce(200, resizeCanvas));


    function checkBlockPositions() {
        // Remove the "Web Development" block once it fell down
        if (render.mapping.worldToView(blocks.webDevelopment.position.y) > windowHeight * 1.5) {
            Matter.Composite.remove(world, blocks.webDevelopment);
            options.callbacks.removeWebdev();
        }

        // Revert the positions of the others in case the fall down
        if (render.mapping.worldToView(blocks.joris.position.y) > windowHeight * 3) {
            reInsertBlock('joris');
        }
        if (render.mapping.worldToView(blocks.noordermeer.position.y) > windowHeight * 3) {
            reInsertBlock('noordermeer');
        }

        if (!blocksHavePassedContentArea
            && render.mapping.worldToView(blocks.joris.position.y) > Math.min(500, windowHeight * 0.75)
            && render.mapping.worldToView(blocks.noordermeer.position.y) > Math.min(500, windowHeight * 0.75)
        ) {
            blocksHavePassedContentArea = true;
            options.callbacks.end();
            if (!isMobile) {
                introHasRun = true;
                options.callbacks.endOnMobile();
            }
        }

        if (!introHasRun
            && isMobile
            && render.mapping.worldToView(blocks.joris.position.y) > windowHeight * 1.5
            && render.mapping.worldToView(blocks.noordermeer.position.y) > windowHeight * 1.5
        ) {
            introHasRun = true;
            options.callbacks.endOnMobile();
            stopEngine();
        }
    }

    function resizeCanvas() {
        if (window.innerWidth < 1024 && runner.enabled && introHasRun) {
            stopEngine();
            toggleMobileView();
        } else if (window.innerWidth >= 1024 && !runner.enabled) {
            startEngine();
            toggleMobileView();
            return;
        }

        if (window.innerWidth < 1024) {
            return;
        }

        // Push up the blocks on resize
        if (windowHeight > window.innerHeight && windowWidth > window.innerWidth) {
            DomBody.applyForce(blocks.joris,
                {x: blocks.joris.position.x, y: blocks.joris.position.y},
                {x: -0.01, y: -0.03},
            );
            DomBody.applyForce(blocks.noordermeer,
                {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y},
                {x: -0.01, y: -0.09},
            );
        } else if (windowHeight > window.innerHeight) {
            DomBody.applyForce(blocks.joris,
                {x: blocks.joris.position.x, y: blocks.joris.position.y},
                {x: 0, y: -0.03},
            );
            DomBody.applyForce(blocks.noordermeer,
                {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y},
                {x: 0, y: -0.09},
            );
        } else if (windowWidth > window.innerWidth) {
            DomBody.applyForce(blocks.joris,
                {x: blocks.joris.position.x, y: blocks.joris.position.y},
                {x: -0.01, y: -0.005},
            );
            DomBody.applyForce(blocks.noordermeer,
                {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y},
                {x: -0.01, y: -0.01},
            );
        }

        if (windowHeight > window.innerHeight || windowWidth > window.innerWidth) {
            setTimeout(resizeWalls, 300);
        } else {
            resizeWalls();
        }

        updateWindowSize();
    }

    function updateWindowSize() {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        isMobile = windowWidth < 1024;
    }

    function resizeWalls() {
        Matter.Composite.remove(world, [
            blocks.wallLeft, blocks.wallRight, blocks.wallBottom,
        ]);

        updateWindowSize();
        calculateBlockData();

        blocks.wallBottom = wallBody(blockData.wallBottom);
        blocks.wallLeft = wallBody(blockData.wallLeft);
        blocks.wallRight = wallBody(blockData.wallRight);

        World.add(world, [
            blocks.wallLeft, blocks.wallRight, blocks.wallBottom,
        ]);
    }

    function toggleMobileView() {
        resizeWalls();
        reInsertBlock('joris');
        reInsertBlock('noordermeer');
    }

    function reInsertBlock(block) {
        calculateBlockData();
        DomBody.setPosition(blocks[block], {
            x: render.mapping.viewToWorld(blockData[block].x),
            y: render.mapping.viewToWorld(blockData[block].y),
        });
        if (blockData[block].rotation) {
            DomBody.rotate(blocks[block], blockData[block].rotation - blocks[block].angle);
        }
    }

    function stopEngine() {
        Runner.stop(runner, engine);
        runner.enabled = false;
        // Stop tick event
        Events.off(runner, 'tick', throttle(500, checkBlockPositions));
    }

    function startEngine() {
        Runner.run(runner, engine);
        runner.enabled = true;
        // Bind tick event
        Events.on(runner, 'tick', throttle(500, checkBlockPositions));
    }
}



