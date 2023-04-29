'use strict';
import Projects from './projects.js';
import Experiences from './experiences.js';

const projects = new Projects();
projects.render();

const experiences = new Experiences();
experiences.render();

const nav = document.querySelector('.nav-bar');
const navToggle = document.querySelector('.nav-toggle');
const main = document.querySelector('main');
const header = document.querySelector('header');

navToggle.addEventListener('click', () => {
  // Toggle navbar visibility
  const isVisible = nav.getAttribute('data-visible') === 'true';
  nav.setAttribute('data-visible', !isVisible);
  navToggle.setAttribute('aria-expanded', !isVisible);
  main.setAttribute('nav-visible', !isVisible);
});

/*  scroll */
let previousScroll = window.scrollY || document.documentElement.scrollTop;
let currentScroll = previousScroll;
let previousDirection = 'up';
let currentDirection = previousDirection;
let toggled;

const checkScroll = function() {
  const toggleHeader = function() {
    const threshold = 200;
    toggled = true;
    if (currentDirection === 'down') {
      if (currentScroll > threshold) {
        header.setAttribute('aria-visible', false);
        const navToggleIsExpanded = navToggle.getAttribute('aria-expanded') === 'false';
        // if header not visible and aria-expanded == false -> nav-toggle not visible
        // if header not visible and aria-expanded == true -> nav-toggle visible
        if (navToggleIsExpanded) navToggle.setAttribute('aria-visible', false);
        else navToggle.setAttribute('aria-visible', true);
      }
    } else if (currentDirection === 'up') {
      header.setAttribute('aria-visible', true);
      // if header visible -> nav-toggle visible
      navToggle.setAttribute('aria-visible', true);
    } else toggled = false;
    return toggled;
  };
  
  currentScroll = window.scrollY || document.documentElement.scrollTop;
  const shadowThreshold = 60;

  const showShadowBox = currentScroll > shadowThreshold;
  /* box shadow */
  if (showShadowBox && !header.classList.contains('box-shadow'))
    header.classList.add('box-shadow');
  else if (!showShadowBox && header.classList.contains('box-shadow'))
    header.classList.remove('box-shadow');

  /* hide or show navbar */
  const isScrollingDown = currentScroll > previousScroll;
  currentDirection = isScrollingDown ? 'down' : 'up';
  if (currentDirection !== previousDirection) toggled = toggleHeader();
  previousScroll = currentScroll;
  if (toggled) previousDirection = currentDirection;
};

window.addEventListener('scroll', checkScroll);

const closeNavBar = function() {
  nav.setAttribute('data-visible', false);
  navToggle.setAttribute('aria-expanded', false);
  main.setAttribute('nav-visible', false);
  const headerIsVisible = header.getAttribute('aria-visible');
  if (headerIsVisible === 'false')
    navToggle.setAttribute('aria-visible', false);
};

document.querySelector('.nav-bar').addEventListener('click', function(e) {
  e.preventDefault(); // Disable links default scrolling with href
  const clickedElementIsLink = e.target.classList.contains('nav-link');
  if (clickedElementIsLink) {
    if (e.target.classList.contains('resume')) {
      window.location.href = e.target.href;
      return;
    }
    const dest = e.target.getAttribute('href');
    document.querySelector(dest).scrollIntoView({behavior: 'smooth'});

    const navbarIsVisible = e.currentTarget.getAttribute('data-visible') === 'true';
    if (navbarIsVisible) closeNavBar();
  }
});