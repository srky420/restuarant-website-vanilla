document.addEventListener('DOMContentLoaded', () => {
    // Get menu items
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    const menuItems = document.querySelector('#menu-items');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meals = data.meals;
            let html = '';
            meals.forEach((meal, i) => {
                html += (`<div class="menu-item">
                            <div class="menu-item-img">
                                <img src="${meal.strMealThumb}" alt="dish-thumbnail">
                            </div>
                            <div class="menu-item-text">
                                <p>${meal.strMeal}</p>
                                <div class="stars">
                                    ${generateRandomStars()}
                                </div>
                            </div>
                        </div>`)
            })
            menuItems.innerHTML = html;

            // Pagination
            const pagination = document.querySelector('.pagination');
            pagination.innerHTML =  createPagination(paginate(meals.length, 10));
        });
});

// Generate random number of star
function generateRandomStars() {
    const num = Math.random() * (5 - 2) + 2;
    let html = '';
    for (let i = 0; i < num; i++) {
        html += '<i class="fa-solid fa-star"></i>';
    }
    return html
}

// Create pagination
function paginate(numOfItems, pageSize) {
    const pages = Math.ceil(numOfItems / pageSize);
    return pages;
}

function createPagination(pages) {
    let html = '';
    for (let i = 1; i <= pages; i++) {
        html += `<a href="#">${i}</a>`;
    }
    return html;
}