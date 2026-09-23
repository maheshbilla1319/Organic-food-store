/* =========================================================
   GREENHARVEST ORGANIC FOOD STORE
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       OPEN / CLOSE TOGGLE
    ===================================================== */

    const menuBtn =
        document.querySelector(".menu-btn");

    const navbar =
        document.querySelector(".navbar");


    const closeMobileMenu = () => {

        if (!navbar || !menuBtn) return;

        navbar.classList.remove("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    };


    const openMobileMenu = () => {

        if (!navbar || !menuBtn) return;

        navbar.classList.add("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

    };


    if (menuBtn && navbar) {

        /* Toggle menu */

        menuBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    navbar.classList.contains("open");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        /* Close after navigation click */

        navbar
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    navbar.classList.contains("open") &&
                    !navbar.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* Close with Escape */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(".hero-slide");

    const dots =
        document.querySelectorAll(".dot");

    const nextBtn =
        document.querySelector(".slider-btn.next");

    const prevBtn =
        document.querySelector(".slider-btn.prev");

    const hero =
        document.querySelector(".hero");

    let currentSlide = 0;

    let sliderTimer;


    const showSlide = (index) => {

        if (!slides.length) return;


        if (index >= slides.length) {

            currentSlide = 0;

        } else if (index < 0) {

            currentSlide =
                slides.length - 1;

        } else {

            currentSlide = index;

        }


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    };


    const startSlider = () => {

        if (slides.length <= 1) return;

        clearInterval(sliderTimer);

        sliderTimer = setInterval(() => {

            showSlide(
                currentSlide + 1
            );

        }, 5000);

    };


    const nextSlide = () => {

        showSlide(
            currentSlide + 1
        );

        startSlider();

    };


    const previousSlide = () => {

        showSlide(
            currentSlide - 1
        );

        startSlider();

    };


    if (slides.length) {

        showSlide(0);


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                nextSlide
            );

        }


        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                previousSlide
            );

        }


        dots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    startSlider();

                }
            );

        });


        startSlider();

    }


    /* =====================================================
       PAUSE SLIDER ON HOVER
    ===================================================== */

    if (
        hero &&
        slides.length > 1
    ) {

        hero.addEventListener(
            "mouseenter",
            () => {

                clearInterval(sliderTimer);

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );

    }


    /* =====================================================
       KEYBOARD SLIDER CONTROL
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!slides.length) return;


            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section[id]");


    const updateActiveNavigation = () => {

        if (
            !sections.length ||
            !navLinks.length
        ) {

            return;

        }


        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;


            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.querySelector(".back-top");


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backTop.classList.add(
                        "show"
                    );

                } else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       NEWSLETTER FORMS
       VALIDATION + 404 REDIRECT

       Works for BOTH newsletter forms
    ===================================================== */

    const newsletterForms =
        document.querySelectorAll(
            ".newsletter-form"
        );


    newsletterForms.forEach(form => {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* Find email input inside this form */

                const emailInput =
                    form.querySelector(
                        'input[type="email"]'
                    );


                if (!emailInput) return;


                const email =
                    emailInput.value.trim();


                /* =================================================
                   CORRECT EMAIL REGEX
                ================================================= */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                /* =================================================
                   REMOVE OLD MESSAGE
                ================================================= */

                const oldMessage =
                    form.querySelector(
                        ".form-message"
                    );


                if (oldMessage) {

                    oldMessage.remove();

                }


                /* =================================================
                   CREATE MESSAGE
                ================================================= */

                const message =
                    document.createElement(
                        "span"
                    );


                message.className =
                    "form-message";


                /* =================================================
                   EMPTY EMAIL
                ================================================= */

                if (email === "") {

                    message.textContent =
                        "Please enter your email address.";

                    message.classList.add(
                        "error"
                    );

                    form.appendChild(
                        message
                    );

                    emailInput.focus();

                    return;

                }


                /* =================================================
                   INVALID EMAIL
                ================================================= */

                if (
                    !emailPattern.test(email)
                ) {

                    message.textContent =
                        "Please enter a valid email address.";

                    message.classList.add(
                        "error"
                    );

                    form.appendChild(
                        message
                    );

                    emailInput.focus();

                    return;

                }


                /* =================================================
                   SUCCESS MESSAGE
                ================================================= */

                message.textContent =
                    "Subscribed successfully! Redirecting...";

                message.classList.add(
                    "success"
                );

                form.appendChild(
                    message
                );


                /* Clear form */

                form.reset();


                /* =================================================
                   REDIRECT TO 404.HTML
                ================================================= */

                setTimeout(() => {

                    window.location.assign(
                        "404.html"
                    );

                }, 1000);

            }
        );

    });


    /* =====================================================
       CART COUNT
    ===================================================== */

    const cartCount =
        document.querySelector(
            ".cart-count"
        );

    const cartButtons =
        document.querySelectorAll(
            ".add-cart"
        );

    let cartItems = 0;


    cartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                cartItems++;


                if (cartCount) {

                    cartCount.textContent =
                        cartItems;

                }


                button.classList.add(
                    "added"
                );


                const icon =
                    button.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-cart-plus"
                    );

                    icon.classList.add(
                        "fa-check"
                    );


                    setTimeout(() => {

                        icon.classList.remove(
                            "fa-check"
                        );

                        icon.classList.add(
                            "fa-cart-plus"
                        );

                    }, 1000);

                }

            }
        );

    });


    /* =====================================================
       WISHLIST
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist"
        );


    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle(
                    "active"
                );


                const icon =
                    button.querySelector("i");


                if (!icon) return;


                if (
                    button.classList.contains(
                        "active"
                    )
                ) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }

            }
        );

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    const animateCounter = counter => {

        const target =
            Number(
                counter.dataset.target
            );


        if (!target) return;


        const duration = 1800;

        const startTime =
            performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * ease
                );


            counter.textContent =
                value.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        };


        requestAnimationFrame(
            update
        );

    };


    if (
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

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
                    threshold: 0.4
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    } else {

        counters.forEach(counter => {

            animateCounter(
                counter
            );

        });

    }


    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (
        typeof AOS !== "undefined"
    ) {

        AOS.init({

            duration: 900,

            easing: "ease-out-cubic",

            once: true,

            offset: 80,

            delay: 0

        });


        window.addEventListener(
            "load",
            () => {

                AOS.refresh();

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (
                !img.hasAttribute(
                    "loading"
                )
            ) {

                img.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 796 &&
                navbar
            ) {

                closeMobileMenu();

            }


            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }
    );

});