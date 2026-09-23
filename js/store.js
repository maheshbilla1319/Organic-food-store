/* =========================================================
   GREENHARVEST SERVICES PAGE JS
========================================================= */


/* =========================================================
   AOS INITIALIZATION
========================================================= */

AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (nav.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const increment = target / (duration / 16);

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        updateCounter();

    });

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const statsSection = document.querySelector(".stats");

if (statsSection) {

    const statsObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                    statsObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    statsObserver.observe(statsSection);

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (!backTop) return;

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   NEWSLETTER FORM
========================================================= */

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {

            formMessage.textContent = "Please enter your email.";

            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email.";

            return;
        }

        formMessage.textContent =
            "Thank you! You're subscribed.";

        newsletterForm.reset();

    });

}


/* =========================================================
   SERVICE CARD MICRO INTERACTION
========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition =
            "transform .35s ease, box-shadow .35s ease";

    });

});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   GREENHARVEST STORE - MOBILE MENU
   Open / Close Navigation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (!menuBtn || !navbar) return;

    const menuIcon = menuBtn.querySelector("i");

    /* OPEN / CLOSE MENU */
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const isOpen = navbar.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close Menu" : "Open Menu"
        );

        menuBtn.setAttribute(
            "title",
            isOpen ? "Close Menu" : "Open Menu"
        );

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        }

        document.body.classList.toggle("menu-open", isOpen);
    });


    /* CLOSE MENU FUNCTION */
    function closeMenu() {

        navbar.classList.remove("open");

        menuBtn.setAttribute("aria-label", "Open Menu");
        menuBtn.setAttribute("title", "Open Menu");

        if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }

        document.body.classList.remove("menu-open");
    }


    /* CLOSE WHEN NAV LINK IS CLICKED */
    navbar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* CLOSE WHEN CLICKING OUTSIDE */
    document.addEventListener("click", (e) => {

        if (
            navbar.classList.contains("open") &&
            !navbar.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            closeMenu();
        }

    });


    /* CLOSE WITH ESC KEY */
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape" && navbar.classList.contains("open")) {
            closeMenu();
        }

    });


    /* CLOSE AFTER RESIZE TO DESKTOP */
    window.addEventListener("resize", () => {

        if (window.innerWidth > 796) {
            closeMenu();
        }

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");

    if (!newsletterForm || !newsletterEmail) return;

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = newsletterEmail.value.trim();

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            newsletterEmail.focus();
            alert("Please enter your email address.");
            return;
        }

        if (!emailPattern.test(email)) {
            newsletterEmail.focus();
            alert("Please enter a valid email address.");
            return;
        }

        // Valid email → redirect to 404.html
        window.location.href = "404.html";
    });

});
