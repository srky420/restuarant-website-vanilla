let animate = true;

$(document).ready(() => {
    // Get meals data
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';

    $.get(url, (responseTxt, statusTxt, xhr) => {
        if (statusTxt === 'success') {
            const meals = responseTxt.meals;
            console.log(meals)
            let html = '';
            meals.slice(0, 3).forEach(meal => {
                html += (`<div class="dish">
                            <div class="dish-img">
                                <img src="${meal.strMealThumb}" alt="dish-thumbnail">
                            </div>
                            <div class="dish-text">
                                <h4>${meal.strMeal}</h4>
                                <div class="stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>`)
            });
            $('#featured-dishes').html(html);
        }
    })

    // Achievements scroll view
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            if (animate) counterAnimation();           
        }
    }, {
        root: null,
        threshold: 0.5
    })

    observer.observe($('#achievements-section')[0]);
})

function counterAnimation() {
    $('.counter').each((i, el) => {

        const value = parseInt($(el).data('value'));
        const info = $(el).data('info');
        let c = 0;

        $(el).html(c + info)

        const updateCounter = () => {
            let increment = value / 200;

            if (c < value) {
                c += increment;
                $(el).html(`${Math.ceil(c)}${info}`);
                setTimeout(updateCounter, 10);
            }
            else {
                $(el).html(value + info);
            }
        }
        updateCounter();
    });
    animate = false;
}

