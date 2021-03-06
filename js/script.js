const introWrapper = document.querySelector('.intro-container');
const introBtn = document.querySelector('.play-btn');

if(introWrapper) {
    let mouseX = 0;
    let mouseY = 0;

    introWrapper.addEventListener('mousemove', (e)=> {    
        introBtn.style.display = 'block';
        mouseY = (e.clientY / 16) -(45 / 16) + 'rem';
        mouseX = (e.clientX / 16) -(45 / 16) + 'rem';
        
    })


    const introMouseMove =  () => {
        introBtn.style.top = mouseY;
        introBtn.style.left = mouseX;
        window.requestAnimationFrame(introMouseMove);
    }

    introMouseMove()
}


const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scrollContainer"),
    smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollContainer", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});


gsap.to('.scrub-head h2',{
  scrollTrigger: {
    trigger: ".stories",
    start: 'top center',
    end: "bottom bottom",
    scroller: '.scrollContainer',
    scrub: 3,
    },

    x: 200
})

var tl = gsap.timeline({
    scrollTrigger: {
    trigger: ".footer-animations",
    start: 'top top',
    end: "bottom bottom",
    scroller: '.scrollContainer',
 
    scrub: 3,
    pin: true,
  }
});

tl.fromTo('.bottom-img',{
  y: 0,
},{
  y: -150
})

tl.fromTo('.cloud-left',{
  scrollTrigger: {
    trigger: ".footer-animations",
    start: 'top center',
    end: "bottom bottom",
    scrub: 3,
    duration: 10
  },

  x: -100,
  opacity: 0
  
},{
  xPercent: 100,
  scale: 1.2,
  opacity: 1
  
},0)

tl.fromTo('.cloud-right',{

  x: 100,
  opacity: 0.5
  
},{
  xPercent: -100,
  scale: 1.2,
  opacity: 1
  
},0)

tl.fromTo('.top-img',{
  scale: 1
  
},{
  scale: 1.3
},0)

gsap.to('.logo-text', {
  scrollTrigger: {
    trigger: ".footer-animations",
    start: 'top top',
    end: "bottom bottom",
    scroller: '.scrollContainer',
    scrub: 1
  },
  scale: 1.1,
  y: -400
})


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight

gsap.utils
  .toArray(".cloud-slides")
  .forEach(($el) => {
    const width = $el.clientWidth;
    const delay =  2;
    const repeatDelay = 1;
    

    gsap.set($el, {
      opacity: 1,
    });

    gsap.fromTo(
      $el,
      {
        xPercent: -50,
        y: 200,
        opacity: 0.5
      },
      {
        duration: 15,
        x: width,
        y: -200,
        repeat: -1,
        delay,
        repeatDelay,
        ease: "none",
        opacity: 1
      }
    );

  })


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
