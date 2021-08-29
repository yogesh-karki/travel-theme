const btns = document.querySelectorAll('.marker-region')
const regionBox = document.querySelector('.region-box')
const closeBtn = document.querySelector('#close-region')


btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        regionBox.classList.add("show");
    })
})

closeBtn.addEventListener('click', function() {
    regionBox.classList.remove("show");
})