window.onload = async () => {
    /* navbar */
    const nav = document.getElementById("nav-bar");
    const navToggle = document.getElementById("nav-toggle");
    const main = document.getElementById("main");

    navToggle.addEventListener("click", () => {
        let visibility = nav.getAttribute("data-visible");
        /* if navbar is expanded */
        if (visibility === "false") {
           nav.setAttribute("data-visible", true);
           navToggle.setAttribute("aria-expanded", true);
           main.setAttribute("nav-visible", true);
        } else {
            nav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);
            main.setAttribute("nav-visible", false);
        }
    })

    /* if link from navbar is clicked, close navbar */
    $("#primary-navigation li a").click(() => {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
        main.setAttribute("nav-visible", false);
        let header = document.getElementById("header");
        let headerIsVisible = header.getAttribute("aria-visible")
        if (headerIsVisible === "false") navToggle.setAttribute("aria-visible", false);
    })

    /*  scroll */
    var curScroll = prevScroll = window.scrollY || document.documentElement.scrollTop;
    var curDirection = prevDirection = 0;
    const threshold = 200;
    var toggled;

    const checkScroll = () => {
        curScroll = window.scrollY || document.documentElement.scrollTop;
        let header = document.getElementById("header");
        let shadowThreshold = 60;
        /* box shadow */
        if (curScroll > shadowThreshold && !header.classList.contains("box-shadow")) header.classList.add("box-shadow");
        else if (curScroll < shadowThreshold && header.classList.contains("box-shadow")) header.classList.remove("box-shadow");
        /* hide / show */
        if (curScroll > prevScroll) curDirection = 2;   // scrolls down
        else curDirection = 1;  // scrolls up
        if (curDirection !== prevDirection) toggled = toggleHeader();
        prevScroll = curScroll;
        if (toggled) prevDirection = curDirection;
    }

    const toggleHeader = () => {
        toggled = true;
        let navtoggleIsExpanded = navToggle.getAttribute("aria-expanded");
        let header = document.getElementById("header");
        if (curDirection === 2 && curScroll > threshold) {  // set header to not visible
            header.setAttribute("aria-visible", false);
            // if header not visible and aria-expanded == false -> nav-toggle not visible
            // if header not visible and aria-expanded == true -> nav-toggle visible
            if (navtoggleIsExpanded === "false") navToggle.setAttribute("aria-visible", false);
            else navToggle.setAttribute("aria-visible", true);
        }
        else if (curDirection === 1) {  // set header to visible
            header.setAttribute("aria-visible", true);
            // if header visible -> nav-toggle visible
            navToggle.setAttribute("aria-visible", true);
        }
        else toggled = false;
        return toggled;
    }

    window.addEventListener("scroll", checkScroll);

    /* resume */
    document.getElementById("resume").addEventListener("click", () => {
        window.location.href="resume.pdf";
    })

    displayProjects();
}

var projectsData = [{
    id: 1,
    title: "jianingxu.me",
    img: "./img/projects/jianingxu-me.png",
    alt: "Preview of the project's website.",
    description: "Developed a fully responsive personal website from scratch using HTML, CSS (Bootstrap) and JavaScript.",
    url: "https://github.com/jianingxu1/jianingxu.me",
    technologies: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript"
    ]
  },
  {
    id: 2,
    title: "TY Art Academy",
    img: "./img/projects/tongyou-academy.png",
    alt: "Preview of the project's website.",
    description: "Built a website for an Art Academy from scratch using HTML, CSS and JavaScript.",
    url: "https://github.com/jianingxu1/tongyou-academy",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ]
  },
  {
    id: 3,
    title: "Tennis Circuit Manager",
    img: "./img/projects/tennis-circuit-manager.png",
    alt: "The output of the tennis circuit manager program given a sample input.",
    description: "Created a program that manages a Tennis Circuit using C++.",
    url: "https://github.com/jianingxu1/practicaPRO2",
    technologies: [
      "C++"
    ]
  }
];

