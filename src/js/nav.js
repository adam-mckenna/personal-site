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

        // Adjust nav attributes for appropriate device
        this.adjustNavAttributes()

        // Adjust nav attributes accordingly after each window resize 
        window.onresize = () => this.adjustNavAttributes()
    } 
    
    toggleMenu() {
        this.element.classList.toggle('nav--active')
        this.overlay.classList.toggle('overlay--active')

        const isOpen = this.element.classList.contains('nav--active')
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
        const lastItem = tabElements[tabElements.length - 1]
        e = e || event
    
        if (e.keyCode === 9) {
            if (e.shiftKey) 
                firstItem.onblur = () => lastItem.focus()
    
            lastItem.onblur = () => firstItem.focus()
        }
    }

    adjustNavAttributes() {
        const mediaQuery = window.matchMedia("(min-width: 48.125em)")
        const links = document.getElementsByClassName('nav__link')

        if (mediaQuery.matches) {
            // Remove mobile-specific classes
            this.element.classList.remove('nav--active')
            this.overlay.classList.remove('overlay--active')

            // Nav no longer has ability to be toggled, so set expanded to true
            this.element.setAttribute('aria-expanded', true)

            // Add tabindex to each link in nav
            Array.from(links).forEach(element => {
                element.setAttribute('tabindex', 0)
            })
        } else {
            // Nav is automatically hidden at mobile size, so set expanded to false
            this.element.setAttribute('aria-expanded', false)
        }
    }
}

export { Nav }