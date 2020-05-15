import Matter from 'matter-js';
import 'matter-dom-plugin';
import debounce from 'debounce';

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

    // create engine
    let engine = Engine.create({
        timing: {
            timeScale: 0.4,
        },
    });
    let world = engine.world;

    // create renderer
    let render = RenderDom.create({
        engine: engine,
    });
    RenderDom.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    let startPositions = {
        joris: {x: 200, y: -600},
        noordermeer: {x: 600, y: -700},
    };

    // Create objects
    let joris = DomBodies.block(startPositions.joris.x, startPositions.joris.y, {
        Dom: {render, element: options.elements.joris},
        chamfer: {radius: 6},
        frictionAir: 0.09,
    });

    let noordermeer = DomBodies.block(startPositions.noordermeer.x, startPositions.noordermeer.y, {
        Dom: {render, element: options.elements.noordermeer},
        chamfer: {radius: 6},
        frictionAir: 0.09,
    });

    let webDevelopment = DomBodies.block(windowWidth / 2, -300, {
        Dom: {render, element: options.elements.webDevelopment},
        chamfer: {radius: 6},
        collisionFilter: {
            mask: 0x0002,
        },
        frictionAir: 0.09,
    });

    // Create Walls
    let wallBottom = DomBodies.block(windowWidth / 2, windowHeight - 20, {
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
            render: {
                visible: true,
            },
        },
    });
    World.add(world, MouseConstraint);

    // Rotate bodies on start
    DomBody.rotate(noordermeer, -Math.PI / 6);
    DomBody.rotate(joris, Math.PI / 12);
    DomBody.rotate(webDevelopment, Math.PI / 6);

    // Remove Webdev once it's out
    Events.on(runner, 'tick', checkWebDev);

    function checkWebDev() {
        if (render.mapping.worldToView(webDevelopment.position.y) > windowHeight * 1.5) {
            Matter.Composite.remove(world, webDevelopment);
            options.callbacks.removeWebdev();
            Events.off(runner, 'tick', checkWebDev);
        }
    }

    // Bind mouse events
    Events.on(MouseConstraint, 'startdrag', options.callbacks.startdrag);
    Events.on(MouseConstraint, 'enddrag', options.callbacks.enddrag);

    // Listen to window resize
    window.addEventListener('resize', debounce(resizeCanvas, 200));
    function resizeCanvas() {


        if(windowHeight > window.innerHeight) {
            DomBody.applyForce(joris, {x: joris.position.x, y: joris.position.y}, {x: 0, y: -0.03});
            DomBody.applyForce(noordermeer, {x: noordermeer.position.x, y: noordermeer.position.y}, {x: 0, y: -0.09});
        }

        // var h = window.height;
        // var w = window.width;
        // console.log(render);
        // World.bounds.max.x = windowHeight;
        // World.bounds.max.y = window.innerHeight;

        // let ratioHeight = window.innerHeight / render.mapping.worldToView(wallBottom.position.y);

        DomBody.setPosition(wallBottom, {
            x: render.mapping.viewToWorld(window.innerWidth / 2),
            y: render.mapping.viewToWorld(window.innerHeight),
        });

        DomBody.setPosition(wallRight, {
            x: render.mapping.viewToWorld(window.innerWidth),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });

        DomBody.setPosition(wallLeft, {
            x: render.mapping.viewToWorld(0),
            y: render.mapping.viewToWorld(window.innerHeight / 2),
        });

        // Matter.Composite.remove(world, wallBottom);
        // wallBottom = DomBodies.block(window.innerWidth / 2, window.innerHeight - 20, {
        //     Dom: {render, element: options.elements.wallBottom}, isStatic: true,
        // });
        // World.add(world, [wallBottom]);


        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;



        // DomBody.setPosition(joris, {
        //     x: render.mapping.viewToWorld(startPositions.joris.x),
        //     y: render.mapping.viewToWorld(startPositions.joris.y),
        // });
        // DomBody.setPosition(noordermeer, {
        //     x: render.mapping.viewToWorld(startPositions.noordermeer.x),
        //     y: render.mapping.viewToWorld(startPositions.noordermeer.y),
        // });
    }
}


