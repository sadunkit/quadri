<script>
    import { onMount } from "svelte";
    import { Quad, QuadProgram } from "$lib/quads";
    import { Particle, Vec2 } from "$lib/particle";
    import { Quadri } from "$lib/quadri";
    import particleFragmentShader from "$lib/shaders/Particle.frag?raw";
    import Debugger from "$lib/Debugger.svelte";
    /**
     *  @type {Particle[]}
     */
    let particles = [];

    /**
     *  @type {QuadProgram}
     */
    let quadProgram;

    let fps = 0;

    onMount(() => {
        // @ts-ignore
        const quadri = new Quadri(document.getElementById('canvas'));

        quadri.init();

        window.addEventListener('keydown', (e) => {
            if (e.key === 'a') {
                console.log('Creating particle')
                const p = new Particle()
                particles.push(p)

                p.randomizeVelocity()

                const q = new Quad()
                q.transform.setScale(0.1, 0.1)

                q.color = new Float32Array([Math.random(), Math.random(), Math.random(), 1])

                if (!quadProgram) {
                    const newQuadProgram = quadri.initQuadProgram(undefined, particleFragmentShader)
                    if (!newQuadProgram) {
                        console.error('Failed to create quad program')
                        return
                    }

                    quadProgram = newQuadProgram;
                }

                quadProgram.quads.push(q)
            }
        });

        let lastTime = 0;
        const render = (/** @type {number} */ worldTime) => {
            const frameTimeInMs = (worldTime - lastTime || 0);
            const deltaTime = frameTimeInMs / 1000;

            // calculate fps from deltaTime
            fps = 1000 / frameTimeInMs;

            lastTime = worldTime;

            quadri.draw();

            if (quadProgram)
            {
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update(deltaTime)
                    quadProgram.quads[i].transform.setTranslation(particles[i].position.x, particles[i].position.y)
                }

                quadProgram.draw();                
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    });
</script>

<div class="bg">
    <canvas id="canvas"></canvas>
    <Debugger fps={fps} />
</div>

<style>
    .bg {
        width: 100dvw;
        height: 100dvh;
        background: linear-gradient(0deg, cyan 0%, purple 100%);
    }

    #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
