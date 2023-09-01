import { Factory } from '../factory.js';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, PLAYER_MAX_SPEED } from '/scripts/constants.js';

export class Player extends Factory {
    availableMoves = {
        [MOVE_RIGHT]: () => {
            this.x += PLAYER_MAX_SPEED
        },
        [MOVE_LEFT]: () => {
            this.x -= PLAYER_MAX_SPEED
        },
        [MOVE_DOWN]: () => {
            this.y += PLAYER_MAX_SPEED
        },
        [MOVE_UP]: () => {
            this.y -= PLAYER_MAX_SPEED
        },
    }

    constructor({ context, keyboard }) {
        super();
        this.context = context;
        this.keyboard = keyboard;
    }

    update() {
        this.move();
    };

    draw() {
        this.context.beginPath();
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, 100, 100);
    }

    move() {
        for (let key in this.availableMoves) {
            if (this.keyboard.pressedKeys.has(key)) {
                this.availableMoves[key]();
            }
        }
    }
}