/* =========================================================
   GREENHARVEST ABOUT PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 90,
            delay: 50
        });

    }


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("show");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuBtn.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });


        /* Close menu after click */

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1800;

                    const startTime =
                        performance.now();


                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                eased * target
                            );

                        counter.textContent =
                            current.toLocaleString();

                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();

                        }

                    }

                    requestAnimationFrame(
                        updateCounter
                    );

                    counterObserver.unobserve(counter);

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       IMAGE LOAD EFFECT
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("load", () => {

            img.classList.add("loaded");

        });

    });


    /* =====================================================
       RESIZE — CLOSE MOBILE MENU
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            navbar
        ) {

            navbar.classList.remove("show");

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

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
