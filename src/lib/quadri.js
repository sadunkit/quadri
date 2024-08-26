import { Quad, QuadProgram } from "./quads";
import vertexShaderSource from "$lib/shaders/Quad.vert?raw";
import fragmentShaderSource from "$lib/shaders/Quad.frag?raw";

export class Quadri {
    /** @type {HTMLCanvasElement} */
    canvas;

    /** @type {WebGL2RenderingContext} */
    gl;

    /** @type {Quad} */
    bgQuad;

    /** @type {QuadProgram} */
    bgQuadProgram;

    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;

        const ctx = this.canvas.getContext("webgl2");
        if (!ctx) {
            throw new Error("WebGL2 not supported");
        }

        this.gl = ctx;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.bgQuad = new Quad();
        this.bgQuad.color = new Float32Array([0.0, 0.0, 0.0, 0.0]);
        const bgQuadProgram = this.initQuadProgram();
        if (!bgQuadProgram) {
            throw new Error("Failed to initialize Quad");
        }

        this.bgQuadProgram = bgQuadProgram;
        this.bgQuadProgram.quads.push(this.bgQuad);
    }

    init() {
    }

    /**
     * @param {GLenum} type
     * @param {string} source
     */
    createShader(type, source) {
        const shader = this.gl.createShader(type);

        if (!shader) {
            console.error("An error occurred creating the shader");
            return null;
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(
                "An error occurred compiling the shaders: " +
                    this.gl.getShaderInfoLog(shader),
            );
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * @param {WebGLShader} vertexShader
     * @param {WebGLShader} fragmentShader
     */
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();

        if (!program) {
            console.error("An error occurred creating the program");
            return null;
        }

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error(
                "Unable to initialize the shader program: " +
                    this.gl.getProgramInfoLog(program),
            );
            return null;
        }

        return program;
    }

    /**
     * @param {string} vertexSource
     * @param {string} fragmentSource
     * @returns {QuadProgram | undefined}
     */
    initQuadProgram(vertexSource = vertexShaderSource, fragmentSource = fragmentShaderSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(
            this.gl.FRAGMENT_SHADER,
            fragmentSource,
        );

        if (!vertexShader || !fragmentShader) {
            return;
        }

        const program = this.createProgram(vertexShader, fragmentShader);

        if (!program) {
            return;
        }

        const quadProgram = new QuadProgram(program, this.gl);
        return quadProgram;
    }

    draw() {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.bgQuadProgram.draw();
    }
}