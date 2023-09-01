import { Factory } from '../factory.js';

export class Player extends Factory {
    // TODO salvar teclas pressionadas em um objeto, e no método update, atualizar a posição;

    availableMoves = {
        'KeyD': () => {
            this.x += 10
        },
        'KeyA': () => {
            this.x -= 10
        },
        'KeyS': () => {
            this.y += 10
        },
        'KeyW': () => {
            this.y -= 10
        },
    }

    constructor({ context }) {
        super();
        this.context = context;
    }

    update() {
    };

    draw() {
        this.context.beginPath();
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, 100, 100);
    }

    move(event) {
        if (!this.availableMoves?.[event.code]) return;
        this.availableMoves[event.code]();
    }
}