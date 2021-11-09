import Matter from 'matter-js';

export function getBlockConfig (elements) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 1024;

    const jorisWidth = elements.joris.offsetWidth;
    const noordermeerWidth = elements.noordermeer.offsetWidth;
    const yOffset = -windowHeight * 0.4;

    return {
        joris: {
            x: isMobile ? 8 + jorisWidth / 2 : 32 + jorisWidth / 2,
            y: isMobile ? -yOffset + windowHeight + noordermeerWidth : yOffset - noordermeerWidth * 0.3,
            rotation: Math.PI / 12,
            collisionFilter: { category: 0x0002 },
            element: elements.joris,
        },
        noordermeer: {
            x: isMobile ? noordermeerWidth * 0.25 + jorisWidth + noordermeerWidth / 2 : windowWidth * 0.3 - 32 + noordermeerWidth / 2,
            y: isMobile ? -yOffset + windowHeight + noordermeerWidth * 1.4 : yOffset - noordermeerWidth * 0.7,
            rotation: -Math.PI / 6,
            collisionFilter: { category: 0x0002 },
            element: elements.noordermeer,
        },
        webDevelopment: {
            x: isMobile ? windowWidth * 0.5 : Math.min(windowWidth * 0.7, windowWidth * 0.3 + noordermeerWidth * 1.4),
            y: isMobile ? -yOffset + windowHeight + noordermeerWidth * 0.5 : yOffset - noordermeerWidth * 1.4,
            rotation: Math.PI / 7,
            collisionFilter: { category: 0x0004 }, // 0x0004
            element: elements.webDevelopment,
        },
        profile: {
            x: isMobile ? windowWidth * 0.8 : Math.min(windowWidth * 0.6, windowWidth * 0.3 + noordermeerWidth * 1.2),
            y: isMobile ? -yOffset + windowHeight + noordermeerWidth * 1.6 : yOffset - noordermeerWidth * 1.8,
            rotation: 0,
            collisionFilter: { category: 0x0002 }, // 0x0004
            element: elements.profile,
        },
        wallBottom: {
            x: windowWidth * 0.5,
            y: windowHeight - 22,
            width: windowWidth,
            height: 1,
            collisionFilter: { mask: isMobile ? 0x0001 : 0x0001 | 0x0002 | 0x0004 },
        },
        wallTop: {
            x: windowWidth * 0.5,
            y: 13,
            width: windowWidth,
            height: 1,
            collisionFilter: { mask: isMobile ? 0x0001 | 0x0002 : 0x0001 },
        },
        wallLeft: {
            x: -1,
            y: windowHeight * 0.5,
            width: 1,
            height: windowHeight,
            collisionFilter: { mask: 0x0001 | 0x0002 /* | 0x0004 */ }, // Allow webdevelopment to fall out to the side
        },
        wallRight: {
            x: windowWidth,
            y: windowHeight * 0.5,
            width: 1,
            height: windowHeight,
            collisionFilter: { mask: 0x0001 | 0x0002 /* | 0x0004 */ }, // Allow webdevelopment to fall out to the side
        },
    };
}

export function wallBodyConstructor (render) {
    return blockData => Matter.Bodies.rectangle(
        render.mapping.viewToWorld(blockData.x),
        render.mapping.viewToWorld(blockData.y),
        blockData.width === 1 ? 1 : render.mapping.viewToWorld(blockData.width),
        blockData.height === 1 ? 1 : render.mapping.viewToWorld(blockData.height),
        { isStatic: true, collisionFilter: blockData.collisionFilter },
    );
}

export function domBodyConstructor (render) {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 1024;
    return blockData => Matter.DomBodies.block(blockData.x, blockData.y, {
        Dom: { render, element: blockData.element },
        chamfer: { radius: isMobile ? 0 : 6.5 },
        collisionFilter: blockData.collisionFilter,
        frictionAir: 0.1,
    });
}

export function getDomElementSizes (elements) {
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
        profile: {
            width: elements.profile.offsetWidth,
            height: elements.profile.offsetHeight,
        },
    };
}
