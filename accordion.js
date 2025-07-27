class AccordionManager {
    constructor() {
        this.accordions = [];
        this.init();
    }

    init() {
        setTimeout(() => {
            this.setupAllAccordions();
        }, 100);
    }

    setupAllAccordions() {        
        const eventoSections = document.querySelectorAll('.evento');
        
        eventoSections.forEach((section, index) => {
            this.setupAccordion(section, index);
        });
        
    }

    setupAccordion(section, index) {
    const header = section.querySelector('h2');
    
    if (!header) return;
    
    const allContentAfterH2 = Array.from(section.children).filter(child => 
        child !== header && child.tagName !== 'SPAN' && !child.classList.contains('accordion-icon')
    );
    
    if (allContentAfterH2.length === 0) return;
    
    const contentId = `accordion-content-${index}`;
    
    section.classList.add('accordion-section', 'collapsed');
    section.setAttribute('tabindex', '0');
    section.setAttribute('role', 'button');
    section.setAttribute('aria-expanded', 'false');
    section.setAttribute('aria-label', `Clique para expandir ou recolher ${header.textContent}`);
    
    header.classList.add('accordion-title');
    
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'accordion-content';
    contentWrapper.id = contentId;
    contentWrapper.setAttribute('aria-labelledby', section.id || `section-${index}`);
    contentWrapper.style.height = '0px';
    contentWrapper.style.paddingTop = '0';
    contentWrapper.style.paddingBottom = '0';
    contentWrapper.style.opacity = '0';
    contentWrapper.style.overflow = 'hidden';
    
    allContentAfterH2.forEach(element => {
        const clonedElement = element.cloneNode(true);
        contentWrapper.appendChild(clonedElement);
        element.remove();
    });
    
    section.appendChild(contentWrapper);
    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');
    header.appendChild(icon);        
    this.setupEventListeners(section, contentWrapper);
    this.accordions.push({
        section: section,
        content: contentWrapper,
        isExpanded: false
    });
}

    setupEventListeners(section, content) {
        section.addEventListener('click', (event) => {
            event.preventDefault();
            this.handleToggle(section, content);
        });        
        section.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleToggle(section, content);
            }
        });
        section.style.cursor = 'pointer';
    }

    handleToggle(section, content) {
        const isExpanded = section.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            this.collapseContent(content);
            section.classList.add('collapsed');
            section.setAttribute('aria-expanded', 'false');
        } else {
            this.expandContent(content);
            section.classList.remove('collapsed');
            section.setAttribute('aria-expanded', 'true');
        }
        const accordionData = this.accordions.find(acc => acc.section === section);
        if (accordionData) {
            accordionData.isExpanded = !isExpanded;
        }
    }

    collapseContent(content) {
        const height = content.scrollHeight;
        content.style.height = height + 'px';
        
        content.offsetHeight; 
        
        requestAnimationFrame(() => {
            content.style.height = '0px';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            content.style.opacity = '0';
        });
    }

    expandContent(content) {
        content.style.height = 'auto';
        const height = content.scrollHeight;
        
        content.style.height = '0px';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        content.style.opacity = '0';
        
        content.offsetHeight;
        
        requestAnimationFrame(() => {
            content.style.height = height + 'px';
            content.style.paddingTop = '2rem';
            content.style.paddingBottom = '2rem';
            content.style.opacity = '1';
        });
        
        setTimeout(() => {
            content.style.height = 'auto';
        }, 400);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.accordionManager = new AccordionManager();
    });
} else {
    window.accordionManager = new AccordionManager();
}