"use strict";
const container = document.querySelector('.carousel__container');
const items = document.querySelectorAll('.carousel__item');
const threshold = 100; // swipe distance threshold
let startX = 0;
let endX = 0;
let currentPage = 0;
let pageCount = items.length;
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MorphSVGPlugin);
ScrollSmoother.create({
    normalizeScroll: true,
    smooth: 1,
    effects: true,
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});
const tl = gsap.timeline({ paused: true });
tl.to(container, { duration: 1, xPercent: -100 * currentPage, ease: 'power1.inOut' });
updateBodyClass();
container.addEventListener('pointerdown', e => {
    startX = e.clientX || e.touches[0].clientX;
});
container.addEventListener('pointermove', e => {
    endX = e.clientX || e.touches[0].clientX;
});
container.addEventListener('pointerup', e => {
    const distance = endX - startX;
    if (distance > threshold && currentPage > 0) {
        moveLeft();
    }
    else if (distance < -threshold && currentPage < pageCount - 1) {
        moveRight();
    }
});
function moveRight() {
    currentPage++;
    updateBodyClass();
    gsap.to(container, { duration: 1, xPercent: -100 * currentPage, ease: 'power1.inOut' });
}
function moveLeft() {
    currentPage--;
    updateBodyClass();
    gsap.to(container, { duration: 1, xPercent: -100 * currentPage, ease: 'power1.inOut' });
}
setTimeout(() => {
    moveRight();
}, 1000);
container.addEventListener('pointercancel', e => {
    endX = startX;
});
function updateBodyClass() {
    const newClass = `page-${currentPage}`;
    // Remove any existing page classes and add the new one
    const body = document.getElementById('smooth-wrapper');
    body.classList.forEach(className => {
        if (className.startsWith('page-')) {
            body.classList.remove(className);
        }
    });
    body.classList.add(newClass);
}
