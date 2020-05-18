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
    Runner.run(runner, engine);

    let startPositions = {
        joris: {x: 200, y: -600},
        noordermeer: {x: 600, y: -700},
        webDevelopment: {x: windowWidth * 0.5, y: -300},
    };
    calculateStartPositions();

    let frictionAir = 0.1;

    // Create objects
    let joris = DomBodies.block(startPositions.joris.x, startPositions.joris.y, {
        Dom: {render, element: options.elements.joris},
        chamfer: {radius: 6},
        frictionAir,
    });

    let noordermeer = DomBodies.block(startPositions.noordermeer.x, startPositions.noordermeer.y, {
        Dom: {render, element: options.elements.noordermeer},
        chamfer: {radius: 6},
        frictionAir,
    });

    let webDevelopment = DomBodies.block(startPositions.webDevelopment.x, startPositions.webDevelopment.y, {
        Dom: {render, element: options.elements.webDevelopment},
        chamfer: {radius: 6},
        collisionFilter: {mask: 0x0002},
        frictionAir,
    });

    // Create Walls
    let wallBottom = DomBodies.block(windowWidth / 2, windowHeight - 22, {
        Dom: {render, element: options.elements.wallBottom}, isStatic: true,
    });
    let wallLeft = DomBodies.block(-1, windowHeight / 2, {
        Dom: {render, element: options.elements.wallLeft}, isStatic: true,
    });
    let wallRight = DomBodies.block(windowWidth, windowHeight / 2, {
        Dom: {render, element: options.elements.wallRight}, isStatic: true,
    });

    World.add(world, [
        joris,
        noordermeer,
        webDevelopment,
        wallBottom,
        wallLeft,
        wallRight,
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
    DomBody.rotate(noordermeer, -Math.PI / 6);
    DomBody.rotate(joris, Math.PI / 12);
    DomBody.rotate(webDevelopment, Math.PI / 6);

    // Bind tick event
    Events.on(runner, 'tick', throttle(500, checkBlockPositions));

    // Bind mouse events
    Events.on(MouseConstraint, 'startdrag', options.callbacks.startdrag);
    Events.on(MouseConstraint, 'enddrag', options.callbacks.enddrag);

    // Listen to window resize
    window.addEventListener('resize', debounce(200, resizeCanvas));

    function checkBlockPositions() {
        // Remove the "Web Development" block once it fell down
        if (render.mapping.worldToView(webDevelopment.position.y) > windowHeight * 1.5) {
            Matter.Composite.remove(world, webDevelopment);
            options.callbacks.removeWebdev();
        }

        // Revert the positions of the others in case the fall down
        if (render.mapping.worldToView(joris.position.y) > windowHeight * 3) {
            calculateStartPositions();
            DomBody.setPosition(joris, {
                x: render.mapping.viewToWorld(startPositions.joris.x),
                y: render.mapping.viewToWorld(startPositions.joris.y),
            });
        }
        if (render.mapping.worldToView(noordermeer.position.y) > windowHeight * 3) {
            calculateStartPositions();
            DomBody.setPosition(noordermeer, {
                x: render.mapping.viewToWorld(startPositions.noordermeer.x),
                y: render.mapping.viewToWorld(startPositions.noordermeer.y),
            });
        }

        if(!blocksHaveReachedFloor
            && render.mapping.worldToView(joris.position.y) > windowHeight * 0.75
            && render.mapping.worldToView(noordermeer.position.y) > windowHeight * 0.75
        ) {
            blocksHaveReachedFloor = true;
            options.callbacks.end();
        }
    }

    function resizeCanvas() {
        // Push up the blocks on resize
        if (windowHeight > window.innerHeight && windowWidth > window.innerWidth) {
            DomBody.applyForce(joris, {x: joris.position.x, y: joris.position.y}, {x: -0.01, y: -0.03});
            DomBody.applyForce(noordermeer, {x: noordermeer.position.x, y: noordermeer.position.y}, {
                x: -0.01,
                y: -0.09,
            });
        } else if (windowHeight > window.innerHeight) {
            DomBody.applyForce(joris, {x: joris.position.x, y: joris.position.y}, {x: 0, y: -0.03});
            DomBody.applyForce(noordermeer, {x: noordermeer.position.x, y: noordermeer.position.y}, {
                x: 0,
                y: -0.09,
            });
        } else if (windowWidth > window.innerWidth) {
            DomBody.applyForce(joris, {x: joris.position.x, y: joris.position.y}, {x: -0.01, y: -0.005});
            DomBody.applyForce(noordermeer, {x: noordermeer.position.x, y: noordermeer.position.y}, {
                x: -0.03,
                y: -0.01,
            });
        }

        if (windowHeight > window.innerHeight || windowWidth > window.innerWidth) {
            setTimeout(resizeWalls, 300);
        } else {
            resizeWalls();
        }

        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
    }

    function resizeWalls() {
        DomBody.setPosition(wallBottom, {
            x: render.mapping.viewToWorld(window.innerWidth / 2),
            y: render.mapping.viewToWorld(window.innerHeight - 22),
        });

        DomBody.setPosition(wallRight, {
            x: render.mapping.viewToWorld(window.innerWidth),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });

        DomBody.setPosition(wallLeft, {
            x: render.mapping.viewToWorld(0),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });
    }

    function calculateStartPositions() {
        startPositions.joris.x = 32 + options.elements.joris.offsetWidth / 2;
        startPositions.noordermeer.x = document.querySelector('#right-side').offsetLeft - 32 + options.elements.noordermeer.offsetWidth / 2;
    }
}



