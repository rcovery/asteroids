export class Keyboard {
    pressedKeys = new Map();

    pressed(key) {
        if (this.pressedKeys.has(key)) return;
        this.pressedKeys.set(key, true);
    }

    released(key) {
        this.pressedKeys.delete(key);
    }
}