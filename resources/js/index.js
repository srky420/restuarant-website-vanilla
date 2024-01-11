let animate = true;

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
        const achievementSec = document.querySelector('#achievements-section')
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (animate) counterAnimation();           
            }
        }, {
            root: null,
            threshold: 0.5
        })

        observer.observe(achievementSec);
})

function counterAnimation() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {

        const value = parseInt(counter.dataset.value);
        const info = counter.dataset.info;
        let c = 0;

        counter.innerHTML = c + info;

        const updateCounter = () => {
            let c = parseInt(counter.innerHTML);
            let increment = value / 200;

            if (c < value) {
                counter.innerHTML = `${Math.ceil(c + increment)}${info}`;
                setTimeout(updateCounter, 20);
            }
            else {
                counter.innerHTML = value + info;
            }

        }
        setTimeout(updateCounter(), 1000);
    });
    animate = false;
}

