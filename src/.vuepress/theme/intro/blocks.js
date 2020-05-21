import Matter from 'matter-js';

export function getBlockConfig(elements) {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let isMobile = windowWidth < 1024;

    let jorisWidth = elements.joris.offsetWidth;
    let noordermeerWidth = elements.noordermeer.offsetWidth;

    return {
        joris: {
            x: isMobile ? 8 + jorisWidth / 2 : 32 + jorisWidth / 2,
            y: isMobile ? windowHeight + noordermeerWidth : - noordermeerWidth * 0.3,
            rotation: Math.PI / 12,
            collisionFilter: {category: 0x0002},
            element: elements.joris,
        },
        noordermeer: {
            x: isMobile ? noordermeerWidth * 0.2 + jorisWidth + noordermeerWidth / 2 : document.querySelector('#right-side').offsetLeft - 32 + noordermeerWidth / 2,
            y: isMobile ? windowHeight + noordermeerWidth * 1.4 : -noordermeerWidth * 0.7,
            rotation: -Math.PI / 6,
            collisionFilter: {category: 0x0002},
            element: elements.noordermeer,
        },
        webDevelopment: {
            x: isMobile ? windowWidth * 0.5 : windowWidth * (0.3 + 0.1 * (Math.floor(Math.random() * 4) + 1)),
            y: isMobile ? windowHeight + noordermeerWidth * 0.5 : -noordermeerWidth * 1.3,
            rotation: Math.PI / 6,
            collisionFilter: {category: 0x0004}, // 0x0004
            element: elements.webDevelopment,
        },
        wallBottom: {
            x: windowWidth * 0.5, y: windowHeight - 22, width: windowWidth, height: 1,
            collisionFilter: {mask: isMobile ? 0x0001 : 0x0001 | 0x0002 | 0x0004},
        },
        wallTop: {
            x: windowWidth * 0.5, y: 13, width: windowWidth, height: 1,
            collisionFilter: {mask: isMobile ? 0x0001 | 0x0002 : 0x0001},
        },
        wallLeft: {
            x: -1, y: windowHeight * 0.5, width: 1, height: windowHeight,
            collisionFilter: {mask: 0x0001 | 0x0002 /*| 0x0004*/}, // Allow webdevelopment to fall out to the side
        },
        wallRight: {
            x: windowWidth, y: windowHeight * 0.5, width: 1, height: windowHeight,
            collisionFilter: {mask: 0x0001 | 0x0002 /*| 0x0004*/}, // Allow webdevelopment to fall out to the side
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
    return (blockData) => Matter.DomBodies.block(blockData.x, blockData.y, {
        Dom: {render, element: blockData.element},
        chamfer: {radius: 6},
        collisionFilter: blockData.collisionFilter,
        frictionAir: 0.1,
    });
}

export function getDomElementSizes(elements) {
    return {
        joris: {
            width: elements.joris.offsetWidth,
            height: elements.joris.offsetHeight,
        },
        noordermeer: {
            width: elements.noordermeer.offsetWidth,
            height: elements.noordermeer.offsetHeight,
        },
        webDevelopment: {
            width: elements.webDevelopment.offsetWidth,
            height: elements.webDevelopment.offsetHeight,
        },
    };
}
