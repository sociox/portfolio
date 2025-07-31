// =============================
// PRELOADER FADE OUT
// =============================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.transition = "opacity 1s ease";
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 1000);
    }, 1500);
});

// =============================
// TYPING EFFECT FOR HERO HEADING
// =============================
function typeEffect(element, speed) {
    const text = element.innerHTML;
    element.innerHTML = "";
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}
document.addEventListener("DOMContentLoaded", () => {
    const heading = document.querySelector(".hero-text h2");
    if (heading) typeEffect(heading, window.innerWidth < 768 ? 50 : 80); // Faster typing on mobile
});

// =============================
// SPIDERMAN FLOAT + GLOW
// =============================
function floatImage() {
    const img = document.querySelector(".hero-img img");
    if (!img) return;

    let floatY = 0;
    let direction = 1;

    setInterval(() => {
        floatY += direction * 0.3;
        if (floatY > 10 || floatY < -10) direction *= -1;
        img.style.transform = `translateY(${floatY}px)`;
    }, 20);

    img.addEventListener("mouseenter", () => {
        img.style.filter = `drop-shadow(0 0 40px rgba(255,0,0,1))`;
        img.style.transition = "filter 0.3s ease";
    });
    img.addEventListener("mouseleave", () => {
        img.style.filter = `drop-shadow(0 0 20px rgba(255,0,0,0.8))`;
    });
}
floatImage();

// =============================
// FLOATING BACKGROUND PARTICLES
// =============================
function createParticles() {
    const container = document.querySelector(".particle-container");
    if (!container) return;

    const totalParticles = window.innerWidth < 768 ? 8 : 15; // Reduce for mobile
    for (let i = 0; i < totalParticles; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.width = particle.style.height = `${Math.random() * 5 + 3}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
        animateParticle(particle);
    }
}
function animateParticle(particle) {
    let moveX = Math.random() * 50 - 25;
    let moveY = Math.random() * 50 - 25;
    let duration = 3000 + Math.random() * 3000;
    particle.animate(
        [
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${moveX}px, ${moveY}px)`, opacity: 0.5 },
            { transform: "translate(0,0)", opacity: 1 }
        ],
        {
            duration: duration,
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );
}
createParticles();

// =============================
// MARVEL STYLE EXPLOSION + FLASH BEHIND SPIDERMAN
// =============================
document.querySelector(".hero-img img").addEventListener("click", () => {
    const container = document.querySelector(".particle-container");

    // White flash overlay
    const flash = document.createElement("div");
    flash.classList.add("flash");
    document.body.appendChild(flash);
    flash.animate([{ opacity: 0.9 }, { opacity: 0 }], { duration: 300, easing: "ease-out", fill: "forwards" });
    setTimeout(() => flash.remove(), 300);

    // Explosion effect
    const totalExplosions = window.innerWidth < 768 ? 20 : 40; // Reduce particles on phone
    for (let i = 0; i < totalExplosions; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.width = particle.style.height = `${Math.random() * 6 + 4}px`;
        particle.style.left = "50%";
        particle.style.top = "50%";
        container.appendChild(particle);

        let x = (Math.random() - 0.5) * 300; // Smaller explosion radius on mobile
        let y = (Math.random() - 0.5) * 300;

        particle.animate(
            [
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
            ],
            {
                duration: 800 + Math.random() * 400,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => particle.remove(), 1500);
    }
});

// =============================
// SMOOTH SCROLL NAVIGATION
// =============================
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: "smooth"
            });
        }
    });
});

// =============================
// PROJECT CARD 3D TILT
// =============================
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return; // Disable tilt on mobile
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
});
