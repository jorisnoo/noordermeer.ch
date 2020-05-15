import Matter from 'matter-js';
import 'matter-dom-plugin';

export default function intro(startDrag, endDrag) {

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

    // create engine
    let engine = Engine.create({
        timing: {
            timeScale: 0.3,
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

    let joris = DomBodies.block(200, -400, {
        Dom: {
            render,
            element: document.querySelector('#joris'),
        },
        chamfer: {radius: 6},
        frictionAir: 0.1,
        // frictionAir: 0.3,
    });

    let noordermeer = DomBodies.block(600, -600, {
        Dom: {
            render,
            element: document.querySelector('#noordermeer'),
        },
        chamfer: { radius: 6 },
        frictionAir: 0.1,
    });

    let webdevelopment = DomBodies.block(window.innerWidth / 2, -300, {
        Dom: {
            render,
            element: document.querySelector('#webdevelopment'),
        },
        chamfer: { radius: 6 },
        collisionFilter: {
            mask: 0x0002,
        },
        frictionAir: 0.1,
    });

    World.add(world, [

        joris,
        noordermeer,
        webdevelopment,

        DomBodies.block(window.innerWidth / 2, window.innerHeight - 20, {
            Dom: {
                render, element: document.querySelector('#wall-bottom'),
            }, isStatic: true,
        }),
        DomBodies.block(-1, 0, {
            Dom: {
                render, element: document.querySelector('#wall-left'),
            }, isStatic: true,
        }),
        DomBodies.block(window.innerWidth, 0, {
            Dom: {
                render, element: document.querySelector('#wall-right'),
            }, isStatic: true,
        }),
    ]);

    DomBody.rotate(noordermeer, -Math.PI/6);
    DomBody.rotate(joris, Math.PI/12);
    DomBody.rotate(webdevelopment, Math.PI/6);

    /** Mouse control **/
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

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    // var counter = 0;
    // // Events.on(runner, 'beforeUpdate', spin);
    //
    // function spin() {
    //     if(counter<10) {
    //         counter += 1;
    //         DomBody.setAngularVelocity(noordermeer, -0.1/counter);
    //         DomBody.setAngularVelocity(joris, 0.1/counter);
    //     } else {
    //         Events.off(runner, 'beforeUpdate', spin);
    //     }
    // }

    Events.on(MouseConstraint, 'startdrag', startDrag);
    Events.on(MouseConstraint, 'enddrag', endDrag);

    // engine.timing.timeScale = 0.2;

    // add bodies
    // World.add(world, [
    //     // falling blocks
    //     Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
    //     Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
    //     Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),
    //
    //     Bodies.ele
    //
    //     // walls
    //     // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    //     // Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    //     // Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    //     // Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    // ]);


    // World.add(world);


    // fit the render viewport to the scene
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    // });

    // context for MatterTools.Demo
    // return {
    //     engine: engine,
    //     runner: runner,
    //     render: render,
    //     canvas: render.canvas,
    //     stop: function() {
    //         Matter.Render.stop(render);
    //         Matter.Runner.stop(runner);
    //     }
    // };
    return {

    };
};
