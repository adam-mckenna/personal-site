document.addEventListener("DOMContentLoaded", init)

function init() {
    const toggles = document.getElementsByClassName('button');
    for (let i = 0; i < toggles.length; i++)
        toggles[i].addEventListener('click', toggleMenu);
}

function toggleMenu() {
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('nav-overlay');
    const isOpen = nav.classList.contains('active');
    overlay.classList.toggle('overlay--active');
    nav.classList.toggle('nav--active');
    nav.setAttribute('aria-expanded', isOpen);
}