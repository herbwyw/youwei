const scroller1 = document.querySelector('#scroll-feature')
const buttonLeft = document.querySelector('.slide-button.left')
const buttonRight = document.querySelector('.slide-button.right')
const maskLeft = document.querySelector('.white-mask.left')
const maskRight = document.querySelector('.white-mask.right')
var xMove = 0
var offset = 600

// console.log(scroller1.offsetWidth)
// console.log(scroller1.scrollWidth)

buttonLeft.addEventListener('click', moveLeft)
buttonRight.addEventListener('click', moveRight)
window.addEventListener('resize', setVisiable)

function moveLeft() {
    if (xMove * -1 > offset) {
        xMove = xMove + offset
    } else {
        xMove = 0
    }
    scroller1.style.transform = `translateX(${xMove}px)`
    setVisiable()
}

function moveRight() {
    if (scroller1.offsetWidth - xMove + offset < scroller1.scrollWidth) {
        xMove = xMove - offset
    } else {
        xMove = scroller1.offsetWidth - scroller1.scrollWidth
    }
    scroller1.style.transform = `translateX(${xMove}px)`
    setVisiable()
}

function setVisiable() {
    if (xMove == 0 || scroller1.offsetWidth >= scroller1.scrollWidth) {
        maskLeft.classList.add('hide')
    } else {
        maskLeft.classList.remove('hide')
    }

    if (xMove == (scroller1.offsetWidth - scroller1.scrollWidth) || scroller1.offsetWidth >= scroller1.scrollWidth) {
        maskRight.classList.add('hide')
    } else {
        maskRight.classList.remove('hide')
    }
}

setVisiable()