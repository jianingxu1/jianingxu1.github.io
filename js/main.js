window.onload = () => {
    /* navbar */
    const nav = document.getElementById("nav-bar");
    const navToggle = document.getElementById("nav-toggle");
    navToggle.addEventListener("click", () => {
        let visibility = nav.getAttribute("data-visible");
        if (visibility === "false") {
           nav.setAttribute("data-visible", true);
           navToggle.setAttribute("aria-expanded", true);
        } else {
            nav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);
        }
    })

    $("#primary-navigation li a").click(() => {
        let visibility = nav.getAttribute("data-visible");
        if (visibility) {
            nav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);
        }
    })

    /*  scroll */
    var curScroll = prevScroll = window.scrollY || document.documentElement.scrollTop;
    var curDirection = prevDirection = 0;
    const threshold = 200;
    var toggled;

    const checkScroll = () => {
        curScroll = window.scrollY || document.documentElement.scrollTop;
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
}

