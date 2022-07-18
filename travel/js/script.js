const menu = document.querySelector('.nav');
const menuItem = document.querySelectorAll('.menu-item');
const hamburger = document.querySelector('.hamburger');
const closeburger = document.querySelector('.closeburger');
const blocker = document.querySelector('.bg');
const loginBtn = document.querySelector('.login-btn');

const popup = document.querySelector('.popup');
const signin = document.querySelectorAll('.signin-button');
const register = document.querySelectorAll('.register');
const popupHeader = document.querySelectorAll('.form-header');
const loginOnly = document.querySelectorAll('.login-only');


window.addEventListener('DOMContentLoaded', () => {

    loginBtn.addEventListener('click', () => {
        blocker.classList.toggle('bg-active');
        popup.classList.toggle('popup-active');
    });

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
        popup.classList.toggle('popup-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('nav-active');
            blocker.classList.toggle('bg-active');
        })
    })
})




// Switch to register form
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

