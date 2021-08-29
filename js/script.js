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
        console.log("hello")
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





ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
