
/* =========================================================
   GREENHARVEST SIGNUP JAVASCRIPT
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

    const signupForm = document.getElementById("signupForm");

    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

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
       CHECK FORM
    ===================================================== */

    if (!signupForm) {
        console.error("Signup form #signupForm not found.");
        return;
    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    function togglePassword(input, button) {

        if (!input || !button) {
            return;
        }

        const icon = button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            if (icon) {
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

            button.setAttribute(
                "title",
                "Hide password"
            );

        } else {

            input.type = "password";

            if (icon) {
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
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

        passwordToggle.addEventListener("click", function () {

            togglePassword(
                passwordInput,
                passwordToggle
            );

        });
    }


    if (confirmPasswordToggle) {

        confirmPasswordToggle.addEventListener("click", function () {

            togglePassword(
                confirmInput,
                confirmPasswordToggle
            );

        });
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
                box.classList.remove("input-error");
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

        const inputBox = input
            ? input.closest(".input-box")
            : null;

        if (inputBox) {
            inputBox.classList.add("input-error");
        }

        if (messageElement) {
            messageElement.textContent = message;
        }
    }


    /* =====================================================
       GMAIL VALIDATION
       ONLY @gmail.com
    ===================================================== */

    function validGmail(email) {

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

    }


    /* =====================================================
       PASSWORD VALIDATION

       Minimum:
       - 8 characters
       - At least one letter
       - At least one number
    ===================================================== */

    function validPassword(password) {

        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();


        /* =================================================
           GET FORM VALUES
        ================================================= */

        const name = nameInput
            ? nameInput.value.trim()
            : "";

        const email = emailInput
            ? emailInput.value.trim().toLowerCase()
            : "";

        const password = passwordInput
            ? passwordInput.value
            : "";

        const confirmPassword = confirmInput
            ? confirmInput.value
            : "";


        /* =================================================
           GET SELECTED ROLE
        ================================================= */

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );


        let isValid = true;


        /* =================================================
           NAME VALIDATION
        ================================================= */

        if (name.length < 3) {

            showInputError(
                nameInput,
                nameError,
                "Please enter your full name."
            );

            isValid = false;
        }


        /* =================================================
           EMAIL VALIDATION
        ================================================= */

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


        /* =================================================
           ROLE VALIDATION
        ================================================= */

        if (!selectedRole) {

            if (roleError) {
                roleError.textContent =
                    "Please select Admin or Customer.";
            }

            isValid = false;
        }


        /* =================================================
           PASSWORD VALIDATION
        ================================================= */

        if (password === "") {

            showInputError(
                passwordInput,
                passwordError,
                "Please create a password."
            );

            isValid = false;

        } else if (!validPassword(password)) {

            showInputError(
                passwordInput,
                passwordError,
                "Password must be 8+ characters with letters and numbers."
            );

            isValid = false;
        }


        /* =================================================
           CONFIRM PASSWORD
        ================================================= */

        if (confirmPassword === "") {

            showInputError(
                confirmInput,
                confirmError,
                "Please confirm your password."
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            showInputError(
                confirmInput,
                confirmError,
                "Passwords do not match."
            );

            isValid = false;
        }


        /* =================================================
           TERMS & CONDITIONS
        ================================================= */

        if (!termsInput || !termsInput.checked) {

            if (termsError) {
                termsError.textContent =
                    "Please accept the Terms & Conditions.";
            }

            isValid = false;
        }


        /* =================================================
           STOP IF INVALID
        ================================================= */

        if (!isValid) {
            return;
        }


        /* =================================================
           GET EXISTING USERS
        ================================================= */

        let users = [];

        try {

            const storedUsers =
                localStorage.getItem("greenHarvestUsers");

            if (storedUsers) {

                users = JSON.parse(storedUsers);

            }

            if (!Array.isArray(users)) {
                users = [];
            }

        } catch (error) {

            console.error(
                "Error reading users:",
                error
            );

            users = [];
        }


        /* =================================================
           CHECK EXISTING EMAIL
        ================================================= */

        const existingUser = users.find(function (user) {

            return (
                user.email &&
                user.email.toLowerCase() === email
            );

        });


        if (existingUser) {

            showInputError(
                emailInput,
                emailError,
                "This Gmail is already registered. Please login."
            );

            return;
        }


        /* =================================================
           CREATE NEW USER
        ================================================= */

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: selectedRole.value,

            createdAt: new Date().toISOString()

        };


        /* =================================================
           ADD USER
        ================================================= */

        users.push(newUser);


        /* =================================================
           SAVE USERS
        ================================================= */

        try {

            localStorage.setItem(
                "greenHarvestUsers",
                JSON.stringify(users)
            );

        } catch (error) {

            console.error(
                "Unable to save user:",
                error
            );

            alert(
                "Unable to create account. Please try again."
            );

            return;
        }


        /* =================================================
           SAVE LAST CREATED USER
        ================================================= */

        try {

            localStorage.setItem(
                "greenHarvestLastUser",
                JSON.stringify({
                    name: name,
                    email: email,
                    role: selectedRole.value
                })
            );

        } catch (error) {

            console.error(
                "Unable to save last user:",
                error
            );
        }


        /* =================================================
           SHOW SUCCESS MESSAGE
        ================================================= */

        if (successMessage) {

            successMessage.classList.add("show");

        }


        /* =================================================
           DISABLE SUBMIT BUTTON
        ================================================= */

        const submitButton =
            signupForm.querySelector(
                'button[type="submit"]'
            );

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                'Account Created <i class="fa-solid fa-check"></i>';

        }


        /* =================================================
           REDIRECT TO LOGIN
        ================================================= */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

});

