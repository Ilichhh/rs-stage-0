const menu = document.querySelector('.nav');
const menuItem = document.querySelectorAll('.menu-item');
const hamburger = document.querySelector('.hamburger');
const closeburger = document.querySelector('.closeburger');
const blocker = document.querySelector('.bg');
const loginBtn = document.querySelector('.login-btn');

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


window.addEventListener('DOMContentLoaded', () => {

    function openClosePopup() {
        popup.classList.toggle('popup-active');
        blocker.classList.toggle('bg-active');
    }

    function openCloseAdaptiveMenu() {
        menu.classList.toggle('nav-active');
        blocker.classList.toggle('bg-active');
    }

    loginBtn.addEventListener('click', openClosePopup);
    hamburger.addEventListener('click', openCloseAdaptiveMenu);
    closeburger.addEventListener('click', openCloseAdaptiveMenu);

    blocker.addEventListener('click', () => {
        openCloseAdaptiveMenu()
        popup.classList.toggle('popup-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', openCloseAdaptiveMenu)
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
        console.log(slideShift);
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
        console.log(slideShift);
        if (slideShift > 1) {
            prevArrow.style.opacity = '50%';
        }
    }
    

    nextArrow.addEventListener('click', switchNextSlide);
    prevArrow.addEventListener('click', switchPrevSlide);
    nextSlide.addEventListener('click', switchNextSlide);
    prevSlide.addEventListener('click', switchPrevSlide);

})






