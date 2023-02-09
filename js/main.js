'use strict';

const projects = [
  {
    id: 1,
    title: 'jianingxu.me',
    img: './img/projects/jianingxu-me.png',
    alt: "Preview of the project's website.",
    description:
      'Developed a fully responsive personal website from scratch using HTML, CSS (Bootstrap) and JavaScript.',
    url: 'https://github.com/jianingxu1/jianingxu.me',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
  },
  {
    id: 2,
    title: 'TY Art Academy',
    img: './img/projects/tongyou-academy.png',
    alt: "Preview of the project's website.",
    description:
      'Built a website for an Art Academy from scratch using HTML, CSS and JavaScript.',
    url: 'https://github.com/jianingxu1/tongyou-academy',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 3,
    title: 'Tennis Circuit Manager',
    img: './img/projects/tennis-circuit-manager.png',
    alt: 'The output of the tennis circuit manager program given a sample input.',
    description: 'Created a program that manages a Tennis Circuit using C++.',
    url: 'https://github.com/jianingxu1/practicaPRO2',
    technologies: ['C++'],
  },
];

const experiences = [
  {
    title: 'Event Assistant',
    company: 'Huawei',
    startDate: new Date(2022, 1), // February 2022
    endDate: new Date(2022, 2), // March 2022
    description: [
      'Attended and helped customers in various languages (English, Chinese, and Spanish).',
      'Provided support to Huawei clients within the congress hall.',
    ],
    skills: [],
  }
];

window.onload = async () => {
  /* navbar */
  const nav = document.querySelector('#nav-bar');
  const navToggle = document.querySelector('#nav-toggle');
  const main = document.querySelector('#main');
  const header = document.querySelector('#header');

  navToggle.addEventListener('click', () => {
    const visibility = nav.getAttribute('data-visible');
    /* if navbar is expanded */
    if (visibility === 'false') {
      nav.setAttribute('data-visible', true);
      navToggle.setAttribute('aria-expanded', true);
      main.setAttribute('nav-visible', true);
    } else {
      nav.setAttribute('data-visible', false);
      navToggle.setAttribute('aria-expanded', false);
      main.setAttribute('nav-visible', false);
    }
  });

  const closeNavbar = () => {
    nav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    main.setAttribute('nav-visible', false);
    const headerIsVisible = header.getAttribute('aria-visible');
    if (headerIsVisible === 'false')
      navToggle.setAttribute('aria-visible', false);
  }

  /* if link from navbar is clicked, close navbar */
  document.querySelectorAll('.link').forEach(link => link.addEventListener('click', closeNavbar));

  /*  scroll */
  let previousScroll = window.scrollY || document.documentElement.scrollTop;
  let currentScroll = previousScroll;
  let previousDirection = 0;
  let currentDirection = previousDirection;
  let toggled;

  const checkScroll = () => {
    currentScroll = window.scrollY || document.documentElement.scrollTop;
    const shadowThreshold = 60;

    const showShadowBox = currentScroll > shadowThreshold;
    /* box shadow */
    if (showShadowBox && !header.classList.contains('box-shadow'))
      header.classList.add('box-shadow');
    else if (!showShadowBox && header.classList.contains('box-shadow'))
      header.classList.remove('box-shadow');

    /* hide or show navbar */
    const scrollDown = currentScroll > previousScroll;
    if (scrollDown) currentDirection = 2;
    else currentDirection = 1; // scrolls up

    if (currentDirection !== previousDirection) toggled = toggleHeader();
    previousScroll = currentScroll;
    if (toggled) previousDirection = currentDirection;
  };

  const toggleHeader = () => {
    const threshold = 200;
    toggled = true;
    const navtoggleIsExpanded = navToggle.getAttribute('aria-expanded');
    if (currentDirection === 2 && currentScroll > threshold) {
      // set header to not visible
      header.setAttribute('aria-visible', false);
      // if header not visible and aria-expanded == false -> nav-toggle not visible
      // if header not visible and aria-expanded == true -> nav-toggle visible
      if (navtoggleIsExpanded === 'false')
        navToggle.setAttribute('aria-visible', false);
      else navToggle.setAttribute('aria-visible', true);
    } else if (currentDirection === 1) {
      // set header to visible
      header.setAttribute('aria-visible', true);
      // if header visible -> nav-toggle visible
      navToggle.setAttribute('aria-visible', true);
    } else toggled = false;
    return toggled;
  };

  window.addEventListener('scroll', checkScroll);

  /* resume */
  document.querySelector('#resume').addEventListener('click', () => {
    window.location.href = 'resume.pdf';
  });
};

