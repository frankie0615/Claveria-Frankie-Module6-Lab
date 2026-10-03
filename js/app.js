// ==========================================
// PURE VALIDATION FUNCTIONS
// ==========================================

function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}


function isValidPassword(value) {
    return (
        value.length >= 8 &&
        !/\s/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!]/.test(value)
    );
}


// ==========================================
// BROWSER CODE
// ==========================================

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const successMessage =
        document.getElementById("successMessage");

    const registrationSummary =
        document.getElementById("registrationSummary");

    const passwordFeedback =
        document.getElementById("passwordFeedback");


    // ==========================================
    // HELPER FUNCTION
    // ==========================================

    function showError(input, errorId, message) {

        const errorElement =
            document.getElementById(errorId);

        errorElement.textContent = message;

        if (message !== "") {
            input.setAttribute("aria-invalid", "true");
        } else {
            input.setAttribute("aria-invalid", "false");
        }
    }


    // ==========================================
    // FULL NAME
    // ==========================================

    function validateFullName() {

        const value = fullName.value.trim();

        if (value === "") {

            showError(
                fullName,
                "fullNameError",
                "Full name is required."
            );

            return false;
        }

        if (value.length < 2) {

            showError(
                fullName,
                "fullNameError",
                "Full name must be at least two characters."
            );

            return false;
        }

        showError(fullName, "fullNameError", "");

        return true;
    }


    // ==========================================
    // STUDENT NUMBER
    // ==========================================

    function validateStudentNumber() {

        const value = studentNumber.value.trim();

        if (value === "") {

            showError(
                studentNumber,
                "studentNumberError",
                "Student number is required."
            );

            return false;
        }

        if (!isValidStudentNumber(value)) {

            showError(
                studentNumber,
                "studentNumberError",
                "Enter a student number in the format 24-1234-123."
            );

            return false;
        }

        showError(studentNumber, "studentNumberError", "");

        return true;
    }


    // ==========================================
    // EMAIL
    // ==========================================

    function validateEmail() {

        const value = email.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {

            showError(
                email,
                "emailError",
                "Email address is required."
            );

            return false;
        }

        if (!emailPattern.test(value)) {

            showError(
                email,
                "emailError",
                "Enter a valid email address."
            );

            return false;
        }

        showError(email, "emailError", "");

        return true;
    }


    // ==========================================
    // MOBILE NUMBER
    // ==========================================

    function validateMobileNumber() {

        const value = mobileNumber.value.trim();

        const mobilePattern =
            /^(09\d{9}|\+639\d{9})$/;

        if (value === "") {

            showError(
                mobileNumber,
                "mobileNumberError",
                "Mobile number is required."
            );

            return false;
        }

        if (!mobilePattern.test(value)) {

            showError(
                mobileNumber,
                "mobileNumberError",
                "Enter 09XXXXXXXXX or +639XXXXXXXXX."
            );

            return false;
        }

        showError(
            mobileNumber,
            "mobileNumberError",
            ""
        );

        return true;
    }


    // ==========================================
    // PASSWORD
    // ==========================================

    function validatePassword() {

        const value = password.value;

        if (value === "") {

            showError(
                password,
                "passwordError",
                "Password is required."
            );

            return false;
        }

        if (!isValidPassword(value)) {

            showError(
                password,
                "passwordError",
                "Password must be at least 8 characters, contain one uppercase letter, one digit, and one of @, $, or !, with no spaces."
            );

            return false;
        }

        showError(password, "passwordError", "");

        return true;
    }


    // ==========================================
    // LIVE PASSWORD FEEDBACK
    // ==========================================

    function updatePasswordFeedback() {

        const value = password.value;

        if (value === "") {

            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";

            return;
        }

        if (isValidPassword(value)) {

            passwordFeedback.textContent =
                "Password meets all requirements.";

            passwordFeedback.className =
                "feedback valid";

        } else {

            passwordFeedback.textContent =
                "Password must have 8+ characters, one uppercase letter, one digit, one of @, $, or !, and no spaces.";

            passwordFeedback.className =
                "feedback invalid";
        }
    }


    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    function validateConfirmPassword() {

        const value = confirmPassword.value;

        if (value === "") {

            showError(
                confirmPassword,
                "confirmPasswordError",
                "Confirm password is required."
            );

            return false;
        }

        if (value !== password.value) {

            showError(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );

            return false;
        }

        showError(
            confirmPassword,
            "confirmPasswordError",
            ""
        );

        return true;
    }


    // ==========================================
    // COURSE
    // ==========================================

    function validateCourse() {

        if (
            course.value !== "BSIT" &&
            course.value !== "BSCS"
        ) {

            showError(
                course,
                "courseError",
                "Please select BSIT or BSCS."
            );

            return false;
        }

        showError(course, "courseError", "");

        return true;
    }


    // ==========================================
    // TERMS
    // ==========================================

    function validateTerms() {

        if (!terms.checked) {

            showError(
                terms,
                "termsError",
                "You must agree to the terms and conditions."
            );

            return false;
        }

        showError(terms, "termsError", "");

        return true;
    }


    // ==========================================
    // CLEAR ERRORS
    // ==========================================

    function clearErrors() {

        const errorIds = [
            "fullNameError",
            "studentNumberError",
            "emailError",
            "mobileNumberError",
            "passwordError",
            "confirmPasswordError",
            "courseError",
            "termsError"
        ];

        errorIds.forEach(function (id) {
            document.getElementById(id).textContent = "";
        });

        const controls = [
            fullName,
            studentNumber,
            email,
            mobileNumber,
            password,
            confirmPassword,
            course,
            terms
        ];

        controls.forEach(function (control) {
            control.setAttribute("aria-invalid", "false");
        });
    }


    // ==========================================
    // SUMMARY
    // ==========================================

    function showSummary() {

        document.getElementById("summaryName").textContent =
            fullName.value.trim();

        document.getElementById("summaryStudentNumber").textContent =
            studentNumber.value.trim();

        document.getElementById("summaryEmail").textContent =
            email.value.trim();

        document.getElementById("summaryMobileNumber").textContent =
            mobileNumber.value.trim();

        document.getElementById("summaryCourse").textContent =
            course.value;

        registrationSummary.hidden = false;
    }


    function clearSummary() {

        document.getElementById("summaryName").textContent = "";
        document.getElementById("summaryStudentNumber").textContent = "";
        document.getElementById("summaryEmail").textContent = "";
        document.getElementById("summaryMobileNumber").textContent = "";
        document.getElementById("summaryCourse").textContent = "";

        registrationSummary.hidden = true;
    }


    // ==========================================
    // SUBMIT EVENT
    // ==========================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        successMessage.textContent = "";

        registrationSummary.hidden = true;

        const validFullName =
            validateFullName();

        const validStudentNumber =
            validateStudentNumber();

        const validEmail =
            validateEmail();

        const validMobileNumber =
            validateMobileNumber();

        const validPassword =
            validatePassword();

        const validConfirmPassword =
            validateConfirmPassword();

        const validCourse =
            validateCourse();

        const validTerms =
            validateTerms();

        updatePasswordFeedback();


        const formIsValid =
            validFullName &&
            validStudentNumber &&
            validEmail &&
            validMobileNumber &&
            validPassword &&
            validConfirmPassword &&
            validCourse &&
            validTerms;


        if (formIsValid) {

            successMessage.textContent =
                "Registration details validated successfully!";

            showSummary();
        }
    });


    // ==========================================
    // PASSWORD INPUT EVENT
    // ==========================================

    password.addEventListener("input", function () {

        updatePasswordFeedback();

        if (password.value !== "") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    // ==========================================
    // FULL NAME BLUR EVENT
    // ==========================================

    fullName.addEventListener("blur", function () {

        validateFullName();

    });


    // ==========================================
    // COURSE CHANGE EVENT
    // ==========================================

    course.addEventListener("change", function () {

        validateCourse();

    });


    // ==========================================
    // TERMS CHANGE EVENT
    // ==========================================

    terms.addEventListener("change", function () {

        validateTerms();

    });


    // ==========================================
    // OTHER VALIDATION EVENTS
    // ==========================================

    studentNumber.addEventListener(
        "blur",
        validateStudentNumber
    );

    email.addEventListener(
        "blur",
        validateEmail
    );

    mobileNumber.addEventListener(
        "blur",
        validateMobileNumber
    );

    confirmPassword.addEventListener(
        "blur",
        validateConfirmPassword
    );


    // ==========================================
    // RESET EVENT
    // ==========================================

    form.addEventListener("reset", function () {

        // Wait for browser to restore the controls
        setTimeout(function () {

            clearErrors();

            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";

            successMessage.textContent = "";

            clearSummary();

        }, 0);
    });
}


// ==========================================
// NODE / AUTOGRADER EXPORT
// ==========================================

if (
    typeof module !== "undefined" &&
    module.exports
) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}
