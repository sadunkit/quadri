import { Transform } from "./transform";

export class Quad {
    constructor() {
        this.transform = new Transform();
        this.color = new Float32Array([0.0, 1.0, 0.0, .4]);
    }
}