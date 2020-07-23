import { Mouse } from 'matter-js';

export function fixMouseUpTouchEvent (mouse) {
    mouse.element.removeEventListener('touchend', mouse.mouseup);

    mouse.mouseup = function (event) {
        const position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio);
        // const touches = event.changedTouches;
        //
        // if (touches) {
        //     event.preventDefault();
        // }

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

export function changeRelativeMousePosition (Mouse) {
    Mouse._getRelativeMousePosition = function (event, element, pixelRatio) {
        const elementBounds = element.getBoundingClientRect();
        const rootNode = (document.documentElement || document.body.parentNode || document.body);
        const scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft;
        const scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop;
        const touches = event.changedTouches;
        let x; let y;

        // Leave unchanged on small screens
        if (window.innerWidth < 1024) {
            if (touches) {
                x = touches[0].pageX - elementBounds.left - scrollX;
                y = touches[0].pageY - elementBounds.top - scrollY;
            } else {
                x = event.pageX - elementBounds.left - scrollX;
                y = event.pageY - elementBounds.top - scrollY;
            }
        } else if (touches) {
            x = touches[0].pageX + elementBounds.left;
            y = touches[0].pageY + elementBounds.top;
        } else {
            x = event.pageX + elementBounds.left;
            y = event.pageY + elementBounds.top;
        }

        return {
            x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
            y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio),
        };
    };

    return Mouse;
}
