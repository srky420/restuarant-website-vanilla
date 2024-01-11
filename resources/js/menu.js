document.addEventListener('DOMContentLoaded', () => {
    // Get menu items
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    const menuItems = document.querySelector('#menu-items');

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let meals = data.meals;

            // Add random price b/w 5 - 15 to each meal
            meals = meals.map(meal => ({
                ...meal,
                'price': '$' + Math.floor(Math.random() * (15 - 5) + 5) + '.99'
            }))

            // Pagination vars
            let currentPage = 1;
            let pageSize = 12;

            // Show current page
            menuItems.innerHTML = showPage(meals, currentPage - 1, pageSize);

            // Create pagination links
            const pagination = document.querySelector('.pagination');
            pagination.innerHTML = createPagination(paginate(meals.length, pageSize));

            // Add click event to pagination links
            const pageLinks = pagination.querySelectorAll('a');
            pageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (e.currentTarget.classList.contains('active')) {
                        return;
                    }
                    // Show clicked page
                    const page = parseInt(e.currentTarget.dataset.page);
                    menuItems.innerHTML = showPage(meals, (page - 1) * pageSize, pageSize * page);
                    
                    // Add .active to clicked link
                    pageLinks.forEach(_link => {
                        if (_link === link) {
                            _link.classList.add('active');
                            link.disabled = true;
                        }
                        else {
                            _link.classList.remove('active');
                            _link.disabled = false;
                        }
                    });
                });
            });
        })
        .catch(err => console.log(err));
});

// Create pagination pages
function paginate(numOfItems, pageSize) {
    const pages = Math.ceil(numOfItems / pageSize);
    return pages;
}

// Create pagination links
function createPagination(pages) {
    let html = '';
    for (let i = 1; i <= pages; i++) {
        html += `<a data-page="${i}" class="${i === 1 ? 'active' : ''}">${i}</a>`;
    }
    return html;
}

// Show page based on lower and upper limit i.e., slicing the data list
function showPage(list, lower, upper) {
    list = list.slice(lower, upper);
    let html = '';
    list.forEach(item => {
        html += (`<div class="menu-item">
                    <div class="menu-item-img">
                        <img src="${item.strMealThumb}" alt="dish-thumbnail">
                    </div>
                    <div class="menu-item-text">
                        <p class="dish-title">${item.strMeal}<span class="tooltip">${item.strMeal}</span></p>
                        <small class="text-primary">${item.price}</small>
                    </div>
                </div>`)
    });
    return html;
}