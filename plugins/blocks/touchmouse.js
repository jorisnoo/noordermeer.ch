import { Mouse } from 'matter-js';

export function fixMouseUpTouchEvent (mouse) {
    mouse.element.removeEventListener('touchend', mouse.mouseup);

    mouse.mouseup = function (event) {
        const position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio);

        mouse.button = -1;
        mouse.absolute.x = position.x;
        mouse.absolute.y = position.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
        mouse.mouseupPosition.x = mouse.position.x;
        mouse.mouseupPosition.y = mouse.position.y;
        mouse.sourceEvents.mouseup = event;
    };

    mouse.element.addEventListener('touchend', mouse.mouseup);
}
