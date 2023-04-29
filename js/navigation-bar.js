'use strict';

export default class NavigationBar {
  header = document.querySelector('header');
  main = document.querySelector('main');
  nav = document.querySelector('.nav-bar');
  navToggle = document.querySelector('.nav-toggle');

  constructor() {
    this.navToggle.addEventListener('click', this._toggleNavigationBar.bind(this));
    this.nav.addEventListener('click', this._navigateTo.bind(this));
    window.addEventListener('scroll', this._handleHeaderShadowBox.bind(this));
  };

  _navigateTo(e) {
    e.preventDefault(); // Disable links default scrolling with href

    const clickedElementIsLink = e.target.classList.contains('nav-link');
    const clickedElementIsResume = e.target.classList.contains('resume');

    if (clickedElementIsLink) {
      const destination = e.target.getAttribute('href');
      document.querySelector(destination).scrollIntoView({behavior: 'smooth'});
  
      const navbarIsVisible = e.currentTarget.getAttribute('data-visible') === 'true';
      if (navbarIsVisible) this._toggleNavigationBar();
    }
    if (clickedElementIsResume) {
      window.location.href = e.target.href;
    }
  };

  // Expand or collapse navigation bar
  _toggleNavigationBar() {
    const isVisible = this.nav.getAttribute('data-visible') === 'true';
    this.nav.setAttribute('data-visible', !isVisible);
    this.navToggle.setAttribute('aria-expanded', !isVisible);
    this.main.setAttribute('nav-visible', !isVisible);
  };

  _showHeader() {
    this.header.setAttribute('aria-visible', true);
    // if header visible -> nav-toggle visible
    this.navToggle.setAttribute('aria-visible', true);
  };

  _hideHeader() {
    this.header.setAttribute('aria-visible', false);
    const navToggleIsExpanded = this.navToggle.getAttribute('aria-expanded') === 'false';
    // if header not visible and aria-expanded == false -> nav-toggle not visible
    // if header not visible and aria-expanded == true -> nav-toggle visible
    if (navToggleIsExpanded) this.navToggle.setAttribute('aria-visible', false);
    else this.navToggle.setAttribute('aria-visible', true);
  };
  
  _handleHeaderVisibility() {
    const threshold = 150;

    if (this.currentScroll < threshold || this.currentDirection === 'down')
      this._showHeader();
    else if (this.currentDirection === 'up') 
      this._hideHeader();
  };

  _handleHeaderShadowBox() {
    const shadowThreshold = 60;
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const showShadowBox = currentScroll > shadowThreshold;
    
    if (showShadowBox && !this.header.classList.contains('box-shadow'))
      this.header.classList.add('box-shadow');
    else if (!showShadowBox && this.header.classList.contains('box-shadow'))
      this.header.classList.remove('box-shadow');
  };
};