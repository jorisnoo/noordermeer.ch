import Matter from 'matter-js';
import 'matter-dom-plugin';
import { throttle, debounce } from 'throttle-debounce';

export default function intro(options) {

    Matter.use('matter-dom-plugin');

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body;
    let Events = Matter.Events;
    var RenderDom = Matter.RenderDom;
    var DomBodies = Matter.DomBodies;
    var DomBody = Matter.DomBody;
    // var MouseConstraint = Matter.MouseConstraint;
    var DomMouseConstraint = Matter.DomMouseConstraint;
    var Mouse = Matter.Mouse;

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let blocksHaveReachedFloor = false;

    // create engine
    let engine = Engine.create({timing: {timeScale: 0.4}});
    let world = engine.world;

    // create renderer
    let render = RenderDom.create({engine});
    RenderDom.run(render);

    // create runner
    let runner = Runner.create();
    startEngine();

    let startPositions = {
        joris: {x: 200, y: -600, rotation: Math.PI / 12},
        noordermeer: {x: 600, y: -700, rotation: -Math.PI / 6},
        webDevelopment: {x: windowWidth * 0.5, y: -300, rotation: Math.PI / 6},
    };
    calculateStartPositions();

    let frictionAir = 0.1;

    // Create objects
    let blocks = {

        joris: DomBodies.block(startPositions.joris.x, startPositions.joris.y, {
            Dom: {render, element: options.elements.joris},
            chamfer: {radius: 6},
            frictionAir,
        }),

        noordermeer: DomBodies.block(startPositions.noordermeer.x, startPositions.noordermeer.y, {
            Dom: {render, element: options.elements.noordermeer},
            chamfer: {radius: 6},
            frictionAir,
        }),

        webDevelopment: DomBodies.block(startPositions.webDevelopment.x, startPositions.webDevelopment.y, {
            Dom: {render, element: options.elements.webDevelopment},
            chamfer: {radius: 6},
            collisionFilter: {mask: 0x0002},
            frictionAir,
        }),

        // Create Walls
        wallBottom: DomBodies.block(windowWidth / 2, windowHeight - 22, {
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
        constraint: {
            stiffness: 0.003,
            render: {visible: false},
        },
    });
    World.add(world, MouseConstraint);

    // Rotate bodies on start
    DomBody.rotate(blocks.joris, startPositions.joris.rotation);
    DomBody.rotate(blocks.noordermeer, startPositions.noordermeer.rotation);
    DomBody.rotate(blocks.webDevelopment, startPositions.webDevelopment.rotation);

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

        if(!blocksHaveReachedFloor
            && render.mapping.worldToView(blocks.joris.position.y) > windowHeight * 0.75
            && render.mapping.worldToView(blocks.noordermeer.position.y) > windowHeight * 0.75
        ) {
            blocksHaveReachedFloor = true;
            options.callbacks.end();
        }
    }

    function resizeCanvas() {
        if(window.innerWidth < 1024 && runner.enabled) {
            stopEngine();
            reInsertBlock('joris');
            reInsertBlock('noordermeer');
        } else if (window.innerWidth >= 1024 && !runner.enabled) {
            startEngine();
            reInsertBlock('joris');
            reInsertBlock('noordermeer');
            return;
        }

        if (window.innerWidth < 1024) {
            return;
        }

        // Push up the blocks on resize
        if (windowHeight > window.innerHeight && windowWidth > window.innerWidth) {
            DomBody.applyForce(blocks.joris, {x: blocks.joris.position.x, y: blocks.joris.position.y}, {x: -0.01, y: -0.03});
            DomBody.applyForce(blocks.noordermeer, {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y}, {
                x: -0.01,
                y: -0.09,
            });
        } else if (windowHeight > window.innerHeight) {
            DomBody.applyForce(blocks.joris, {x: blocks.joris.position.x, y: blocks.joris.position.y}, {x: 0, y: -0.03});
            DomBody.applyForce(blocks.noordermeer, {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y}, {
                x: 0,
                y: -0.09,
            });
        } else if (windowWidth > window.innerWidth) {
            DomBody.applyForce(blocks.joris, {x: blocks.joris.position.x, y: blocks.joris.position.y}, {x: -0.01, y: -0.005});
            DomBody.applyForce(blocks.noordermeer, {x: blocks.noordermeer.position.x, y: blocks.noordermeer.position.y}, {
                x: -0.01,
                y: -0.01,
            });
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

    function reInsertBlock(block) {
        calculateStartPositions();
        DomBody.setPosition(blocks[block], {
            x: render.mapping.viewToWorld(startPositions[block].x),
            y: render.mapping.viewToWorld(startPositions[block].y),
        });
        DomBody.rotate(blocks[block], startPositions[block].rotation - blocks[block].angle);
    }

    function calculateStartPositions() {
        startPositions.joris.x = 32 + options.elements.joris.offsetWidth / 2;
        startPositions.noordermeer.x = document.querySelector('#right-side').offsetLeft - 32 + options.elements.noordermeer.offsetWidth / 2;
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



