HTMLDocument.prototype.ready = new Promise(resolve => {
    if (document.readyState != "loading")
        return resolve()
    else
        document.addEventListener("DOMContentLoaded", resolve())
})

document.ready.then(init)

function init() {
    var preloads = document.getElementsByClassName('preload')
    for (let i = 0; i < preloads.length; i++)
        preloads[i].classList.remove('preload')

    const toggles = document.getElementsByClassName('nav__toggle')
    for (let i = 0; i < toggles.length; i++)
        toggles[i].addEventListener('click', toggleMenu)
}

function toggleMenu() {
    const nav = document.getElementById('nav')
    const overlay = document.getElementById('nav-overlay')
    const isOpen = nav.classList.contains('nav--active')
    overlay.classList.toggle('overlay--active')
    nav.classList.toggle('nav--active')
    nav.setAttribute('aria-expanded', isOpen)

    const tabindex = isOpen ? -1 : 0
    const navLinks = document.getElementsByClassName('nav__link')
    const navCloseBtn = document.getElementsByClassName('nav__close-button')[0]
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].setAttribute('tabindex', tabindex)
        navCloseBtn.setAttribute('tabindex', tabindex)
    }
}