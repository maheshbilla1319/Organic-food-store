/* =========================================================
   GREENHARVEST LOGIN JAVASCRIPT
   =========================================================
   LOGIN FLOW

   Admin    -> admin.html
   Customer -> customer.html

   NOTE:
   - Any valid Gmail address is accepted.
   - Any non-empty password is accepted.
   - No localStorage is used.
   - No account data is saved.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const rememberMe =
        document.getElementById("rememberMe");

    const loginBtn =
        document.getElementById("loginBtn");

    const successMessage =
        document.getElementById("successMessage");

    const loginError =
        document.getElementById("loginError");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const roleError =
        document.getElementById("roleError");


    /* =====================================================
       FORM CHECK
    ===================================================== */

    if (!loginForm) {
        console.error(
            "Login form #loginForm not found."
        );

        return;
    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector("i");


                /* =========================================
                   SHOW PASSWORD
                ========================================= */

                if (passwordInput.type === "password") {

                    passwordInput.type = "text";


                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );
                    }


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    passwordToggle.setAttribute(
                        "title",
                        "Hide password"
                    );


                /* =========================================
                   HIDE PASSWORD
                ========================================= */

                } else {

                    passwordInput.type = "password";


                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );
                    }


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    passwordToggle.setAttribute(
                        "title",
                        "Show password"
                    );
                }

            }
        );
    }


    /* =====================================================
       CLEAR ERRORS
    ===================================================== */

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (roleError) {
            roleError.textContent = "";
        }

        if (loginError) {

            loginError.textContent = "";

            loginError.classList.remove(
                "show"
            );
        }

        if (successMessage) {

            successMessage.textContent = "";

            successMessage.classList.remove(
                "show"
            );
        }


        document
            .querySelectorAll(".input-box")
            .forEach((box) => {

                box.classList.remove(
                    "input-error"
                );

            });
    }


    /* =====================================================
       GMAIL VALIDATION
    ===================================================== */

    function validGmail(email) {

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(
            email
        );

    }


    /* =====================================================
       SHOW INPUT ERROR
    ===================================================== */

    function showInputError(
        input,
        errorElement,
        message
    ) {

        const inputBox =
            input
                ? input.closest(".input-box")
                : null;


        if (inputBox) {

            inputBox.classList.add(
                "input-error"
            );
        }


        if (errorElement) {

            errorElement.textContent =
                message;
        }
    }


    /* =====================================================
       EMAIL INPUT
       CLEAR ERROR WHILE TYPING
    ===================================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            () => {

                if (emailError) {
                    emailError.textContent = "";
                }

                const inputBox =
                    emailInput.closest(".input-box");

                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }

                if (loginError) {

                    loginError.textContent = "";

                    loginError.classList.remove(
                        "show"
                    );
                }

            }
        );
    }


    /* =====================================================
       PASSWORD INPUT
       CLEAR ERROR WHILE TYPING
    ===================================================== */

    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            () => {

                if (passwordError) {
                    passwordError.textContent = "";
                }

                const inputBox =
                    passwordInput.closest(".input-box");

                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }

                if (loginError) {

                    loginError.textContent = "";

                    loginError.classList.remove(
                        "show"
                    );
                }

            }
        );
    }


    /* =====================================================
       ROLE CHANGE
       CLEAR ROLE ERROR
    ===================================================== */

    const roleInputs =
        document.querySelectorAll(
            'input[name="loginRole"]'
        );


    roleInputs.forEach((roleInput) => {

        roleInput.addEventListener(
            "change",
            () => {

                if (roleError) {
                    roleError.textContent = "";
                }

                if (loginError) {

                    loginError.textContent = "";

                    loginError.classList.remove(
                        "show"
                    );
                }

            }
        );

    });


    /* =====================================================
       LOGIN FORM SUBMIT
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /* =============================================
               CLEAR OLD ERRORS
            ============================================= */

            clearErrors();


            /* =============================================
               GET VALUES
            ============================================= */

            const email =
                emailInput
                    ? emailInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            const selectedRole =
                document.querySelector(
                    'input[name="loginRole"]:checked'
                );


            let isValid = true;


            /* =============================================
               ROLE VALIDATION
            ============================================= */

            if (!selectedRole) {

                if (roleError) {

                    roleError.textContent =
                        "Please select Admin or Customer.";
                }

                isValid = false;
            }


            /* =============================================
               EMAIL VALIDATION
            ============================================= */

            if (email === "") {

                if (emailError) {

                    emailError.textContent =
                        "Please enter your Gmail address.";
                }

                isValid = false;

            } else if (!validGmail(email)) {

                showInputError(
                    emailInput,
                    emailError,
                    "Please use a valid Gmail address."
                );

                isValid = false;
            }


            /* =============================================
               PASSWORD VALIDATION
            ============================================= */

            if (password.trim() === "") {

                if (passwordError) {

                    passwordError.textContent =
                        "Please enter your password.";
                }

                isValid = false;
            }


            /* =============================================
               STOP IF VALIDATION FAILS
            ============================================= */

            if (!isValid) {
                return;
            }


            /* =============================================
               LOGIN SUCCESS
               
               ANY GMAIL + ANY PASSWORD
               ============================================= */


            const role =
                selectedRole.value;


            /* =============================================
               SUCCESS MESSAGE
            ============================================= */

            if (successMessage) {

                successMessage.textContent =
                    `Login successful! Redirecting to ${role === "admin" ? "Admin" : "Customer"} Dashboard...`;

                successMessage.classList.add(
                    "show"
                );
            }


            /* =============================================
               DISABLE LOGIN BUTTON
            ============================================= */

            if (loginBtn) {

                loginBtn.disabled = true;

                loginBtn.innerHTML =
                    'Login Successful <i class="fa-solid fa-check"></i>';
            }


            /* =============================================
               REDIRECT
            ============================================= */

            setTimeout(() => {

                if (role === "admin") {

                    window.location.href =
                        "admin.html";

                } else if (role === "customer") {

                    window.location.href =
                        "customer.html";

                } else {

                    window.location.href =
                        "404.html";
                }

            }, 800);

        }
    );

});