import Matter from 'matter-js';

export function getBlockConfig(elements) {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let isMobile = windowWidth < 1024;

    return {
        joris: {
            x: isMobile ? windowWidth * 0.3 : 32 + elements.joris.offsetWidth / 2,
            y: isMobile ? windowHeight + windowHeight * 0.7 : -windowHeight * 0.7,
            rotation: Math.PI / 12,
            collisionFilter: {category: 0x0002},
            element: elements.joris,
        },
        noordermeer: {
            x: isMobile ? windowWidth * 0.6 : document.querySelector('#right-side').offsetLeft - 32 + elements.noordermeer.offsetWidth / 2,
            y: isMobile ? windowHeight + 500 : -windowHeight,
            rotation: -Math.PI / 6,
            collisionFilter: {category: 0x0002},
            element: elements.noordermeer,
        },
        webDevelopment: {
            x: windowWidth * 0.5,
            y: isMobile ? windowHeight + windowHeight * 0.3 : -windowHeight * 0.3,
            rotation: Math.PI / 6,
            collisionFilter: {category: isMobile ? 0x0004 : 0x0002}, // 0x0004
            element: elements.webDevelopment,
        },
        wallBottom: {
            x: windowWidth * 0.5, y: windowHeight - 22, width: windowWidth, height: 1,
            collisionFilter: {mask: isMobile ? 0x0001 : 0x0001 | 0x0002},
        },
        wallTop: {
            x: windowWidth * 0.5, y: 15, width: windowWidth, height: 1,
            collisionFilter: {mask: isMobile ? 0x0001 | 0x0002 : 0x0001},
        },
        wallLeft: {
            x: -1, y: windowHeight * 0.5, width: 1, height: windowHeight,
            collisionFilter: {mask: 0x0001 | 0x0002},
        },
        wallRight: {
            x: windowWidth, y: windowHeight * 0.5, width: 1, height: windowHeight,
            collisionFilter: {mask: 0x0001 | 0x0002},
        },
    };
}

export function wallBodyConstructor(render) {
    return (blockData) => Matter.Bodies.rectangle(
        render.mapping.viewToWorld(blockData.x),
        render.mapping.viewToWorld(blockData.y),
        blockData.width === 1 ? 1 : render.mapping.viewToWorld(blockData.width),
        blockData.height === 1 ? 1 : render.mapping.viewToWorld(blockData.height),
        {isStatic: true, collisionFilter: blockData.collisionFilter},
    );
}

export function domBodyConstructor(render) {
    return (blockData) => {

        // blockData.element.style = '';

        return Matter.DomBodies.block(blockData.x, blockData.y, {
            Dom: {render, element: blockData.element},
            chamfer: {radius: 6},
            collisionFilter: blockData.collisionFilter,
            frictionAir: 0.1,
        });
    };
}
