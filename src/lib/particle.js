import { Quad } from "./quads";



export class Vec2 {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vec2} vec
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this
    }

    /**
     * @param {Vec2} vec
     */
    subtract(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this
    }

    /**
     * @param {number} scalar
     */

    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    /**
     * @param {Vec2} vec
     * @param {number} scalar
     */
    static multiply(vec, scalar) {
        return new Vec2(vec.x * scalar, vec.y * scalar);
    }
}

export class Particle {
    constructor() {
        this.position = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
        this.acceleration = new Vec2(0, 0);
        this.scale = new Vec2(1, 1);
    }

    randomizeVelocity(scale = 0.1) {
        this.velocity.x = (Math.random() * 2 - 1) * scale;
        this.velocity.y = (Math.random() * 2 - 1) * scale;
    }

    /**
     * @param {number} deltaTime
     */
    update(deltaTime) {
        this.position.add(Vec2.multiply(this.velocity, deltaTime));

        if (this.position.x <= 0.5 || this.position.x >= 0.5 || this.position.y <= 0.5 || this.position.y >= 0.5) {
            this.velocity = new Vec2(0, 0);
        }
    }
}