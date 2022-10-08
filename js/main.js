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
        let header = document.getElementById("header");
        if (curDirection === 2 && curScroll > threshold) header.classList.add("hide");
        else if (curDirection === 1) header.classList.remove("hide");
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
    title: "Stock Price Predictor",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "https://github.com/jianingxu1",
    technologies: [
      "Python"
    ]
  }];

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
                        <div class="folder">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        </div>
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