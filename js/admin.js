/* =========================================================
   GREENHARVEST ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       AOS
    ========================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 750,
            easing: "ease-out-cubic",
            once: true,
            offset: 60
        });

    }


    /* =========================
       ELEMENTS
    ========================== */

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll(".page-section");

    const pageTitle =
        document.getElementById("pageTitle");


    /* =========================
       SECTION TITLES
    ========================== */

    const sectionTitles = {

        dashboard: "Dashboard",

        products: "Organic Foods",

        orders: "Orders",

        customers: "Customers",

        categories: "Categories",

        messages: "Contact Messages",

        newsletter: "Newsletter",

        settings: "Settings"

    };


    /* =========================
       OPEN SIDEBAR
    ========================== */

    function openSidebar() {

        sidebar.classList.add("sidebar-open");

        sidebarOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =========================
       CLOSE SIDEBAR
    ========================== */

    function closeSidebar() {

        sidebar.classList.remove("sidebar-open");

        sidebarOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =========================
       SHOW SECTION
    ========================== */

    function showSection(sectionId) {

        const target =
            document.getElementById(sectionId);

        if (!target) {
            return;
        }


        /* Hide all */

        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        /* Show selected */

        target.classList.add(
            "active-section"
        );


        /* Active navigation */

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.dataset.section === sectionId
            ) {

                link.classList.add("active");

            }

        });


        /* Header title */

        if (sectionTitles[sectionId]) {

            pageTitle.textContent =
                sectionTitles[sectionId];

        }


        /* Update URL */

        history.replaceState(
            null,
            "",
            `#${sectionId}`
        );


        /* Close mobile sidebar */

        closeSidebar();


        /* Scroll top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Refresh AOS */

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    }


    /* =========================
       NAVIGATION
    ========================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const section =
                link.dataset.section;

            showSection(section);

        });

    });


    /* =========================
       QUICK ACTIONS
    ========================== */

    const openButtons =
        document.querySelectorAll(
            "[data-open-section]"
        );

    openButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.openSection;

                showSection(section);

            }
        );

    });


    /* =========================
       LOAD HASH
    ========================== */

    function loadHash() {

        const hash =
            window.location.hash.replace("#", "");

        if (
            hash &&
            sectionTitles[hash]
        ) {

            showSection(hash);

        } else {

            showSection("dashboard");

        }

    }

    loadHash();


    /* =========================
       ADD PRODUCT
    ========================== */

    const addProductBtn =
        document.getElementById("addProductBtn");

    if (addProductBtn) {

        addProductBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Add Product form can be connected here."
                );

            }
        );

    }


    // /* =========================
    //    REPLY BUTTONS
    // ========================== */

    // document
    //     .querySelectorAll(".reply-btn")
    //     .forEach(button => {

    //         button.addEventListener(
    //             "click",
    //             () => {

    //                 const messageCard =
    //                     button.closest(".message-card");

    //                 const customer =
    //                     messageCard.querySelector("h3");

    //                 if (customer) {

    //                     alert(
    //                         `Replying to ${customer.textContent}`
    //                     );

    //                 }

    //             }
    //         );

    //     });


    /* =========================
       DELETE MESSAGE
    ========================== */

    document
        .querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const message =
                        button.closest(".message-card");

                    if (!message) {
                        return;
                    }


                    const confirmed =
                        confirm(
                            "Delete this message?"
                        );


                    if (confirmed) {

                        message.style.opacity = "0";

                        message.style.transform =
                            "translateY(-10px)";


                        setTimeout(() => {

                            message.remove();

                        }, 250);

                    }

                }
            );

        });


    /* =========================
       LOGOUT
    ========================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {
                    return;
                }


                sessionStorage.removeItem(
                    "greenHarvestCurrentUser"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    /* =========================
       ADMIN ACCESS CHECK
    ========================== */

    const currentUser =
        sessionStorage.getItem(
            "greenHarvestCurrentUser"
        );


    if (currentUser) {

        try {

            const user =
                JSON.parse(currentUser);


            if (user.role !== "admin") {

                window.location.href =
                    "customer-dashboard.html";

            }

        } catch (error) {

            console.warn(
                "Invalid user session."
            );

        }

    }


    /* =========================
       ESC KEY
    ========================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =========================
       WINDOW RESIZE
    ========================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                closeSidebar();

            }

        }
    );

});