import { mat4 } from "gl-matrix";
import { Transform } from "./transform";

export class Quad {
    constructor() {
        this.transform = new Transform();
        this.color = new Float32Array([0.0, 1.0, 0.0, 1.0]);
    }
}


export class QuadProgram {
    static vertexData =  new Float32Array([
        -1.0,
        1.0, // Top-left corner
        1.0,
        1.0, // Top-right corner
        -1.0,
        -1.0, // Bottom-left corner
        1.0,
        -1.0, // Bottom-right corner
    ]);

    /** @type {WebGLProgram} */
    program;

    /** @type {Quad[]} */
    quads = [];

    /** @type {WebGLRenderingContext} */
    gl;

    /** @type {WebGLUniformLocation} */
    transformMatrixLocation;

    /** @type {WebGLUniformLocation} */
    colorLocation;

    /** @type {WebGLBuffer} */
    positionBuffer;

    /**
     * @param {WebGLProgram} program
     * @param {WebGLRenderingContext} gl
     */
    constructor(program,gl) {
        this.program = program;
        this.gl = gl;

        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');

        const buffer = this.gl.createBuffer();

        if (!buffer) {
            throw new Error('Failed to create buffer');
        }

        this.positionBuffer = buffer;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            QuadProgram.vertexData,
            this.gl.STATIC_DRAW,
        );

        const transformAttribLocation = this.gl.getUniformLocation(this.program, 'u_matrix');

        const colorLocation = this.gl.getUniformLocation(this.program, 'u_color');

        if (!transformAttribLocation || !colorLocation) {
            throw new Error('Failed to get uniform locations');
        }

        this.transformMatrixLocation = transformAttribLocation;

        this.colorLocation = colorLocation;
    }
    
    draw() {
        this.gl.useProgram(this.program);

        this.quads.forEach((quad) => {
            this.gl.enableVertexAttribArray(this.positionAttributeLocation);
            this.gl.vertexAttribPointer(
                this.positionAttributeLocation,
                2,
                this.gl.FLOAT,
                false,
                0,
                0,
            );

            this.gl.uniformMatrix4fv(this.transformMatrixLocation, false, quad.transform.getMatrix());
            this.gl.uniform4fv(this.colorLocation, quad.color);

            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        });
    }

}