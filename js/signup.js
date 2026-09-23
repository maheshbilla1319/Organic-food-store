/* =========================================================
   GREENHARVEST SIGNUP JAVASCRIPT
   =========================================================
  
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });

    }


    /* =====================================================
       FORM ELEMENTS
    ===================================================== */

    const signupForm =
        document.getElementById("signupForm");

    const nameInput =
        document.getElementById("signupName");

    const emailInput =
        document.getElementById("signupEmail");

    const passwordInput =
        document.getElementById("signupPassword");

    const confirmInput =
        document.getElementById("confirmPassword");

    const termsInput =
        document.getElementById("terms");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const confirmPasswordToggle =
        document.getElementById("confirmPasswordToggle");

    const successMessage =
        document.getElementById("successMessage");


    /* =====================================================
       ERROR ELEMENTS
    ===================================================== */

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const roleError =
        document.getElementById("roleError");

    const passwordError =
        document.getElementById("passwordError");

    const confirmError =
        document.getElementById("confirmError");

    const termsError =
        document.getElementById("termsError");


    /* =====================================================
       FORM CHECK
    ===================================================== */

    if (!signupForm) {

        console.error(
            "Signup form #signupForm not found."
        );

        return;
    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    function togglePassword(input, button) {

        if (!input || !button) {
            return;
        }


        const icon =
            button.querySelector("i");


        /* =================================================
           SHOW PASSWORD
        ================================================= */

        if (input.type === "password") {

            input.type = "text";


            if (icon) {

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );
            }


            button.setAttribute(
                "aria-label",
                "Hide password"
            );

            button.setAttribute(
                "title",
                "Hide password"
            );


        /* =================================================
           HIDE PASSWORD
        ================================================= */

        } else {

            input.type = "password";


            if (icon) {

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );
            }


            button.setAttribute(
                "aria-label",
                "Show password"
            );

            button.setAttribute(
                "title",
                "Show password"
            );
        }
    }


    /* =====================================================
       PASSWORD TOGGLE EVENTS
    ===================================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            function () {

                togglePassword(
                    passwordInput,
                    passwordToggle
                );

            }
        );
    }


    if (confirmPasswordToggle) {

        confirmPasswordToggle.addEventListener(
            "click",
            function () {

                togglePassword(
                    confirmInput,
                    confirmPasswordToggle
                );

            }
        );
    }


    /* =====================================================
       CLEAR ERRORS
    ===================================================== */

    function clearErrors() {

        if (nameError) {
            nameError.textContent = "";
        }

        if (emailError) {
            emailError.textContent = "";
        }

        if (roleError) {
            roleError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (confirmError) {
            confirmError.textContent = "";
        }

        if (termsError) {
            termsError.textContent = "";
        }


        document
            .querySelectorAll(".input-box")
            .forEach(function (box) {

                box.classList.remove(
                    "input-error"
                );

            });
    }


    /* =====================================================
       SHOW INPUT ERROR
    ===================================================== */

    function showInputError(
        input,
        messageElement,
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


        if (messageElement) {

            messageElement.textContent =
                message;
        }
    }


    /* =====================================================
       GMAIL VALIDATION
       ONLY @gmail.com
    ===================================================== */

    function validGmail(email) {

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(
            email
        );

    }


    /* =====================================================
       CLEAR EMAIL ERROR WHILE TYPING
    ===================================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

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

            }
        );
    }


    /* =====================================================
       CLEAR NAME ERROR WHILE TYPING
    ===================================================== */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                if (nameError) {
                    nameError.textContent = "";
                }


                const inputBox =
                    nameInput.closest(".input-box");


                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }

            }
        );
    }


    /* =====================================================
       CLEAR PASSWORD ERROR WHILE TYPING
    ===================================================== */

    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            function () {

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

            }
        );
    }


    /* =====================================================
       CLEAR CONFIRM PASSWORD ERROR
    ===================================================== */

    if (confirmInput) {

        confirmInput.addEventListener(
            "input",
            function () {

                if (confirmError) {
                    confirmError.textContent = "";
                }


                const inputBox =
                    confirmInput.closest(".input-box");


                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }

            }
        );
    }


    /* =====================================================
       ROLE CHANGE
    ===================================================== */

    const roleInputs =
        document.querySelectorAll(
            'input[name="role"]'
        );


    roleInputs.forEach(function (roleInput) {

        roleInput.addEventListener(
            "change",
            function () {

                if (roleError) {
                    roleError.textContent = "";
                }

            }
        );

    });


    /* =====================================================
       TERMS CHECKBOX
    ===================================================== */

    if (termsInput) {

        termsInput.addEventListener(
            "change",
            function () {

                if (termsError) {
                    termsError.textContent = "";
                }

            }
        );
    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =============================================
               CLEAR OLD ERRORS
            ============================================= */

            clearErrors();


            /* =============================================
               GET VALUES
            ============================================= */

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


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


            const confirmPassword =
                confirmInput
                    ? confirmInput.value
                    : "";


            /* =============================================
               GET SELECTED ROLE
            ============================================= */

            const selectedRole =
                document.querySelector(
                    'input[name="role"]:checked'
                );


            let isValid = true;


            /* =============================================
               NAME VALIDATION
            ============================================= */

            if (name.length < 3) {

                showInputError(
                    nameInput,
                    nameError,
                    "Please enter your full name."
                );

                isValid = false;
            }


            /* =============================================
               GMAIL VALIDATION
            ============================================= */

            if (email === "") {

                showInputError(
                    emailInput,
                    emailError,
                    "Please enter your Gmail address."
                );

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
               PASSWORD VALIDATION
               
               ANY PASSWORD IS ACCEPTED
               Only empty password is rejected.
            ============================================= */

            if (password === "") {

                showInputError(
                    passwordInput,
                    passwordError,
                    "Please enter your password."
                );

                isValid = false;
            }


            /* =============================================
               CONFIRM PASSWORD
            ============================================= */

            if (confirmPassword === "") {

                showInputError(
                    confirmInput,
                    confirmError,
                    "Please confirm your password."
                );

                isValid = false;

            } else if (
                password !== confirmPassword
            ) {

                showInputError(
                    confirmInput,
                    confirmError,
                    "Passwords do not match."
                );

                isValid = false;
            }


            /* =============================================
               TERMS & CONDITIONS
            ============================================= */

            if (
                !termsInput ||
                !termsInput.checked
            ) {

                if (termsError) {

                    termsError.textContent =
                        "Please accept the Terms & Conditions.";
                }

                isValid = false;
            }


            /* =============================================
               STOP IF INVALID
            ============================================= */

            if (!isValid) {
                return;
            }


            /* =============================================
               SIGNUP SUCCESS
               
               NO LOCAL STORAGE
               NO USER SAVE
               NO USER CHECK
            ============================================= */

            if (successMessage) {

                successMessage.textContent =
                    "Account created successfully! Redirecting to login...";

                successMessage.classList.add(
                    "show"
                );
            }


            /* =============================================
               DISABLE SUBMIT BUTTON
            ============================================= */

            const submitButton =
                signupForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    'Account Created <i class="fa-solid fa-check"></i>';
            }


            /* =============================================
               REDIRECT TO LOGIN
            ============================================= */

            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );

});