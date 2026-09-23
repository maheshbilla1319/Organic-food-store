/* =========================================================
   GREENHARVEST CONTACT PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });

    }


    /* ================= PRELOADER ================= */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (preloader) {
                preloader.classList.add("hide");
            }

            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }

        }, 450);

    });


    /* ================= HEADER ================= */

    const header =
        document.getElementById("header");


    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* ================= MOBILE MENU ================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const navbar =
        document.getElementById("navbar");


    function closeMenu() {

        if (!navbar) {
            return;
        }

        navbar.classList.remove("open");


        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-label",
                "Open Menu"
            );

            menuBtn.setAttribute(
                "title",
                "Open Menu"
            );


            const icon =
                menuBtn.querySelector("i");


            if (icon) {

                icon.className =
                    "fa-solid fa-bars";

            }

        }

    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function () {

                const isOpen =
                    navbar.classList.toggle("open");


                menuBtn.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close Menu"
                        : "Open Menu"
                );


                menuBtn.setAttribute(
                    "title",
                    isOpen
                        ? "Close Menu"
                        : "Open Menu"
                );


                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.className =
                        isOpen
                            ? "fa-solid fa-xmark"
                            : "fa-solid fa-bars";

                }

            }
        );

    }


    /* CLOSE MENU AFTER CLICK */

    if (navbar) {

        navbar
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        }
    );


    /* ================= FAQ ================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const button =
            item.querySelector(".faq-question");


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains("active");


                faqItems.forEach(
                    function (otherItem) {

                        otherItem.classList.remove(
                            "active"
                        );


                        const otherButton =
                            otherItem.querySelector(
                                ".faq-question"
                            );


                        if (otherButton) {

                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );


                if (!isActive) {

                    item.classList.add("active");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


    /* ================= COUNTERS ================= */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(element) {

        const target =
            Number(element.dataset.target || 0);

        const startTime =
            performance.now();

        const duration = 1800;


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const easing =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(target * easing);


            element.textContent =
                value.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                counterObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.45
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    } else {

        counters.forEach(
            function (counter) {

                counter.textContent =
                    Number(
                        counter.dataset.target
                    ).toLocaleString();

            }
        );

    }

/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ================= GET FORM FIELDS ================= */

            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            /* ================= EMPTY FIELD VALIDATION ================= */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {
                return;
            }


            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !subject.value.trim() ||
                !message.value.trim()
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please complete all fields before sending.";

                    formStatus.classList.remove("success");
                    formStatus.classList.add("error");
                }

                return;
            }


            /* ================= EMAIL VALIDATION ================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email.value.trim())) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter a valid email address.";

                    formStatus.classList.remove("success");
                    formStatus.classList.add("error");
                }

                email.focus();

                return;
            }


            /* ================= SUCCESS MESSAGE ================= */

            if (formStatus) {

                formStatus.textContent =
                    `Thanks ${name.value.trim()}! Your message has been received.`;

                formStatus.classList.remove("error");
                formStatus.classList.add("success");
            }


            /* ================= CLEAR FORM ================= */

            contactForm.reset();


            /* ================= REDIRECT TO 404 ================= */

            setTimeout(function () {

                window.location.assign("404.html");

            }, 1000);

        }
    );
}



    /* ================= SEARCH ================= */

    const searchButton =
        document.querySelector(
            '.search-btn'
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const query =
                    window.prompt(
                        "What are you looking for?"
                    );


                if (query && query.trim()) {

                    window.location.href =
                        `store.html?search=${encodeURIComponent(
                            query.trim()
                        )}`;

                }

            }
        );

    }


    /* ================= ESC KEY ================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

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
