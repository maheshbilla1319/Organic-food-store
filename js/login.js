/* =========================================================
   GREENHARVEST LOGIN JAVASCRIPT

   LOGIN FLOW

   Admin    -> admin.html
   Customer -> customer.html

   Account data comes from:
   localStorage -> greenHarvestUsers
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
       LOAD LAST SIGNUP USER
    ===================================================== */

    try {

        const lastUser =
            JSON.parse(
                localStorage.getItem(
                    "greenHarvestLastUser"
                )
            );


        if (
            lastUser &&
            lastUser.email &&
            emailInput
        ) {

            emailInput.value =
                lastUser.email;

            /* Automatically select role */

            const lastRole =
                document.querySelector(
                    `input[name="loginRole"][value="${lastUser.role}"]`
                );

            if (lastRole) {

                lastRole.checked = true;

            }

        }

    } catch (error) {

        console.log(
            "No previous signup information found."
        );

    }


    /* =====================================================
       REMEMBERED EMAIL
    ===================================================== */

    const savedEmail =
        localStorage.getItem(
            "greenHarvestRememberEmail"
        );


    if (savedEmail && emailInput) {

        emailInput.value = savedEmail;

        if (rememberMe) {

            rememberMe.checked = true;

        }

    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector("i");


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";


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

                } else {

                    passwordInput.type =
                        "password";


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
            .forEach(box => {

                box.classList.remove(
                    "input-error"
                );

            });

    }


    /* =====================================================
       GMAIL VALIDATION
    ===================================================== */

    function validGmail(email) {

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/
            .test(email);

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
       FORM SUBMIT
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            clearErrors();


            /* =================================================
               GET VALUES
            ================================================= */

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;


            const selectedRole =
                document.querySelector(
                    'input[name="loginRole"]:checked'
                );


            let isValid = true;


            /* =================================================
               ROLE VALIDATION
            ================================================= */

            if (!selectedRole) {

                roleError.textContent =
                    "Please select Admin or Customer.";

                isValid = false;

            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            if (email === "") {

                emailError.textContent =
                    "Please enter your Gmail address.";

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
               PASSWORD VALIDATION
            ================================================= */

            if (password === "") {

                passwordError.textContent =
                    "Please enter your password.";

                isValid = false;

            }


            /* =================================================
               STOP IF INVALID
            ================================================= */

            if (!isValid) {

                return;

            }


            /* =================================================
               GET USERS
            ================================================= */

            let users = [];


            try {

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "greenHarvestUsers"
                        )
                    ) || [];


                if (!Array.isArray(users)) {

                    users = [];

                }

            } catch (error) {

                users = [];

            }


            /* =================================================
               FIND USER

               Gmail + Password + Role
            ================================================= */

            const user =
                users.find(
                    storedUser =>

                        storedUser.email
                            .toLowerCase() === email &&

                        storedUser.password === password &&

                        storedUser.role ===
                            selectedRole.value
                );


            /* =================================================
               INVALID LOGIN
            ================================================= */

            if (!user) {

                loginError.textContent =
                    "Invalid Gmail, password or role. Please check your account details.";

                loginError.classList.add(
                    "show"
                );

                return;

            }


            /* =================================================
               SAVE CURRENT USER
            ================================================= */

            localStorage.setItem(
                "greenHarvestCurrentUser",
                JSON.stringify({

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    role: user.role

                })
            );


            /* =================================================
               REMEMBER EMAIL
            ================================================= */

            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    "greenHarvestRememberEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "greenHarvestRememberEmail"
                );

            }


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            successMessage.textContent =
                `Login successful! Welcome ${user.name}. Redirecting...`;

            successMessage.classList.add(
                "show"
            );


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            if (loginBtn) {

                loginBtn.disabled = true;

                loginBtn.innerHTML =
                    'Login Successful <i class="fa-solid fa-check"></i>';

            }


            /* =================================================
               ROLE BASED REDIRECT
            ================================================= */

            setTimeout(() => {


                if (user.role === "admin") {

                    window.location.href =
                        "admin.html";


                } else if (
                    user.role === "customer"
                ) {

                    window.location.href =
                        "customer.html";


                } else {

                    /* Safety fallback */

                    window.location.href =
                        "404.html";

                }


            }, 1200);

        }
    );

});