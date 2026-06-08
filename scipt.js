const navDialog = document.getElementById("nav-dialog");

function handleMenu() {
    navDialog.classList.toggle("hidden");
}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

line1.classList.remove("-translate-x-48");
line2.classList.remove("-translate-x-36");

const HALF_WIDTH_1 = line1.scrollWidth / 2;
const HALF_WIDTH_2 = line2.scrollWidth / 2;

let pos1 = 0;
let pos2 = 0;
const speed = 0.6;

function animateScroll() {
    pos1 -= speed;
    if (pos1 <= -HALF_WIDTH_1) {
        pos1 = 0;
    }

    pos2 += speed;
    if (pos2 >= HALF_WIDTH_2) {
        pos2 = 0;
    }

    line1.style.transform = `translateX(${pos1}px)`;
    line2.style.transform = `translateX(${-pos2}px)`;

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