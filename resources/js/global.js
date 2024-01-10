document.addEventListener('DOMContentLoaded', () => {
    // Nav collapse
    const navList = document.querySelector('.nav-list');
    const burger = document.querySelector('.burger');

    console.log(navList)
    console.log(burger)

    burger.addEventListener('click', (e) => {
        navList.classList.toggle('nav-show');
        burger.classList.toggle('burger-active')
    })

});