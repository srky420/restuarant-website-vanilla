document.addEventListener('DOMContentLoaded', ()=> {
    // Nav collapse
    const navList = document.querySelector('.nav-list');
    const burger = document.querySelector('.burger');

    console.log(navList)
    console.log(burger)

    burger.addEventListener('click', (e) => {
        navList.classList.toggle('nav-show');
        burger.classList.toggle('burger-active')
    })

    // Get meals data
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    const featured = document.querySelector('#featured-cards');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meals = data.meals;
            let html = '';
            meals.slice(0, 3).forEach(meal => {
                html += (`<div class="card">
                            <div class="card-img">
                                <img src="${meal.strMealThumb}" alt="meal-thumbnail">
                            </div>
                            <div class="card-text">
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
})