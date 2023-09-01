import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants.js";

export class Renderer {
    paused = false;
    sprites = [];
    context;

    constructor({ canvas }) {
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;

        this.context = canvas.getContext('2d')
    }

    start() {
        this.updateFrame();
    }

    addSprite(spriteInstance) {
        this.sprites.push(spriteInstance);
    }

    updateFrame() {
        this.clear();

        for (const sprite of this.sprites) {
            sprite.update();
            sprite.draw();
        }


        window.requestAnimationFrame(() => {
            this.updateFrame();
        });
    }

    clear() {
        this.context.clearRect(
            0,
            0,
            SCREEN_WIDTH,
            SCREEN_HEIGHT,
        );
    }
}