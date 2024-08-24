import { Quad } from "./quads";


export class Particle {
    constructor() {
        this.quad = new Quad();
        this.quad.color = new Float32Array([1.0, 0.0, 0.0, 1.0]);
        this.quad.transform.setScale(0.1, 0.1);
        
        this.quad.transform.setTranslation(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
        const update = () => {


            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
}