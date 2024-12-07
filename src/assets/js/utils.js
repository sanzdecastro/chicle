// Calcula la posición del puntero (ratón o toque)
export const getPointerPos = (event) => ({
    x: event.clientX,
    y: event.clientY,
});

// Calcula la distancia entre dos puntos
export const getMouseDistance = (pos1, pos2) => 
    Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y);

// Calcula la nueva posición para manejar límites cíclicos
export const getNewPosition = (current, total, items) => 
    (current + total) % items.length;

// Interpolación lineal entre dos valores
export const lerp = (start, end, amount) => 
    (1 - amount) * start + amount * end;
