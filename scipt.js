const navDialog = document.getElementById("nav-dialog");

function handleMenu() {
    navDialog.classList.toggle("hidden");
}

// Continuous scroll animation for app logos
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
let translateX1 = -192;
let translateX2 = -144;
const speed = 0.5;

function animateScroll() {
    translateX1 -= speed;
    translateX2 += speed;
    
    // Reset when scrolled too far
    if (translateX1 < -600) {
        translateX1 = 0;
    }
    if (translateX2 > 100) {
        translateX2 = -200;
    }
    
    if (line1) line1.style.transform = `translateX(${translateX1}px)`;
    if (line2) line2.style.transform = `translateX(${translateX2}px)`;
    
    requestAnimationFrame(animateScroll);
}

animateScroll();

const dtElements = document.querySelectorAll("dt");

dtElements.forEach((element) => {

    element.addEventListener("click", () => {

        const ddId = element.getAttribute("aria-controls");
        const ddElement = document.getElementById(ddId);
        const arrow = element.querySelector("i");

        if (ddElement) {
            ddElement.classList.toggle("hidden");
        }

        if (arrow) {
            arrow.classList.toggle("-rotate-180");
        }

    });

});