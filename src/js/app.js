import { Nav } from './nav.js'
 
HTMLDocument.prototype.ready = new Promise(resolve => {
    if (document.readyState != "loading")
        return resolve()
    else 
        document.addEventListener("DOMContentLoaded", resolve())
})
document.ready.then(init)

function init() {
    removePreloadClass()

    new Nav(
        document.getElementById('nav'),
        document.getElementById('nav-overlay')
    ).init()
}
 
function removePreloadClass() {
    const preloads = document.getElementsByClassName('preload')
    for (let i = 0; i < preloads.length; i++)
        preloads[i].classList.remove('preload')
}