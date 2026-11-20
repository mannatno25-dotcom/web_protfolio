const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("mannat-portfolio-theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("mannat-portfolio-theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
  themeToggle.setAttribute("aria-label", "Switch to light mode");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showFormMessage("Please fill in all three fields.", true);
    return;
  }
  if (!emailPattern.test(email)) {
    showFormMessage("Please enter a valid email address.", true);
    return;
  }

  showFormMessage("Details validated! Opening your email app…", false);
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:mannatno25@gmail.com?subject=${subject}&body=${bodyText}`;
});

function showFormMessage(message, isError) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
}
