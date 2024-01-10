document.addEventListener('DOMContentLoaded', () => {
    // Get meals data
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    const featured = document.querySelector('#featured-dishes');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meals = data.meals;
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
            })
            featured.innerHTML = html;
        })
        .catch(err => console.log(err))

        // Achievements scroll view
        const achievementSec = document.querySelector('#achievement-section')
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {

            }
        }, {
            root: null,
            threshold: 0.5
        })

        observer.observe(achievementSec);
})

