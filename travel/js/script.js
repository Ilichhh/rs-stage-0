const body = document.querySelector('body');
const menu = document.querySelector('.nav');
const menuItem = document.querySelectorAll('.menu-item');
const hamburger = document.querySelector('.hamburger');
const closeburger = document.querySelector('.closeburger');
const submitBlocker = document.querySelector('.submit-bg');
const menuBlocker = document.querySelector('.menu-bg');
const loginBtn = document.querySelector('.login-btn');
const accountBtn = document.querySelectorAll('.menu-item')[4];

const email = document.getElementById('email');
const password = document.getElementById('password');

const popup = document.querySelector('.popup');
const signin = document.querySelectorAll('.signin-button');
const register = document.querySelectorAll('.register');
const popupHeader = document.querySelectorAll('.form-header');
const loginOnly = document.querySelectorAll('.login-only');

const slide = document.querySelectorAll('.slider-content-item')[1];
const slider = document.querySelector('.slider-content');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');


const user = {};

console.log('Слайдер изображений в секции destinations +50\nНажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\nНажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25')

window.addEventListener('DOMContentLoaded', () => {

    function togglePopup() {
        popup.classList.toggle('popup-active');
        submitBlocker.classList.toggle('bg-active');
    }

    function toggleAdaptiveMenu() {
        menu.classList.toggle('nav-active');
        menuBlocker.classList.toggle('bg-active');
    }

    loginBtn.addEventListener('click', togglePopup);
    accountBtn.addEventListener('click', togglePopup);
    hamburger.addEventListener('click', toggleAdaptiveMenu);
    closeburger.addEventListener('click', toggleAdaptiveMenu);

    submitBlocker.addEventListener('click', togglePopup);

    menuBlocker.addEventListener('click', toggleAdaptiveMenu);

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            if (parseInt(window.getComputedStyle(body).width) <= 390) {
                toggleAdaptiveMenu();
            }
        });
    })

    // Switch betwween registerand login forms
    register.forEach(i => {
        i.addEventListener('click', () => {
            popupHeader.forEach(item => {
                item.classList.toggle('hidden-popup-element');
            })
            signin.forEach(item => {
                item.classList.toggle('hidden-popup-element');
            })
            register.forEach(item => {
                item.classList.toggle('hidden-popup-element');
            })
            loginOnly.forEach(item => {
                item.classList.toggle('hidden-popup-element');
            })
        })
    })

    // Submit form
    signin.forEach(item => {
        item.addEventListener('click', () => {
            user.email = email.value;
            user.password = password.value;
            alert(`Почта: ${user.email}\nПароль: ${user.password}`);
            openClosePopup()
        })
    })

    // Slider
    let slideShift = 0;
    let activeSlide = 2;

    let switchNextSlide = () => {
        if (slideShift >= 0) {
            prevArrow.style.opacity = '100%';
            const width = parseInt(window.getComputedStyle(slide).width) + 60;
            slider.style.transform = `translateX(${slideShift - width}px)`;
            slideShift -= width;
            activeSlide ++;
            let activeNav = document.querySelectorAll(`.slider-nav-element:nth-child(${activeSlide})`)[0];
            let notActiveNav = document.querySelectorAll(`.slider-nav-element:nth-child(${activeSlide-1})`)[0];
            activeNav.classList.toggle('active');
            notActiveNav.classList.toggle('active');
        }
        if (slideShift < -1) {
            nextArrow.style.opacity = '50%';
        }
    }

    let switchPrevSlide = () => {
        if (slideShift <= 0) {
            nextArrow.style.opacity = '100%';
            const width = parseInt(window.getComputedStyle(slide).width) + 60;
            slider.style.transform = `translateX(${slideShift + width}px)`;
            slideShift += width;
            activeSlide --;
            let activeNav = document.querySelectorAll(`.slider-nav-element:nth-child(${activeSlide})`)[0];
            let notActiveNav = document.querySelectorAll(`.slider-nav-element:nth-child(${activeSlide+1})`)[0];
            activeNav.classList.toggle('active');
            notActiveNav.classList.toggle('active');
        }
        if (slideShift > 1) {
            prevArrow.style.opacity = '50%';
        }
    }
    

    nextArrow.addEventListener('click', switchNextSlide);
    prevArrow.addEventListener('click', switchPrevSlide);
    nextSlide.addEventListener('click', switchNextSlide);
    prevSlide.addEventListener('click', switchPrevSlide);

})






