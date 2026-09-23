/* =========================================================
   GREENHARVEST ORGANIC FOOD STORE - BLOG JS
   MOBILE MENU + PRELOADER + HEADER + BACK TO TOP
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU TOGGLE
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            navbar.classList.toggle("open");

            const isOpen = navbar.classList.contains("open");

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close Menu" : "Open Menu"
            );

            menuBtn.setAttribute(
                "title",
                isOpen ? "Close Menu" : "Open Menu"
            );

            /* Change menu icon */

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            /* Prevent body scrolling when menu is open */

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* =================================================
           CLOSE MENU WHEN NAV LINK IS CLICKED
        ================================================= */

        const navLinks = navbar.querySelectorAll(
            ".nav-link, .nav-login"
        );

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open Menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* =================================================
           CLOSE MENU WHEN CLICKING OUTSIDE
        ================================================= */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedMenuButton =
                menuBtn.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedMenuButton &&
                navbar.classList.contains("open")
            ) {

                navbar.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open Menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });


        /* =================================================
           CLOSE MENU WITH ESC KEY
        ================================================= */

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                navbar.classList.contains("open")
            ) {

                navbar.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open Menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });


        /* =================================================
           RESET MENU WHEN RESIZING TO DESKTOP
        ================================================= */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                navbar.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open Menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });

    }


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    const searchBtn = document.querySelector(".search-btn");

    if (searchBtn) {

        searchBtn.addEventListener("click", function () {

            alert("Search feature coming soon.");

        });

    }


    /* =====================================================
       CART BUTTON
    ===================================================== */

    const cartBtn = document.querySelector(".cart-btn");

    if (cartBtn) {

        cartBtn.addEventListener("click", function () {

            alert("Your cart is currently empty.");

        });

    }


    /* =====================================================
       NEWSLETTER FORM
       Handles duplicate newsletter forms safely
    ===================================================== */

    const newsletterForms =
        document.querySelectorAll(".newsletter-form");

    newsletterForms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput =
                form.querySelector('input[type="email"]');

            if (!emailInput) return;

            const email =
                emailInput.value.trim();

            /* Find message only inside contact section */

            const contactSection =
                form.closest(".blog-contact");

            const formMessage =
                contactSection
                    ? contactSection.querySelector("#formMessage")
                    : null;


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                }

                emailInput.focus();

                return;

            }


            /* Success */

            if (formMessage) {

                formMessage.textContent =
                    "Thank you! You are now subscribed.";

            }

            form.reset();

        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById("backTop");

    function handleBackTop() {

        if (!backTop) return;

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    handleBackTop();

    window.addEventListener("scroll", handleBackTop, {
        passive: true
    });


    if (backTop) {

        backTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const allNavLinks =
        document.querySelectorAll(".navbar .nav-link");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) return;

        const cleanLinkPage =
            linkPage
                .split("/")
                .pop()
                .toLowerCase();

        link.classList.remove("active");

        if (
            cleanLinkPage === currentPage ||
            (
                currentPage === "" &&
                cleanLinkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            delay: 0,
            disable: function () {

                return window.innerWidth < 360;

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

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
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    const cartCount =
        document.querySelector(".cart-count");

    if (cartCount) {

        let cartItems = 2;

        cartCount.textContent = cartItems;

    }


    /* =====================================================
       MARQUEE PAUSE ON HOVER / TOUCH
    ===================================================== */

    const marquee =
        document.querySelector(".food-marquee");

    const marqueeTrack =
        document.querySelector(".marquee-track");

    if (marquee && marqueeTrack) {

        marquee.addEventListener(
            "mouseenter",
            function () {

                marqueeTrack.style.animationPlayState =
                    "paused";

            }
        );

        marquee.addEventListener(
            "mouseleave",
            function () {

                marqueeTrack.style.animationPlayState =
                    "running";

            }
        );

        marquee.addEventListener(
            "touchstart",
            function () {

                marqueeTrack.style.animationPlayState =
                    "paused";

            },
            {
                passive: true
            }
        );

        marquee.addEventListener(
            "touchend",
            function () {

                setTimeout(function () {

                    marqueeTrack.style.animationPlayState =
                        "running";

                }, 1000);

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       PREVENT MOBILE MENU BODY SCROLL
    ===================================================== */

    const menuStyle = document.createElement("style");

    menuStyle.textContent = `
        body.menu-open {
            overflow: hidden;
        }

        @media (min-width: 901px) {
            body.menu-open {
                overflow: auto;
            }
        }
    `;

    document.head.appendChild(menuStyle);


    /* =====================================================
       FINAL AOS REFRESH
    ===================================================== */

    window.addEventListener("load", function () {

        if (typeof AOS !== "undefined") {
            AOS.refresh();
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
