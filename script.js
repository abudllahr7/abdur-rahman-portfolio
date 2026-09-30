// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu() {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.textContent = "☰";
}

function openMobileMenu() {
    navLinks.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    menuToggle.textContent = "✕";
}

menuToggle.setAttribute("aria-expanded", "false");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }

});


// CLOSE MENU AFTER CLICKING A NAVIGATION LINK

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {
        closeMobileMenu();
    });

});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", function (event) {

    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar) {
        closeMobileMenu();
    }

});


// CLOSE MENU WHEN PRESSING ESCAPE

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeMobileMenu();
    }

});


// RESET MENU WHEN SWITCHING TO DESKTOP

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {
        closeMobileMenu();
    }

});

// CONTACT FORM - BACKEND CONNECTION

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();


    // FRONTEND VALIDATION

    if (!name || !email || !message) {

        formStatus.textContent = "Please fill in all fields.";

        return;

    }


    formStatus.textContent = "Sending your enquiry...";


    try {

        // SEND DATA TO BACKEND

        const response = await fetch("http://localhost:5000/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                email: email,

                message: message

            })

        });


        const result = await response.json();


        // HANDLE BACKEND RESPONSE

        if (response.ok && result.success) {

            formStatus.textContent = result.message;

            contactForm.reset();

        } else {

            formStatus.textContent =
                result.message || "Something went wrong.";

        }

    } catch (error) {

        console.error("Contact form error:", error);

        formStatus.textContent =
            "Unable to connect to the server. Please try again.";

    }

});