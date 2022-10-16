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

    /* if link from navbar is clicked */
    $("#primary-navigation li a").click(() => {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
        main.setAttribute("nav-visible", false);
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
        let nav_toggle = document.getElementById("nav-toggle");
        let navtoggleIsExpanded = nav_toggle.getAttribute("aria-expanded");
        let header = document.getElementById("header");
        if (curDirection === 2 && curScroll > threshold) {  // set header to not visible
            header.setAttribute("aria-visible", false);
            // if header not visible and aria-expanded == false -> nav-toggle not visible
            // if header not visible and aria-expanded == true -> nav-toggle visible
            if (navtoggleIsExpanded === "false") nav_toggle.setAttribute("aria-visible", false);
            else nav_toggle.setAttribute("aria-visible", true);
        }
        else if (curDirection === 1) {  // set header to visible
            header.setAttribute("aria-visible", true);
            // if header visible -> nav-toggle visible
            nav_toggle.setAttribute("aria-visible", true);
        }
        else toggled = false;
        return toggled;
    }

    window.addEventListener("scroll", checkScroll);

    /* resume */
    document.getElementById("resume").addEventListener("click", () => {
        window.location.href="resume.pdf";
    })

    // await getProjects();
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

// const getProjects = async () => {
//     try {
//         projectsData = (await axios.get("https://landing-page-json-server-production.up.railway.app/projects")).data;
//     } catch(error) {
//         console.log(error);
//     }
// }

const displayProjects = () => {
    projectsData.forEach((project) => {
        $("#projects-wrapper").append(
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
                    </ul>
                </div>
            </div>
        </a>`);
        project.technologies.forEach(technology => {
            $(`#project${project.id}`).append(`<li>${technology}</li>`)
        });
    })
}