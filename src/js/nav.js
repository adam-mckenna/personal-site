class Nav {
    constructor(element, overlay) {
      this.element = element
      this.overlay = overlay
    }

    init() { 
        // Setup nav toggle button event listeners
        const toggles = document.getElementsByClassName('nav__toggle')
        Array.from(toggles).forEach(element => {
            element.addEventListener('click', () => this.toggleMenu())
        }) 
            
        // Setup 'focus trap' checking
        this.element.addEventListener('keyup', () => this.checkTabPress())
    } 
    
    toggleMenu() {
        const isOpen = this.element.classList.contains('nav--active')
        this.overlay.classList.toggle('overlay--active')
        this.element.classList.toggle('nav--active')
        this.element.setAttribute('aria-expanded', isOpen)

        const links = document.getElementsByClassName('nav__link')
        const closeBtn = document.getElementsByClassName('nav__close-button')[0]
        Array.from(links).forEach(element => {
            element.setAttribute('tabindex', isOpen ? -1 : 0)
            closeBtn.setAttribute('tabindex', isOpen ? -1 : 0)
        })
    } 

    checkTabPress(e) {
        const tabElements = this.element.querySelectorAll(['button', 'a'])
        const firstItem = tabElements[0]
        const lastItem = tabElements[tabElements.length-1]
        e = e || event
    
        if (e.keyCode === 9) {
            if (e.shiftKey) 
                firstItem.onblur = () => lastItem.focus()
    
            lastItem.onblur = () => firstItem.focus()
        }
    }
}

export { Nav }