const getHtmlList = (acc, elem) => {
  return acc + `<li>${elem}</li>`;
};

const projectToCard = (project) => {
  const techList = project.technologies.reduce(getHtmlList, '');
  const card = `<a href='${project.url}' target='_blank' rel='noopener noreferrer' class='d-flex align-items-stretch'>
        <div class='card' style='width: 18rem;'>
            <div class='card-body d-flex flex-column'>
                <div class='project-icons'>
                    <img src='${project.img}' alt='${project.alt}' style='width: 15rem; height: 150px'>
                </div>
                <div class='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <h5 class='project-title'>${project.title}</h5>
                        <p class='project-description'>${project.description}</p>
                    </div>
                    <ul class='project-technologies' id='project${project.id}'>
                        ${techList}
                    </ul>
                </div>
            </div>
        </div>
    </a>`;
  return card;
};

const displayProjects = (projects) => {
  const projectsContainer = document.querySelector('#projects-container');
  projectsContainer.innerHTML = '';
  const projectsHtml = projects.reduce((acc, project) => acc + projectToCard(project), '');
  projectsContainer.insertAdjacentHTML('afterbegin', projectsHtml);
};

const getTabHtml = (experience, isDisplayed, i) => {
  const tabHtml = `<button id='tab-${i}' class='tab' type='button' aria-selected=${isDisplayed}>
  <span tab='${i}'>${experience.company.toUpperCase()}</span>
  </button>
  `;
  return tabHtml;
};

const getMonthFromDate = date => {
  return date.toLocaleString('default', { month: 'short' });
};

const getDurationFromDates = (startDate, endDate) => {
  const startMonth = getMonthFromDate(startDate).toUpperCase();
  const endMonth = getMonthFromDate(endDate).toUpperCase();
  return `${startMonth} ${startDate.getFullYear()} - ${endMonth} ${endDate.getFullYear()}`;
};

const getExperienceHtml = (experience, isDisplayed, i) => {
  const pointsHtml = experience.description.reduce(getHtmlList, '');
  const experienceHtml = `<div id='content-${i}' class='experience-content' aria-selected=${isDisplayed}>
  <p>
    <span class='job-title'>${experience.title} @</span>
    <span class='job-company'>${experience.company}</span>
    <div class='job-duration'>${getDurationFromDates(
    experience.startDate,
    experience.endDate
  )}</div>
    <ul class='job-description'>${pointsHtml}</ul>
  </p>
</div>
`;
  return experienceHtml;
};

const displayExperience = experiences => {
  const [tabsHtml, expsHtml] = experiences.reduce(([tabsHtml, expsHtml], exp, i) => {
    const isDisplayed = i === 0 ? 'true' : 'false';
    const tabHtml = getTabHtml(exp, isDisplayed, i);
    const expHtml = getExperienceHtml(exp, isDisplayed, i);
    return [tabsHtml + tabHtml, expsHtml + expHtml];
  }, ['', '']);
  document.querySelector('#experience-tab').insertAdjacentHTML('afterbegin', tabsHtml);
  document.querySelector('#experience-content-container').insertAdjacentHTML('afterbegin', expsHtml);
};

// Display tab when clicked
const displayClickedTab = () => {
  let previousTab = 0;
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', e => {
      const currentTab = parseInt(e.target.id.match(/\d+/));
      if (currentTab !== previousTab) {
        // Hide previous tab
        document.querySelector(`#tab-${previousTab}`).setAttribute('aria-selected', false);
        document.querySelector(`#content-${previousTab}`).setAttribute('aria-selected', false);
        // Show current Tab
        document.querySelector(`#tab-${currentTab}`).setAttribute('aria-selected', true);
        document.querySelector(`#content-${currentTab}`).setAttribute('aria-selected', true);
        previousTab = currentTab;
      }
    })
  });
};

displayProjects(projects);
displayExperience(experiences);
displayClickedTab();