// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sethi Burger Application Initialized.');
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Set the entire hero layers group to be the top-most z-index so it gracefully floats above the next section
    gsap.set('.hero-layers', { zIndex: 100 });
    
    // Create responsive timeline triggered by Hero Section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top', 
            end: 'top+=' + window.innerHeight * 1.2, // Arbitrary smooth distance equivalent to scrolling into the about section
            scrub: 1, // Added a slight scrub delay for a 'premium' floaty feel
            invalidateOnRefresh: true
        }
    });

    // 1. Move & Scale the ENTIRE Hero Group (Burger + all ingredients) to the Plate!
    tl.to('.hero-layers', {
        y: () => {
            const group = document.querySelector('.hero-layers').getBoundingClientRect();
            const burger = document.querySelector('.burger-main').getBoundingClientRect();
            const plate = document.querySelector('.about-plate').getBoundingClientRect();
            
            // The group scales around its own center
            const groupCenterY = group.top + group.height / 2;
            
            // Assume the burger's visual bottom is ~85% down its physical height
            const unscaledBurgerBottom = burger.top + (burger.height * 0.85);
            
            // Where the burger bottom will end up after just scaling the group by 0.75
            const scaledBurgerBottom = groupCenterY + (unscaledBurgerBottom - groupCenterY) * 0.75;
            
            // The destination boundary (the plate lip)
            const targetBottom = plate.top + (plate.height * 0.1);
            
            return targetBottom - scaledBurgerBottom;
        },
        x: () => {
            const group = document.querySelector('.hero-layers').getBoundingClientRect();
            const burger = document.querySelector('.burger-main').getBoundingClientRect();
            const plate = document.querySelector('.about-plate').getBoundingClientRect();
            
            // The group scales around its own horizontal center
            const groupCenterX = group.left + group.width / 2;
            const unscaledBurgerCenterX = burger.left + burger.width / 2;
            
            const scaledBurgerCenterX = groupCenterX + (unscaledBurgerCenterX - groupCenterX) * 0.75;
            const targetCenterX = plate.left + plate.width / 2;
            
            return targetCenterX - scaledBurgerCenterX;
        },
        scale: 0.75, 
        ease: 'power2.inOut' // Premium smooth easing
    }, 0);

    // 2. Add subtle micro-floating animations to the ingredients within the moving group
    tl.to('.latus1', { rotation: -10, y: -20, x: -10, ease: 'power1.inOut' }, 0);
    tl.to('.latus2', { rotation: 10, y: 10, x: 15, ease: 'power1.inOut' }, 0);
    tl.to('.tamato1', { rotation: 5, y: -15, ease: 'power1.inOut' }, 0);
    tl.to('.tamato2', { rotation: -10, y: 15, ease: 'power1.inOut' }, 0);

    // 3. INDEPENDENT INGREDIENT FLIGHT TO ABOUT SECTION EDGES (Reusing Hero Layers)
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
            invalidateOnRefresh: true
        }
    });

    // Tomato (tamato2) to LEFT side of burger
    // Starts right side of burger, swoops horizontally to the left
    aboutTl.to('.tamato2', {
        x: () => -window.innerWidth * 0.45, 
        y: 200, 
        rotation: 45,
        ease: 'power1.out'
    }, 0);

    // Lettuce (latus2) to FAR LEFT side of screen
    // Starts top right of burger, swoops strongly left
    aboutTl.to('.latus2', {
        x: () => -window.innerWidth * 0.55, 
        y: 150, 
        rotation: -45,
        ease: 'power1.out'
    }, 0);

});
