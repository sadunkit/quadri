<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Quad } from "$lib/quads";
    import { Particle } from "$lib/particle";

    let gl;
    let canvas;

    /**
     * 
     */
    let particles = [];

    let bgQuad = new Quad();

    onMount(() => {
        canvas = document.getElementById("canvas");
        gl = canvas.getContext("webgl2");

        window.addEventListener('keydown', (e) => {
            if (e.key === 'a') {

                const p = new Particle()
                particles.push(p)
            }
        });

        if (!gl) {
            alert("WebGL 2.0 not supported in this browser");
            return;
        }

        // Set up the viewport
        gl.viewport(0, 0, canvas.width, canvas.height);

        const render = () => {
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            drawQuad(bgQuad);

            particles.forEach((particle) => {
                drawQuad(particle.quad);
            });
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    });

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(
                "An error occurred compiling the shaders: " +
                    gl.getShaderInfoLog(shader),
            );
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    function createProgram(vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(
                "Unable to initialize the shader program: " +
                    gl.getProgramInfoLog(program),
            );
            return null;
        }

        return program;
    }

    function drawQuad(quad) {

        const vertexShaderSource = `
        attribute vec4 a_position;
        uniform mat4 u_matrix;

        void main() {
            gl_Position = u_matrix * a_position;
        }
        `;

        const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
        `;

        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(
            gl.FRAGMENT_SHADER,
            fragmentShaderSource,
        );
        const program = createProgram(vertexShader, fragmentShader);

        gl.useProgram(program);

        const positionAttributeLocation = gl.getAttribLocation(
            program,
            "a_position",
        );

        // Create a buffer and put the quad vertices into it
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1.0,
                1.0, // Top-left corner
                1.0,
                1.0, // Top-right corner
                -1.0,
                -1.0, // Bottom-left corner
                1.0,
                -1.0, // Bottom-right corner
            ]),
            gl.STATIC_DRAW,
        );

        // Enable the attribute and set up the buffer
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(
            positionAttributeLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0,
        );

        const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
        gl.uniformMatrix4fv(matrixLocation, false, quad.transform.getMatrix());

        const colorLocation = gl.getUniformLocation(program, 'u_color');
        gl.uniform4fv(colorLocation, quad.color);

        // Draw the quad
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
</script>

<div class="bg">
    <canvas id="canvas"></canvas>
</div>

<style>
    .bg {
        width: 100dvw;
        height: 100dvh;
        background: linear-gradient(180deg, cyan 0%, purple 100%);
    }

    #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
