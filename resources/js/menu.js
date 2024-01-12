$(document).ready(() => {
    // Get menu items
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';

    // Get data
    $.get(url, (responseTxt, statusTxt, xhr) => {
        if (statusTxt === 'success') {
            let meals = responseTxt.meals;

            // Add random price b/w 5 - 15 to each meal
            meals = meals.map(meal => ({
                ...meal,
                'price': '$' + Math.floor(Math.random() * (15 - 5) + 5) + '.99'
            }))

            // Pagination vars
            let currentPage = 1;
            let pageSize = 12;

            $('#menu-items').html(showPage(meals, currentPage - 1, pageSize));
            $('.pagination').html(createPagination(paginate(meals.length, pageSize)));
            $('.pagination a').each((i, el) => {
                $(el).click((e) => {
                    // Check if already active page
                    if ($(el).hasClass('active')) return;

                    // Otherwise change page
                    const page = parseInt($(el).data('page'));

                    $('#menu-items').html(showPage(meals, (page - 1) * pageSize, page * pageSize));

                    $('.pagination a').each((i, _el) => _el === el ? $(_el).addClass('active') : $(_el).removeClass('active'))
                });
            });
        }
    });
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