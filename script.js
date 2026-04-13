// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sethi Burger Application Initialized.');

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Set the entire hero layers group to be the top-most z-index so it gracefully floats above the next section
    gsap.set('.hero-layers', { zIndex: 100 });

    // Remove any structural group layers transforms, elements animate freely.
    gsap.set('.hero-layers', { clearProps: "all" });

    // 1. Z-Indexes Fixes (Ensure realism mapping)
    // Plate = 1, Ingredients = 20-30, Burger = 50
    gsap.set('.about-plate', { zIndex: 1 });
    gsap.set('.latus1', { zIndex: 20 });
    gsap.set('.latus2', { zIndex: 22 });
    gsap.set('.tamato1', { zIndex: 25 });
    gsap.set('.tamato2', { zIndex: 28 });
    gsap.set('.burger-main', { zIndex: 50 });

    // 2. Setup Robust Absolute Viewport Coordinate Calculation
    const getTranslation = (elementSelector, targetSelector, targetXRat, targetYRat) => {
        const el = document.querySelector(elementSelector);
        const target = document.querySelector(targetSelector);
        if (!el || !target) return { x: 0, y: 0 };

        // Temporarily strip CSS transforms logically to read native DOM anchor positions
        const originalTransform = el.style.transform;
        el.style.transform = 'none';
        const sourceRect = el.getBoundingClientRect();
        el.style.transform = originalTransform;

        const targetRect = target.getBoundingClientRect();

        // Calculate point in target container based on supplied ratios
        const targetX = targetRect.left + (targetRect.width * targetXRat);
        const targetY = targetRect.top + (targetRect.height * targetYRat);

        // Base coordinate is absolute pure center of the un-transformed element
        const sourceX = sourceRect.left + (sourceRect.width * 0.5);
        const sourceY = sourceRect.top + (sourceRect.height * 0.5);

        return { x: targetX - sourceX, y: targetY - sourceY };
    };

    // ============================================
    // STAGE 1: Hero -> About (Burger + Ingredients)
    // ============================================
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1, // Smooth scrolling transition
            invalidateOnRefresh: true
        }
    });

    // Burger to Plate Center
    tl1.to('.burger-main', {
        x: () => getTranslation('.burger-main', '.about-plate', 0.5, 0.5).x,
        y: () => {
            // Drop so Burger base visually rests near plate lower center
            return getTranslation('.burger-main', '.about-plate', 0.5, 0.55).y - 150
        }
        ,
        scale: 0.75,
        ease: 'power2.inOut'
    }, "tl1");

    // Tomato1 (Left Bottom of Plate)
    tl1.to('.tamato1', {
        x: () => getTranslation('.tamato1', '.about-plate', 0.45, 0).x,
        y: () => getTranslation('.tamato1', '.about-plate', 0, 0.98).y,
        scale: 0.7,
        rotation: -25,
        ease: 'power2.inOut'
    }, "tl1");

    // Tomato2 (Right Side)
    tl1.to('.tamato2', {
        x: () => getTranslation('.tamato2', '.about-plate', 0.85, 0).x,
        y: () => getTranslation('.tamato2', '.about-plate', 0, 0.5).y,
        scale: 0.7,
        rotation: 30,
        ease: 'power2.inOut'
    }, "tl1");
    tl1.to('.plate-tomato-center', {
        scale: 1,
        opacity: 1,
        y: -10,
        ease: "back.out(2)"
    }, "tl1+=0.3"); // 🔥 after burger lands


    //     // Latus1 (Behind burger, slightly left)
    //     tl1.to('.latus1', {
    //         x: () => getTranslation('.latus1', '.about-plate', 0.3, 0).x,
    //         y: () => getTranslation('.latus1', '.about-plate', 0, 0.15).y,
    //         scale: 0.65,
    //         rotation: -15,
    //         ease: 'power2.inOut'
    //     }, "tl1");

    //     // Latus2 (Slightly top/side right)
    //     tl1.to('.latus2', {
    //         x: () => getTranslation('.latus2', '.about-plate', 0.75, 0).x,
    //         y: () => getTranslation('.latus2', '.about-plate', 0, 0.25).y,
    //         scale: 0.65,
    //         rotation: 20,
    //         ease: 'power2.inOut'
    //     }, "tl1");
    // // 🥬 Latus1 FALL (LEFT SIDE)
    tl1.to('.latus1', {
        x: () => getTranslation('.latus1', '.about-plate', 0.25, 0).x,
        y: () => getTranslation('.latus1', '.about-plate', 0, 0.65).y,
        scale: 0.7,
        rotation: -25,
        ease: 'bounce.out'
    }, "tl1+=0.2"); // 🔥 delay after burger

    // 🥬 Latus2 FALL (RIGHT SIDE)
    tl1.to('.latus2', {
        x: () => getTranslation('.latus2', '.about-plate', 0.75, 0).x,
        y: () => getTranslation('.latus2', '.about-plate', 0, 0.65).y,
        scale: 0.7,
        rotation: 25,
        ease: 'bounce.out'
    }, "tl1+=0.25"); // 🔥 slightly more delay


    // ============================================
    // STAGE 2: About -> Drinks (Burger ONLY)
    // ============================================
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.drinks-section',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    // Animate only the burger securely into Card 2 empty slot
    tl2.to('.burger-main', {
        x: () => getTranslation('.burger-main', '.empty-card', 0.5, 0).x,
        y: () => getTranslation('.burger-main', '.empty-card', 0, 0.45).y,
        scale: () => window.innerWidth < 900 ? 0.45 : 0.55, // Dynamic neat fit inside card
        ease: 'power2.inOut'
    });

});
//drink section
// const tl3 = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.drinks-section',
//         start: 'top 80%',
//         end: 'top 30%',
//         scrub: 1,
//         invalidateOnRefresh: true
//     }
// });

