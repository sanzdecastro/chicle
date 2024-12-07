import { getPointerPos, getMouseDistance, getNewPosition, lerp } from './utils.js';
import { Image } from './image.js';
import gsap from 'gsap';

export class ImageTrail {
    DOM = { el: null };
    images = [];
    imagesTotal = 0;
    imgPosition = 0;
    zIndexVal = 1;
    activeImagesCount = 0;
    isIdle = true;
    visibleImagesCount = 0;
    threshold = 80;
    visibleImagesTotal = 9;

    // Variables de posición del ratón
    mousePos = { x: 0, y: 0 };
    lastMousePos = { x: 0, y: 0 };
    cacheMousePos = { x: 0, y: 0 };

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.images = [...this.DOM.el.querySelectorAll('.content__img')].map(img => new Image(img));
        this.imagesTotal = this.images.length;
        this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);

        const onPointerMoveEv = (ev) => {
            this.mousePos = ev.touches
                ? getPointerPos(ev.touches[0])
                : getPointerPos(ev);
            this.cacheMousePos = { ...this.mousePos };
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', onPointerMoveEv);
            window.removeEventListener('touchmove', onPointerMoveEv);
        };

        window.addEventListener('mousemove', onPointerMoveEv);
        window.addEventListener('touchmove', onPointerMoveEv);
    }

    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = { ...this.mousePos };
        }

        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }

        requestAnimationFrame(() => this.render());
    }

    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        ++this.visibleImagesCount;

        gsap.killTweensOf(img.DOM.el);

        const scaleValue = gsap.utils.random(0.5, 1.6);

        img.timeline = gsap.timeline({
            onStart: () => this.onImageActivated(),
            onComplete: () => this.onImageDeactivated(),
        })
            .fromTo(img.DOM.el, {
                scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
                rotationZ: 0,
                opacity: 1,
                zIndex: this.zIndexVal,
                x: this.cacheMousePos.x - img.rect.width / 2,
                y: this.cacheMousePos.y - img.rect.height / 2,
            }, {
                duration: 0.4,
                ease: 'power3',
                scale: scaleValue,
                rotationZ: gsap.utils.random(-3, 3),
                x: this.mousePos.x - img.rect.width / 2,
                y: this.mousePos.y - img.rect.height / 2,
            }, 0);

        if (this.visibleImagesCount >= this.visibleImagesTotal) {
            const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
            const img = this.images[lastInQueue];
            gsap.to(img.DOM.el, {
                duration: 0.4,
                ease: 'power4',
                opacity: 0,
                scale: 1.3,
                onComplete: () => {
                    if (this.activeImagesCount === 0) {
                        this.isIdle = true;
                    }
                },
            });
        }
    }

    onImageActivated = () => {
        this.activeImagesCount++;
        this.isIdle = false;
    };

    onImageDeactivated = () => {
        this.activeImagesCount--;
    };
}
