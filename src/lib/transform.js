import { mat4 } from "gl-matrix";

export class Transform {
    constructor() {
        this.transform = mat4.create();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setTranslation(x, y, z = 0) {
        mat4.translate(this.transform, this.transform, [x, y, z]);
    }

    /**
     * @param {number} angle
     */
    setRotation(angle) {
        mat4.rotateZ(this.transform, this.transform, angle);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setScale(x, y, z = 1) {
        mat4.scale(this.transform, this.transform, [x, y, z]);
    }

    reset() {
        mat4.identity(this.transform);
    }

    getMatrix() {
        return this.transform;
    }
}