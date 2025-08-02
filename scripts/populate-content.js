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
        this.populateSectionWithClass('integrantesAdultos', window.eventData.integrantesAdultos, 'preserve-breaks');
        this.populateArtesanato('exposicaoArtesanato', eventData.exposicaoArtesanato);
        this.populateSectionWithClass('chorPolskieSokoly', window.eventData.chorPolskieSokoly, 'preserve-breaks');
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
        
        const existingImages = section.querySelector('.supporter-images');
        if (existingImages) existingImages.remove();
        
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
        
        if (data.supporterImages && Array.isArray(data.supporterImages)) {
            const imagesContainer = document.createElement('div');
            imagesContainer.className = 'supporter-images';
            
            data.supporterImages.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                imgElement.className = 'supporter-image';
                imagesContainer.appendChild(imgElement);
            });
            
            section.appendChild(imagesContainer);
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
                
                // Adiciona classe especial para patrocinador prata
                if (category.name.toLowerCase().includes('prata')) {
                    categoryDiv.classList.add('silver-sponsor');
                }
                
                const categoryTitle = document.createElement('h3');
                categoryTitle.innerHTML = `${category.icon} ${category.name}`;
                categoryDiv.appendChild(categoryTitle);
                
                const sponsorsList = document.createElement('div');
                sponsorsList.className = 'sponsors-list';
                
                category.sponsors.forEach((sponsor, index) => {
                    const sponsorDiv = document.createElement('div');
                    sponsorDiv.className = 'sponsor-item';
                    
                    const sponsorName = document.createElement('h4');
                    sponsorName.textContent = sponsor.name;
                    sponsorDiv.appendChild(sponsorName);
                    
                    const sponsorInfo = document.createElement('div');
                    sponsorInfo.className = 'sponsor-info';
                    
                    if (sponsor.address) {
                        const address = document.createElement('p');
                        address.textContent = `Endereço: ${sponsor.address}`;
                        sponsorInfo.appendChild(address);
                    }
                    
                    if (sponsor.phone) {
                        const phone = document.createElement('p');
                        phone.textContent = `Telefone: ${sponsor.phone}`;
                        sponsorInfo.appendChild(phone);
                    }
                    
                    if (sponsor.instagram) {
                        const instagramP = document.createElement('p');
                        const instagramLink = document.createElement('a');
                        instagramLink.href = sponsor.instagram;
                        instagramLink.target = '_blank';
                        instagramLink.className = 'instagram-link';
                        instagramLink.textContent = `@${sponsor.name.toLowerCase().replace(/\s+/g, '')}`;
                        instagramLink.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        instagramP.appendChild(instagramLink);
                        sponsorInfo.appendChild(instagramP);
                    }
                    
                    if (sponsor.website) {
                        const websiteP = document.createElement('p');
                        const websiteLink = document.createElement('a');
                        websiteLink.href = sponsor.website;
                        websiteLink.target = '_blank';
                        websiteLink.className = 'website-link';
                        websiteLink.textContent = 'Site oficial';
                        websiteLink.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        websiteP.appendChild(websiteLink);
                        sponsorInfo.appendChild(websiteP);
                    }
                    
                    sponsorDiv.appendChild(sponsorInfo);
                    sponsorsList.appendChild(sponsorDiv);
                });
                
                categoryDiv.appendChild(sponsorsList);
                section.appendChild(categoryDiv);
            });
        }
    }

    
    populateArtesanato(sectionId, data) {
        const section = document.getElementById(sectionId);
        if (!section || !data) return;
        
        const title = section.querySelector('h2');
        if (title) title.textContent = data.title;
        
        const gallery = section.querySelector('.artesanato-gallery');
        if (gallery && data.gallery) {
            gallery.innerHTML = '';
            
            data.gallery.forEach(image => {
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                img.className = 'artesanato-image';
                img.loading = 'lazy';
                
                img.onerror = function() {
                    this.style.display = 'none';
                    console.warn(`Imagem não encontrada: ${this.src}`);
                };
                
                gallery.appendChild(img);
            });
        }
    }

    
}

// Inicializa a classe
new ContentManager();