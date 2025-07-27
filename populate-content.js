class ContentManager {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.populateContent());
        } else {
            this.populateContent();
        }
    }

    populateContent() {
        if (!window.eventData) {
            return;
        }

        this.populateMenuSection('cardapioDeBebidas', window.eventData.cardapioDeBebidas);
        this.populateSection('cidade', window.eventData.cidade);
        this.populateSectionWithClass('grupo', window.eventData.grupo, 'preserve-breaks');
        this.populateSectionWithAchievements('associacao', window.eventData.associacao, 'preserve-breaks');
        this.populateSectionWithClass('casa', window.eventData.casa, 'preserve-breaks');
        this.populateListSection('programacao', window.eventData.programacao);
        this.populateSectionWithAchievements('sobre-jantar', window.eventData.sobreJantar, 'preserve-breaks');
        this.populateListSection('integrantes', window.eventData.integrantes);
        this.populateSectionWithAchievements('Apoiadores', window.eventData.Apoiadores, 'preserve-breaks');
        this.populateSponsorsSection('infoPatrocinadores', window.eventData.infoPatrocinadores);
    }

    populateMenuSection(sectionId, data) {
        const section = document.getElementById(sectionId);
        if (!section || !data || !data.categories) return;
        const title = section.querySelector('h2');
        if (title) title.textContent = data.title;
        const existingContent = section.querySelector('ul');
        if (existingContent) {
            existingContent.remove();
        }
        const menuContainer = document.createElement('div');
        menuContainer.className = 'drink-menu';

        data.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'drink-category';
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';            
            const categoryIcon = document.createElement('span');
            categoryIcon.className = 'category-icon';
            categoryIcon.textContent = category.icon;            
            const categoryName = document.createElement('h4');
            categoryName.className = 'category-name';
            categoryName.textContent = category.name;            
            categoryHeader.appendChild(categoryIcon);
            categoryHeader.appendChild(categoryName);
            const itemsList = document.createElement('ul');
            itemsList.className = 'category-items';

            category.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'drink-item';
                
                const itemName = document.createElement('span');
                itemName.className = 'drink-name';
                itemName.textContent = item.name;
                
                const itemPrice = document.createElement('span');
                itemPrice.className = 'drink-price';
                itemPrice.textContent = item.price;
                
                listItem.appendChild(itemName);
                listItem.appendChild(itemPrice);
                itemsList.appendChild(listItem);
            });
            categoryDiv.appendChild(categoryHeader);
            categoryDiv.appendChild(itemsList);
            menuContainer.appendChild(categoryDiv);
        });

        section.appendChild(menuContainer);
    }

    populateSection(sectionId, data) {
    const section = document.getElementById(sectionId);
    if (!section || !data) return;
    const title = section.querySelector('h2');
    if (title) title.textContent = data.title;
    const content = section.querySelector('p');
    if (content && typeof data.content === 'string') {
        content.textContent = data.content;
        content.classList.add('preserve-breaks'); 
    }
}

    populateSectionWithClass(sectionId, data, cssClass) {
        const section = document.getElementById(sectionId);
        if (!section || !data) return;
        const title = section.querySelector('h2');
        if (title) title.textContent = data.title;
        const content = section.querySelector('p');
        if (content && typeof data.content === 'string') {
            content.textContent = data.content;
            content.classList.add(cssClass);
        }
        
    }

    populateListSection(sectionId, data) {
        const section = document.getElementById(sectionId);
        if (!section || !data || !Array.isArray(data.content)) return;
        const title = section.querySelector('h2');
        if (title) title.textContent = data.title;
        const list = section.querySelector('ul');
        if (list) {
            list.innerHTML = '';
            
            data.content.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });
        }
    }

    populateSectionWithAchievements(sectionId, data, cssClass) {
    const section = document.getElementById(sectionId);
    if (!section || !data) return;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = data.title;
    
    const content = section.querySelector('p');
    if (content && typeof data.content === 'string') {
        content.textContent = data.content;
        content.classList.add(cssClass);
    }

    const existingList = section.querySelector('ul');
    if (existingList) existingList.remove();
    
    if (data.achievements && Array.isArray(data.achievements)) {
        const achievementsList = document.createElement('ul');
        achievementsList.className = 'achievements-list';
        
        data.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            li.classList.add(cssClass); 
            achievementsList.appendChild(li);
        });
        
        section.appendChild(achievementsList);
    }
}

populateSponsorsSection(sectionId, data) {
    const section = document.getElementById(sectionId);
    if (!section || !data) return;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = data.title;
    
    // Remove conteúdo existente
    const existingContent = section.querySelectorAll(':not(h2)');
    existingContent.forEach(el => el.remove());
    
    if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'sponsor-category';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.innerHTML = `${category.icon} ${category.name}`;
            categoryDiv.appendChild(categoryTitle);
            
            const sponsorsList = document.createElement('div');
            sponsorsList.className = 'sponsors-list';
            
            category.sponsors.forEach((sponsor, index) => {
                const sponsorDiv = document.createElement('div');
                sponsorDiv.className = 'sponsor-item';
                sponsorDiv.innerHTML = `
                    <h4>${category.icon} ${sponsor.name}</h4>
                    <p>📍 ${sponsor.address}</p>
                    <p>📞 ${sponsor.phone}</p>
                `;
                sponsorsList.appendChild(sponsorDiv);
            });
            
            categoryDiv.appendChild(sponsorsList);
            section.appendChild(categoryDiv);
        });
    }
}
}

new ContentManager();