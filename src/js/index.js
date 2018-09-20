const hamburgerIcon = document.getElementById('hamburger-icon');
const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');
const navbarMobileContainer = document.getElementById('navbar-mobile-black');
let delta = 0;

hamburgerIcon.addEventListener('click', () => {
  if (!hamburgerIcon.classList.contains('active')) {
    hamburgerIcon.classList.add('active');
    menu.classList.remove('hidden');
    navbar.classList.add('black');
    navbarMobileContainer.classList.add('black');
  } else {
    hamburgerIcon.classList.remove('active');
    menu.classList.add('hidden');
  }
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('black');
    navbarMobileContainer.classList.add('black');
    if (delta < window.scrollY) {
      navbar.classList.add('hidden');
      menu.classList.add('hidden');
      hamburgerIcon.classList.remove('active');
    } else {
      navbar.classList.remove('hidden');
    }
    delta = window.scrollY;
  } else {
    navbar.classList.remove('black');
    navbarMobileContainer.classList.remove('black');
    navbar.classList.remove('hidden');
  }
});

const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const sliderContainer = document.getElementById('items-container');
const mobileIndicators = document.getElementsByClassName('indicator');

let sliderPosition = 500;

function indicatorActivate(activeNumber) {
  for (let i = 0; i < mobileIndicators.length; i++) {
    mobileIndicators[i].classList.remove('active')
  }
  for (let i = 0; i <= activeNumber; i++) {
    mobileIndicators[i].classList.add('active')
  }
}

arrowLeft.addEventListener('click', () => {
  sliderPosition -= 100;
  sliderContainer.style.left = '-' + sliderPosition + 'vw';

  if (sliderPosition === 0) {
    arrowLeft.style.display = 'none';
  }

  if (sliderPosition === 700) {
    arrowRight.style.display = 'block';
  }
  indicatorActivate(sliderPosition / 100);
});

arrowRight.addEventListener('click', () => {
  sliderPosition += 100;
  sliderContainer.style.left = '-' + sliderPosition + 'vw';

  if (sliderPosition === 800) {
    arrowRight.style.display = 'none';
  }

  if (sliderPosition === 100) {
    arrowLeft.style.display = 'block';
  }
  indicatorActivate(sliderPosition / 100);
});
