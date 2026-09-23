/* =========================================================
   GREENHARVEST CUSTOMER DASHBOARD
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
        document.getElementById("customerSidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const navLinks =
        document.querySelectorAll(
            ".customer-nav-link"
        );

    const sections =
        document.querySelectorAll(
            ".customer-section"
        );

    const pageTitle =
        document.getElementById("pageTitle");

    const logoutButton =
        document.getElementById("logoutButton");


    /* =========================
       SECTION TITLES
    ========================== */

    const sectionTitles = {

        home: "My Dashboard",

        foods: "Organic Foods",

        orders: "My Orders",

        wishlist: "Wishlist",

        profile: "My Profile",

        contact: "Contact Us"

    };


    /* =========================
       USER DATA
    ========================== */

    let currentUser = null;

    const savedUser =
        sessionStorage.getItem(
            "greenHarvestCurrentUser"
        );


    if (savedUser) {

        try {

            currentUser =
                JSON.parse(savedUser);

        } catch (error) {

            currentUser = null;

        }

    }


    /* =========================
       DISPLAY USER
    ========================== */

    if (currentUser) {

        const name =
            currentUser.name || "Customer";

        const email =
            currentUser.email || "customer@gmail.com";


        const initials =
            name
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        const sidebarName =
            document.getElementById(
                "sidebarUserName"
            );

        const sidebarInitials =
            document.getElementById(
                "sidebarInitials"
            );

        const headerName =
            document.getElementById(
                "headerUserName"
            );

        const headerInitials =
            document.getElementById(
                "headerInitials"
            );

        const profileName =
            document.getElementById(
                "profileName"
            );

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );

        const profileInitials =
            document.getElementById(
                "profileInitials"
            );


        if (sidebarName) {
            sidebarName.textContent = name;
        }

        if (sidebarInitials) {
            sidebarInitials.textContent = initials;
        }

        if (headerName) {
            headerName.textContent = name;
        }

        if (headerInitials) {
            headerInitials.textContent = initials;
        }

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileEmail) {
            profileEmail.textContent = email;
        }

        if (profileInitials) {
            profileInitials.textContent = initials;
        }

    }


    /* =========================
       SIDEBAR
    ========================== */

    function openSidebar() {

        sidebar.classList.add(
            "sidebar-open"
        );

        sidebarOverlay.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "sidebar-open"
        );

        sidebarOverlay.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    mobileMenu.addEventListener(
        "click",
        openSidebar
    );


    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );


    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    /* =========================
       SHOW SECTION
    ========================== */

    function showSection(sectionId) {

        if (!sectionTitles[sectionId]) {
            return;
        }


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const selectedSection =
            document.getElementById(
                sectionId
            );


        if (!selectedSection) {
            return;
        }


        selectedSection.classList.add(
            "active-section"
        );


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.dataset.section ===
                sectionId
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


        pageTitle.textContent =
            sectionTitles[sectionId];


        history.replaceState(
            null,
            "",
            `#${sectionId}`
        );


        closeSidebar();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    }


    /* =========================
       NAVIGATION
    ========================== */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showSection(
                    link.dataset.section
                );

            }
        );

    });


    /* =========================
       OPEN SECTION BUTTONS
    ========================== */

    document
        .querySelectorAll(
            "[data-section-open]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.sectionOpen
                    );

                }
            );

        });


    /* =========================
       HASH
    ========================== */

    const initialHash =
        window.location.hash
            .replace("#", "");


    if (
        initialHash &&
        sectionTitles[initialHash]
    ) {

        showSection(initialHash);

    } else {

        showSection("home");

    }


    /* =========================
       PRODUCT MODAL
    ========================== */

    const productModal =
        document.getElementById(
            "productModal"
        );

    const modalOverlay =
        document.getElementById(
            "modalOverlay"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalImage =
        document.getElementById(
            "modalProductImage"
        );

    const modalName =
        document.getElementById(
            "modalProductName"
        );

    const modalPrice =
        document.getElementById(
            "modalProductPrice"
        );

    const modalAddCart =
        document.getElementById(
            "modalAddCart"
        );


    let selectedProduct = null;


    /* Product image click */

    document
        .querySelectorAll(
            ".clickable-product"
        )
        .forEach(product => {

            product.addEventListener(
                "click",
                () => {

                    const card =
                        product.closest(
                            ".food-card"
                        );

                    const name =
                        product.dataset.product ||
                        card?.dataset.product ||
                        "Organic Food";

                    const price =
                        card?.dataset.price ||
                        "180";

                    const image =
                        product.querySelector(
                            "img"
                        );


                    selectedProduct = {
                        name,
                        price,
                        image: image
                            ? image.src
                            : "assets/organic-apples.webp"
                    };


                    modalName.textContent =
                        name;

                    modalPrice.textContent =
                        price;

                    modalImage.src =
                        selectedProduct.image;

                    modalImage.alt =
                        name;


                    productModal.classList.add(
                        "active"
                    );

                    productModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


    /* =========================
       CLOSE MODAL
    ========================== */

    function closeModal() {

        productModal.classList.remove(
            "active"
        );

        productModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalOverlay.addEventListener(
        "click",
        closeModal
    );


    /* =========================
       ADD TO CART
    ========================== */

    let cartCount =
        Number(
            localStorage.getItem(
                "greenHarvestCartCount"
            )
        ) || 0;


    const cartCountElement =
        document.getElementById(
            "cartCount"
        );


    function updateCart() {

        cartCountElement.textContent =
            cartCount;

        localStorage.setItem(
            "greenHarvestCartCount",
            cartCount
        );

    }


    updateCart();


    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    cartCount++;

                    updateCart();

                    const oldHTML =
                        button.innerHTML;

                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i>';

                    setTimeout(() => {

                        button.innerHTML =
                            oldHTML;

                    }, 900);

                }
            );

        });


    /* Modal cart */

    modalAddCart.addEventListener(
        "click",
        () => {

            cartCount++;

            updateCart();

            modalAddCart.innerHTML =
                '<i class="fa-solid fa-check"></i> Added to Cart';

            setTimeout(() => {

                closeModal();

                modalAddCart.innerHTML =
                    'Add to Cart <i class="fa-solid fa-bag-shopping"></i>';

            }, 700);

        }
    );


    /* =========================
       WISHLIST
    ========================== */

    let wishlistCount =
        Number(
            localStorage.getItem(
                "greenHarvestWishlistCount"
            )
        ) || 2;


    const wishlistCountElement =
        document.getElementById(
            "wishlistCount"
        );


    function updateWishlist() {

        wishlistCountElement.textContent =
            wishlistCount;

        localStorage.setItem(
            "greenHarvestWishlistCount",
            wishlistCount
        );

    }


    updateWishlist();


    document
        .querySelectorAll(
            ".heart-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    const active =
                        button.classList.contains(
                            "active-heart"
                        );


                    if (active) {

                        button.classList.remove(
                            "active-heart"
                        );

                        icon.className =
                            "fa-regular fa-heart";

                        wishlistCount =
                            Math.max(
                                0,
                                wishlistCount - 1
                            );

                    } else {

                        button.classList.add(
                            "active-heart"
                        );

                        icon.className =
                            "fa-solid fa-heart";

                        wishlistCount++;

                    }


                    updateWishlist();

                }
            );

        });


    /* =========================
       CART BUTTON
    ========================== */

    document
        .getElementById("cartButton")
        .addEventListener(
            "click",
            () => {

                alert(
                    `You have ${cartCount} item(s) in your cart.`
                );

            }
        );


   
/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("customerContactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const subjectInput = document.getElementById("contactSubject");
        const messageInput = document.getElementById("contactMessage");

        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();


        /* =========================
           VALIDATION
        ========================== */

        if (subject === "") {

            alert("Please enter a subject.");

            subjectInput.focus();

            return;
        }


        if (message === "") {

            alert("Please enter your message.");

            messageInput.focus();

            return;
        }


        /* =========================
           SUCCESS + REDIRECT
        ========================== */

        // alert("Your message has been submitted successfully.");

        contactForm.reset();

        window.location.href = "404.html";

    });

}




    /* =========================
       ORDER BUTTONS
    ========================== */

    document
        .querySelectorAll(".order-view")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    alert(
                        "Order details will be displayed here."
                    );

                }
            );

        });


    /* =========================
       LOGOUT
    ========================== */

    logoutButton.addEventListener(
        "click",
        () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            sessionStorage.removeItem(
                "greenHarvestCurrentUser"
            );


            window.location.href =
                "login.html";

        }
    );


    /* =========================
       ESCAPE
    ========================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();
                closeSidebar();

            }

        }
    );


    /* =========================
       RESIZE
    ========================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 950) {

                closeSidebar();

            }

        }
    );

});