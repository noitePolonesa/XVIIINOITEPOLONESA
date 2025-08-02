function populateContent() {
    Object.keys(eventData).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const data = eventData[sectionId];
        const title = section.querySelector('h2');
        
        if (title) {
            title.textContent = data.title;
        }

        if (sectionId === 'cardapioDeBebidas') {
            const drinkMenu = section.querySelector('ul');
            if (drinkMenu && data.categories) {
                drinkMenu.innerHTML = '';
                drinkMenu.className = 'drink-menu';
                
                data.categories.forEach(category => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'drink-category';
                    
                    const categoryHeader = document.createElement('div');
                    categoryHeader.className = 'category-header';
                    
                    const categoryIcon = document.createElement('div');
                    categoryIcon.className = 'category-icon';
                    categoryIcon.textContent = getCategoryIcon(category.name);
                    
                    const categoryName = document.createElement('h3');
                    categoryName.className = 'category-name';
                    categoryName.textContent = category.name;
                    
                    categoryHeader.appendChild(categoryIcon);
                    categoryHeader.appendChild(categoryName);
                    
                    const categoryItems = document.createElement('ul');
                    categoryItems.className = 'category-items';
                    
                    category.items.forEach(item => {
                        const itemLi = document.createElement('li');
                        itemLi.className = 'drink-item';
                        
                        const itemName = document.createElement('span');
                        itemName.className = 'drink-name';
                        itemName.textContent = item.name;
                        
                        const itemPrice = document.createElement('span');
                        itemPrice.className = 'drink-price';
                        itemPrice.textContent = item.price;
                        
                        itemLi.appendChild(itemName);
                        itemLi.appendChild(itemPrice);
                        categoryItems.appendChild(itemLi);
                    });
                    
                    categoryDiv.appendChild(categoryHeader);
                    categoryDiv.appendChild(categoryItems);
                    drinkMenu.appendChild(categoryDiv);
                });
            }
        }
        else if (sectionId === 'exposicaoArtesanato') {
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
        else if (sectionId === 'infoPatrocinadores') {
            const content = section.querySelector('p');
            if (content) {
                content.remove();
            }
            
            if (data.categories) {
                data.categories.forEach(category => {
                    const categorySection = document.createElement('div');
                    categorySection.className = 'sponsor-category';
                    
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.className = 'sponsor-category-title';
                    categoryTitle.innerHTML = `${category.icon} ${category.name}`;
                    categorySection.appendChild(categoryTitle);
                    
                    const sponsorsGrid = document.createElement('div');
                    sponsorsGrid.className = 'sponsors-grid';
                    
                    category.sponsors.forEach(sponsor => {
                        const sponsorCard = document.createElement('div');
                        sponsorCard.className = 'sponsor-card';
                        
                        const sponsorName = document.createElement('h4');
                        sponsorName.className = 'sponsor-name';
                        sponsorName.textContent = sponsor.name;
                        
                        const sponsorAddress = document.createElement('p');
                        sponsorAddress.className = 'sponsor-address';
                        sponsorAddress.textContent = sponsor.address;
                        
                        const sponsorPhone = document.createElement('p');
                        sponsorPhone.className = 'sponsor-phone';
                        sponsorPhone.textContent = sponsor.phone;
                        
                        const sponsorInstagram = document.createElement('a');
                        sponsorInstagram.className = 'sponsor-instagram';
                        sponsorInstagram.href = sponsor.instagram;
                        sponsorInstagram.target = '_blank';
                        sponsorInstagram.rel = 'noopener noreferrer';
                        sponsorInstagram.textContent = 'Ver no Instagram';
                        
                        sponsorCard.appendChild(sponsorName);
                        sponsorCard.appendChild(sponsorAddress);
                        sponsorCard.appendChild(sponsorPhone);
                        sponsorCard.appendChild(sponsorInstagram);
                        
                        sponsorsGrid.appendChild(sponsorCard);
                    });
                    
                    categorySection.appendChild(sponsorsGrid);
                    section.appendChild(categorySection);
                });
            }
        }
        else if (data.supporterImages) {
            const content = section.querySelector('p');
            if (content && data.content) {
                content.textContent = data.content;
                content.className = 'preserve-breaks';
            }
            
            if (data.achievements) {
                const achievementsList = document.createElement('ul');
                achievementsList.className = 'achievements-list';
                
                data.achievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.textContent = achievement;
                    li.className = 'preserve-breaks';
                    achievementsList.appendChild(li);
                });
                
                section.appendChild(achievementsList);
            }
            
            const imagesContainer = document.createElement('div');
            imagesContainer.className = 'supporter-images';
            
            data.supporterImages.forEach(imageData => {
                const img = document.createElement('img');
                img.src = imageData.src;
                img.alt = imageData.alt;
                img.className = 'supporter-image';
                img.loading = 'lazy';
                
                img.onerror = function() {
                    this.style.display = 'none';
                    console.warn(`Imagem de apoiador não encontrada: ${this.src}`);
                };
                
                imagesContainer.appendChild(img);
            });
            
            section.appendChild(imagesContainer);
        }
        else if (data.achievements) {
            const content = section.querySelector('p');
            if (content && data.content) {
                content.textContent = data.content;
                content.className = 'preserve-breaks';
            }
            
            const achievementsList = section.querySelector('ul') || document.createElement('ul');
            if (!section.querySelector('ul')) {
                section.appendChild(achievementsList);
            }
            
            achievementsList.innerHTML = '';
            achievementsList.className = 'achievements-list';
            
            data.achievements.forEach(achievement => {
                const li = document.createElement('li');
                li.textContent = achievement;
                li.className = 'preserve-breaks';
                achievementsList.appendChild(li);
            });
        }
        else if (Array.isArray(data.content)) {
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
        else if (data.content) {
            const content = section.querySelector('p');
            if (content) {
                content.textContent = data.content;
                content.className = 'preserve-breaks';
            }
        }
    });
}

function getCategoryIcon(categoryName) {
    const icons = {
        'Bebidas Frias': '🥤',
        'Vinhos': '🍷',
        'Espumantes': '🍾',
        'Cervejas': '🍺',
        'Destilados': '🥃'
    };
    return icons[categoryName] || '🍹';
}

function addSupporterImageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .supporter-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(220, 20, 60, 0.02);
            border-radius: 12px;
            border: 1px solid rgba(220, 20, 60, 0.1);
        }
        
        .supporter-image {
            width: 100%;
            height: 120px;
            object-fit: contain;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .supporter-image:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(220, 20, 60, 0.15);
        }
        
        @media (max-width: 768px) {
            .supporter-images {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                padding: 1rem;
            }
            
            .supporter-image {
                height: 100px;
                padding: 0.75rem;
            }
        }
        
        @media (max-width: 480px) {
            .supporter-images {
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }
            
            .supporter-image {
                height: 80px;
                padding: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    populateContent();
    addSupporterImageStyles();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        populateContent();
        addSupporterImageStyles();
    });
} else {
    populateContent();
    addSupporterImageStyles();
}