export class Image {
    constructor(imgEl) {
        this.DOM = { el: imgEl }; // Referencia al elemento DOM
        this.rect = imgEl.getBoundingClientRect(); // Dimensiones y posición
    }
}