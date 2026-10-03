// =====================================================
// PURE VALIDATION FUNCTIONS
// =====================================================

function isValidStudentNumber(value) {
    return /^24-\d{4}-\d{3}$/.test(value.trim());
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


// =====================================================
// BROWSER CODE
// =====================================================

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

    const successMessage = document.getElementById("successMessage");
    const registrationSummary =
        document.getElementById("registrationSummary");

    const passwordFeedback =
        document.getElementById("passwordFeedback");


    // =================================================
    // ERROR FUNCTION
    // =================================================

    function setError(input, errorId, message) {

        const error = document.getElementById(errorId);

        error.textContent = message;

        if (message) {
            input.setAttribute("aria-invalid", "true");
        } else {
            input.setAttribute("aria-invalid", "false");
        }
    }


    // =================================================
    // FULL NAME
    // =================================================

    function validateFullName() {

        const value = fullName.value.trim();

        if (value.length === 0) {
            setError(
                fullName,
                "fullNameError",
                "Full name is required."
            );
            return false;
        }

        if (value.length < 2) {
            setError(
                fullName,
                "fullNameError",
                "Full name must be at least 2 characters."
            );
            return false;
        }

        setError(fullName, "fullNameError", "");

        return true;
    }


    // =================================================
    // STUDENT NUMBER
    // =================================================

    function validateStudentNumber() {

        const value = studentNumber.value.trim();

        if (value === "") {
            setError(
                studentNumber,
                "studentNumberError",
                "Student number is required."
            );
            return false;
        }

        if (!isValidStudentNumber(value)) {
            setError(
                studentNumber,
                "studentNumberError",
                "Student number must follow 24-1234-123."
            );
            return false;
        }

        setError(studentNumber, "studentNumberError", "");

        return true;
    }


    // =================================================
    // EMAIL
    // =================================================

    function validateEmail() {

        const value = email.value.trim();

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            setError(
                email,
                "emailError",
                "Email address is required."
            );
            return false;
        }

        if (!pattern.test(value)) {
            setError(
                email,
                "emailError",
                "Enter a valid email address."
            );
            return false;
        }

        setError(email, "emailError", "");

        return true;
    }


    // =================================================
    // MOBILE NUMBER
    // =================================================

    function validateMobileNumber() {

        const value = mobileNumber.value.trim();

        const pattern = /^(09\d{9}|\+639\d{9})$/;

        if (value === "") {
            setError(
                mobileNumber,
                "mobileNumberError",
                "Mobile number is required."
            );
            return false;
        }

        if (!pattern.test(value)) {
            setError(
                mobileNumber,
                "mobileNumberError",
                "Use 09XXXXXXXXX or +639XXXXXXXXX."
            );
            return false;
        }

        setError(mobileNumber, "mobileNumberError", "");

        return true;
    }


    // =================================================
    // PASSWORD
    // =================================================

    function validatePassword() {

        const value = password.value;

        if (value === "") {
            setError(
                password,
                "passwordError",
                "Password is required."
            );
            return false;
        }

        if (!isValidPassword(value)) {
            setError(
                password,
                "passwordError",
                "Password needs 8+ characters, uppercase letter, digit, @, $, or !, and no spaces."
            );
            return false;
        }

        setError(password, "passwordError", "");

        return true;
    }


    // =================================================
    // PASSWORD LIVE FEEDBACK
    // =================================================

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


    // =================================================
    // CONFIRM PASSWORD
    // =================================================

    function validateConfirmPassword() {

        const value = confirmPassword.value;

        if (value === "") {
            setError(
                confirmPassword,
                "confirmPasswordError",
                "Please confirm your password."
            );
            return false;
        }

        if (value !== password.value) {
            setError(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );
            return false;
        }

        setError(
            confirmPassword,
            "confirmPasswordError",
            ""
        );

        return true;
    }


    // =================================================
    // COURSE
    // =================================================

    function validateCourse() {

        if (
            course.value !== "BSIT" &&
            course.value !== "BSCS"
        ) {

            setError(
                course,
                "courseError",
                "Please select BSIT or BSCS."
            );

            return false;
        }

        setError(course, "courseError", "");

        return true;
    }


    // =================================================
    // TERMS
    // =================================================

    function validateTerms() {

        if (!terms.checked) {

            setError(
                terms,
                "termsError",
                "You must agree to the terms and conditions."
            );

            return false;
        }

        setError(terms, "termsError", "");

        return true;
    }


    // =================================================
    // SUMMARY
    // =================================================

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


    // =================================================
    // CLEAR SUMMARY
    // =================================================

    function clearSummary() {

        document.getElementById("summaryName").textContent = "";
        document.getElementById("summaryStudentNumber").textContent = "";
        document.getElementById("summaryEmail").textContent = "";
        document.getElementById("summaryMobileNumber").textContent = "";
        document.getElementById("summaryCourse").textContent = "";

        registrationSummary.hidden = true;
    }


    // =================================================
    // SUBMIT
    // =================================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        successMessage.textContent = "";
        registrationSummary.hidden = true;

        const validName = validateFullName();
        const validStudent = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobile = validateMobileNumber();
        const validPassword = validatePassword();
        const validConfirm = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        updatePasswordFeedback();

        const valid =
            validName &&
            validStudent &&
            validEmail &&
            validMobile &&
            validPassword &&
            validConfirm &&
            validCourse &&
            validTerms;

        if (valid) {

            successMessage.textContent =
                "Registration details validated successfully!";

            showSummary();
        }
    });


    // =================================================
    // PASSWORD INPUT
    // =================================================

    password.addEventListener("input", function () {

        updatePasswordFeedback();

        if (password.value !== "") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    // =================================================
    // BLUR EVENTS
    // =================================================

    fullName.addEventListener("blur", validateFullName);

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


    // =================================================
    // CHANGE EVENTS
    // =================================================

    course.addEventListener(
        "change",
        validateCourse
    );

    terms.addEventListener(
        "change",
        validateTerms
    );


    // =================================================
    // RESET
    // =================================================

    form.addEventListener("reset", function () {

        setTimeout(function () {

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
                control.setAttribute(
                    "aria-invalid",
                    "false"
                );
            });


            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";

            successMessage.textContent = "";

            clearSummary();

        }, 0);
    });
}


// =====================================================
// COMMONJS EXPORT FOR AUTOGRADER / NODE
// =====================================================

if (
    typeof module !== "undefined" &&
    module.exports
) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}
