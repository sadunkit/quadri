
export const triangleVertices = [
    0.0, 0.5,  // Top vertex
    -0.5, -0.5, // Bottom left vertex
    0.5, -0.5,  // Bottom right vertex
];

export const quadVertices = [
    // First triangle
    -0.5, 0.5,
    0.5, 0.5,
    -0.5, -0.5,
    // Second triangle
    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5,
];

export const circleVertices = (radius = 1.0, segments = 20) => {
    const circleVertices = [];

    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        circleVertices.push(x, y);
    }

    return circleVertices;
}