// const shift = window.innerWidth < 900 ? 70 : 110;

// tl3
//     // Step 1 → Split outward
//     .to('.drink-card:nth-child(1)', {
//         x: -shift,
//         rotation: -10,
//         scale: 0.95,
//         ease: 'power2.inOut'
//     }, 0)
//     .to('.drink-card:nth-child(3)', {
//         x: shift,
//         rotation: 10,
//         scale: 0.95,
//         ease: 'power2.inOut'
//     }, 0)

//     // Step 2 → Extra tilt as burger enters
//     .to('.drink-card:nth-child(1)', {
//         rotation: -18,
//         x: -(shift + 15),
//         ease: 'power2.inOut'
//     }, 0.35)
//     .to('.drink-card:nth-child(3)', {
//         rotation: 18,
//         x: shift + 15,
//         ease: 'power2.inOut'
//     }, 0.35)

//     // Step 3 → Settle back to original
//     .to('.drink-card:nth-child(1)', {
//         x: 0,
//         rotation: 0,
//         scale: 1,
//         ease: 'back.out(1.5)'
//     }, 0.65)
//     .to('.drink-card:nth-child(3)', {
//         x: 0,
//         rotation: 0,
//         scale: 1,
//         ease: 'back.out(1.5)'
//     }, 0.65);
const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: '.drinks-section',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        invalidateOnRefresh: true
    }
});

const shift = window.innerWidth < 900 ? 120 : 220; // 🔥 BIG horizontal
const lift = window.innerWidth < 900 ? 80 : 140;   // 🔥 BIG vertical


tl3
    // Step 1 → Strong diagonal push outward
    .to('.drink-card:nth-child(1)', {
        x: -shift,
        y: -lift,
        rotation: -20, // 🔥 stronger tilt
        scale: 0.9,
        ease: 'power2.inOut'
    }, 0)
    .to('.drink-card:nth-child(3)', {
        x: shift,
        y: -lift,
        rotation: 20,
        scale: 0.9,
        ease: 'power2.inOut'
    }, 0)

    // Step 2 → EXTRA push when burger enters (almost out of screen)
    .to('.drink-card:nth-child(1)', {
        x: -(shift + 80),
        y: -(lift + 60),
        rotation: -30, // 🔥 VERY visible tilt
        ease: 'power2.inOut'
    }, 0.35)
    .to('.drink-card:nth-child(3)', {
        x: shift + 80,
        y: -(lift + 60),
        rotation: 30,
        ease: 'power2.inOut'
    }, 0.35)

    // Step 3 → Snap back nicely
    .to('.drink-card:nth-child(1)', {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'back.out(2)' // 🔥 stronger bounce
    }, 0.7)
    .to('.drink-card:nth-child(3)', {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'back.out(2)'
    }, 0.7);
