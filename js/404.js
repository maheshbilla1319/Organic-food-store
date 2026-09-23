/* =========================================================
   GREENHARVEST ORGANIC FOOD STORE
   404 PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       AOS INITIALIZATION
       ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });

    }


    /* =====================================================
       BACK BUTTON
       ===================================================== */

    const backBtn =
        document.getElementById("backBtn");


    if (backBtn) {

        backBtn.addEventListener(
            "click",
            function () {

                if (window.history.length > 1) {

                    window.history.back();

                } else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================================
       COUNTDOWN
       ===================================================== */

    const countdown =
        document.getElementById("countdown");

    let seconds = 10;


    const timer =
        setInterval(function () {

            seconds--;

            if (countdown) {

                countdown.textContent =
                    seconds;

            }


            if (seconds <= 0) {

                clearInterval(timer);

                window.location.href =
                    "index.html";

            }

        }, 1000);


    /* =====================================================
       STOP COUNTDOWN WHEN USER LEAVES PAGE
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            clearInterval(timer);

        }
    );


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                window.location.href =
                    "index.html";

            }

        }
    );


    /* =====================================================
       PREVENT DOUBLE CLICK ISSUES
       ===================================================== */

    const homeButton =
        document.querySelector(".btn-primary");


    if (homeButton) {

        homeButton.addEventListener(
            "click",
            function () {

                clearInterval(timer);

            }
        );

    }


    /* =====================================================
       PAGE LOAD ANIMATION REFRESH
       ===================================================== */

    window.addEventListener(
        "load",
        function () {

            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }

        }
    );

});