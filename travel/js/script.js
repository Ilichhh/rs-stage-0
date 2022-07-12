console.log('Вёрстка соответствует макету. Ширина экрана 390px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 390рх и меньше реализовано адаптивное меню +22\nИтого 85/75');

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.nav'),
          menuItem = document.querySelectorAll('.menu-item'),
          hamburger = document.querySelector('.hamburger'),
          closeburger = document.querySelector('.closeburger'),
          blocker = document.querySelector('.bg');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        blocker.classList.toggle('bg-active');
    });

    closeburger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        blocker.classList.toggle('bg-active');
    });

    blocker.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        blocker.classList.toggle('bg-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('nav-active');
            blocker.classList.toggle('bg-active');
        })
    })
})