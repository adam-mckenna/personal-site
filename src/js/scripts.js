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
    const isOpen = nav.classList.contains('active')
    overlay.classList.toggle('overlay--active')
    nav.classList.toggle('nav--active')
    nav.setAttribute('aria-expanded', isOpen)
}