const projectToCard = (project) => {
    let techList = '';
    for (const tech of project.technologies) {
        techList += `<li>${tech}</li>`;
    }
    const card = 
    `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="d-flex align-items-stretch">
        <div class="card" style="width: 18rem;">
            <div class="card-body d-flex flex-column">
                <div class="project-icons">
                    <img src="${project.img}" alt="${project.alt}" style="width: 15rem; height: 150px">
                </div>
                <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                        <h5 class="project-title">${project.title}</h5>
                        <p class="project-description">${project.description}</p>
                    </div>
                    <ul class="project-technologies" id="project${project.id}">
                        ${techList}
                    </ul>
                </div>
            </div>
        </div>
    </a>`;
    return card;
};

const displayProjects = () => {
    const wrapper = document.querySelector('#projects-wrapper');
    let projectsHtml = '';
    for (const project of projectsData) {
        projectsHtml += projectToCard(project);
    }
    wrapper.innerHTML = projectsHtml;
}

const experiences = [{
    title: 'Event Assistant',
    company: 'Huawei',
    startDate: new Date(2022, 1),   // February 2022
    endDate: new Date(2022, 2),     // March 2022
    description:
      ['Attended and helped customers in various languages (English,  Chinese, and Spanish).',
      'Provided support to Huawei clients within the congress hall.'],
    tools: []
  }
];

const getMonthFromDate = date => {
  return date.toLocaleString('default', { month: 'short'});
};

const getDuration = (startDate, endDate) => {
  const startMonth = getMonthFromDate(startDate).toUpperCase();
  const endMonth = getMonthFromDate(endDate).toUpperCase();
  return `${startMonth} ${startDate.getFullYear()} - ${endMonth} ${endDate.getFullYear()}`;
};

const getTabContent = (experience, isDisplayed, i) => {
  const tabContent = 
`<button id="tab-${i}" class="tab" type="button" aria-selected=${isDisplayed}>
  <span tab='${i}'>${experience.company.toUpperCase()}</span>
</button>
`;
  return tabContent;
};

const getExperienceContent = (experience, isDisplayed, i) => {
  let jobPoints = '';
  for (const jobPoint of experience.description) {
    jobPoints += `<li>${jobPoint}</li>`;
  }
  const experienceContent =
`<div id="content-${i}" class="experience-content" aria-selected=${isDisplayed}>
  <p>
    <span class="job-title">${experience.title} @</span>
    <span class="job-company">${experience.company}</span>
    <div class="job-duration">${getDuration(experience.startDate, experience.endDate)}</div>
    <ul class="job-description">${jobPoints}</ul>
  </p>
</div>
`;
  return experienceContent;
};

const displayExperience = () => {
  let tabsContent = '';
  let experienceContent = '';
  for (const [i, experience] of experiences.entries()) {
    let isDisplayed = 'false';
    if (i === 0) isDisplayed = 'true';
    tabsContent += getTabContent(experience, isDisplayed, i);
    experienceContent += getExperienceContent(experience, isDisplayed, i);
  }
  document.querySelector('#experience-tab').innerHTML = tabsContent;
  document.querySelector('#experience-content-container').innerHTML = experienceContent;
};

// Display tab when clicked
const displayClickedTab = () => {
  const tabs = document.querySelectorAll('.tab');
  let selectedTab = 0;
  for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
      const clickedTab = Number(e.target.id[4]);
      if (clickedTab !== selectedTab) {
        // Remove selectedTab
        document.querySelector(`#tab-${selectedTab}`).setAttribute('aria-selected', 'false');
        document.querySelector(`#content-${selectedTab}`).setAttribute('aria-selected', 'false');
        selectedTab = clickedTab;
        document.querySelector(`#tab-${selectedTab}`).setAttribute('aria-selected', 'true');
        document.querySelector(`#content-${selectedTab}`).setAttribute('aria-selected', 'true');
      }
    });
  }
}

displayExperience();
displayClickedTab();