import { Renderer } from './renderer.js';
import { Keyboard } from './keyboard.js';
import { Player } from './sprites/player/index.js';

const canvas = document.querySelector('#game_canvas');
const renderer = new Renderer({ canvas });
const keyboard = new Keyboard();
const player = new Player({ context: renderer.context, keyboard });

document.addEventListener('keydown', (event) => {
    keyboard.pressed(event.key);
});
document.addEventListener('keyup', (event) => {
    keyboard.released(event.key);
});

renderer.addSprite(player);
renderer.start();

const IMAGE_SIZE = 120;
let INVERT_IMAGE_X = false;
let INVERT_IMAGE_Y = false;
let IMAGE_X_POS = ~~(Math.random() * (SCREEN_WIDTH - IMAGE_SIZE));
let IMAGE_Y_POS = ~~(Math.random() * (SCREEN_HEIGHT - IMAGE_SIZE));

const SPEED = 120;

let last_clock = new Date().getTime();

function moveFatJoe({ context, image }) {
    const actual_clock = new Date().getTime();
    const delta_time = (actual_clock - last_clock) / 1000;
    const final_speed = SPEED * (delta_time);

    last_clock = actual_clock;

    if (IMAGE_X_POS >= SCREEN_WIDTH - IMAGE_SIZE - BORDER_SIZE) {
        INVERT_IMAGE_X = true;
    } else if (IMAGE_X_POS <= BORDER_SIZE) {
        INVERT_IMAGE_X = false;
    }

    if (IMAGE_Y_POS >= SCREEN_HEIGHT - IMAGE_SIZE - BORDER_SIZE) {
        INVERT_IMAGE_Y = true;
    } else if (IMAGE_Y_POS <= BORDER_SIZE) {
        INVERT_IMAGE_Y = false;
    }

    return () => {
        if (!INVERT_IMAGE_X) {
            IMAGE_X_POS += final_speed;
        } else {
            IMAGE_X_POS -= final_speed;
        }

        if (!INVERT_IMAGE_Y) {
            IMAGE_Y_POS += final_speed;
        } else {
            IMAGE_Y_POS -= final_speed;
        }

        context.clearRect(2, 2, SCREEN_WIDTH - BORDER_SIZE, SCREEN_HEIGHT - BORDER_SIZE);

        context.drawImage(
            image,
            IMAGE_X_POS,
            IMAGE_Y_POS,
            IMAGE_SIZE,
            IMAGE_SIZE
        );

        window.requestAnimationFrame(moveFatJoe({ context, image }));
    }
}

const fatjoe = new Image();
fatjoe.src = '/assets/images/fatjoe.png';
fatjoe.onload = () => {
    window.requestAnimationFrame(moveFatJoe({ context, image: fatjoe }));
}
