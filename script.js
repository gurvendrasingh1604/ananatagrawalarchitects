// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Initialize GSAP & Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- MENU ANIMATION LOGIC ---
const menuTl = gsap.timeline({ paused: true });

// Define the menu animation steps
menuTl
    // Step A: Slide background down (Curtain effect)
    .to(".menu-overlay", {
        autoAlpha: 1, // handles visibility: visible
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut"
    })
    // Step B: Stagger the text coming up
    .to(".menu-link", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
    }, "-=0.4");

// Set initial clip-path state for menu (hidden at top)
gsap.set(".menu-overlay", { 
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" 
});

// Menu Event Listeners
const menuTrigger = document.getElementById("menu-trigger");
const menuClose = document.getElementById("menu-close");

menuTrigger.addEventListener("click", () => {
    menuTl.play();
});

menuClose.addEventListener("click", () => {
    menuTl.reverse();
});

// --- PAGE LOAD & SCROLL ANIMATIONS ---
window.addEventListener("load", () => {
    // Remove Loader
    gsap.to(".loader", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: initAnimations
    });
});

function initAnimations() {
    // Hero Animation
    gsap.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
    });
    initNavbarBehavior();
    gsap.to(".hero-sub", {
        opacity: 1,
        duration: 1.5,
        delay: 0.5
    });

    // Parallax Images Effect
    gsap.to(".parallax-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // The "Scattered Text" Effect (Innovation Section)
    const letters = document.querySelectorAll(".scatter-letter");
    
    // Randomize starting positions for scatter effect
    letters.forEach(letter => {
        gsap.set(letter, {
            x: (Math.random() - 0.5) * 500, // Random X scatter
            y: (Math.random() - 0.5) * 500, // Random Y scatter
            rotation: (Math.random() - 0.5) * 90, // Random rotation
            opacity: 0
        });
    });

    // Animate letters together on scroll
    gsap.to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out", 
        scrollTrigger: {
            trigger: "#innovation-section",
            start: "top 60%", 
            end: "bottom center", // Extended end point
            scrub: 4              // High scrub for slow, floaty lag
        }
    });
    // Horizontal Scroll Section
    // --- OLD HORIZONTAL CODE REMOVED ---
    
    // --- NEW VERTICAL PROJECT ANIMATIONS ---
    // This creates a subtle zoom effect as you scroll into each project
    const projectBgs = document.querySelectorAll(".project-bg");
    
    projectBgs.forEach(bg => {
        gsap.to(bg, {
            scale: 1.1, // Zoom in slightly
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement, // Trigger based on the section
                start: "top bottom",       // Start when section enters view
                end: "bottom top",         // End when section leaves view
                scrub: true                // Smoothly tie animation to scroll
            }
        });
    });
        }

// --- NAVBAR HIDE/SHOW LOGIC ---
function initNavbarBehavior() {
    let lastScroll = 0;
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // Ignore small scroll movements (rubber banding)
        if (currentScroll <= 0) {
            gsap.to(nav, { y: 0, duration: 0.5 }); // Always show at very top
            return;
        }

        // Check Scroll Direction
        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling DOWN -> Hide Navbar
            gsap.to(nav, { 
                y: "-100%", 
                duration: 0.5, 
                ease: "power2.out" 
            });
        } else {
            // Scrolling UP -> Show Navbar
            gsap.to(nav, { 
                y: "0%", 
                duration: 0.5, 
                ease: "power2.out" 
            });
        }
        
        lastScroll = currentScroll;
    });
}
// 1. Hero Reveal
    gsap.to(".hero-logo-container", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
    });

window.addEventListener("load", () => {
    
    // 1. Setup the Infinity Path
    const loaderPath = document.querySelector(".loader-infinity");
    const pathLength = loaderPath.getTotalLength();

    // Hide the stroke initially (create dashed line equal to length)
    gsap.set(loaderPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
    });

    // 2. Animate the Drawing
    gsap.to(loaderPath, {
        strokeDashoffset: 0,       // Draw fully
        duration: 2,               // Time it takes to "load"
        ease: "power2.inOut",
        onComplete: () => {
            
            // 3. When drawing is done, slide the screen away
            gsap.to(".loader", {
                yPercent: -100,    // Slide up
                duration: 1,
                ease: "power4.inOut",
                onComplete: initAnimations // Start the rest of your site
            });
            
        }
    });
});

// Update this part in initAnimations()
    gsap.to(".hero-logo-container", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
    });

// --- MENU INTERACTION ---
const trigger = document.getElementById('menu-trigger');
const closeBtn = document.getElementById('menu-close');
const menu = document.getElementById('fs-menu');
const links = document.querySelectorAll('.menu-link');

trigger.addEventListener('click', () => {
    // 1. Slide in the Strip
    menu.classList.add('menu-open');
    
    // 2. Stagger the links sliding in from the right
    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('slide-in');
        }, 300 + (index * 100)); // Start after strip animation (300ms)
    });
});

closeBtn.addEventListener('click', () => {
    // 1. Close Strip
    menu.classList.remove('menu-open');
    
    // 2. Reset Links
    links.forEach(link => {
        link.classList.remove('slide-in');
    });
});