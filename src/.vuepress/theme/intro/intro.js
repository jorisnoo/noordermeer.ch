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
            },
            noordermeer: {
                x: isMobile ? windowWidth * 0.6 : document.querySelector('#right-side').offsetLeft - 32 + options.elements.noordermeer.offsetWidth / 2,
                y: isMobile ? -600 : -700,
                rotation: -Math.PI / 6,
            },
            webDevelopment: {
                x: windowWidth * 0.5,
                y: -300,
                rotation: Math.PI / 6,
                collisionFilter: {mask: 0x0002},
            },
        };
    };
    calculateBlockData();

    const domBody = (name) => {
        return DomBodies.block(blockData[name].x, blockData[name].y, {
            Dom: {render, element: options.elements[name]},
            chamfer: {radius: 6},
            collisionFilter: blockData[name].collisionFilter || {},
            frictionAir: 0.1,
        });
    };

    // Create objects
    let blocks = {
        joris: domBody('joris'),
        noordermeer: domBody('noordermeer'),
        webDevelopment: domBody('webDevelopment'),

        // Create Walls
        wallBottom: DomBodies.block(windowWidth * 0.5, windowHeight - 22, {
            Dom: {render, element: options.elements.wallBottom}, isStatic: true,
        }),
        wallLeft: DomBodies.block(-1, windowHeight / 2, {
            Dom: {render, element: options.elements.wallLeft}, isStatic: true,
        }),
        wallRight: DomBodies.block(windowWidth, windowHeight / 2, {
            Dom: {render, element: options.elements.wallRight}, isStatic: true,
        }),
    };

    World.add(world, [
        blocks.joris,
        blocks.noordermeer,
        blocks.webDevelopment,
        blocks.wallBottom,
        blocks.wallLeft,
        blocks.wallRight,
    ]);

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
                {x: 0,y: -0.09},
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
        DomBody.setPosition(blocks.wallBottom, {
            x: render.mapping.viewToWorld(window.innerWidth / 2),
            y: render.mapping.viewToWorld(window.innerHeight - 22),
        });
        DomBody.setPosition(blocks.wallRight, {
            x: render.mapping.viewToWorld(window.innerWidth),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });
        DomBody.setPosition(blocks.wallLeft, {
            x: render.mapping.viewToWorld(0),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });
    }

    function toggleMobileView() {
        updateWindowSize();
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



