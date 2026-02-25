AOS.init({ duration: 1200, once: true });

// Typing Effect
const roles = ["Frontend Developer", "UI/UX Designer"];
let i = 0,
  j = 0,
  current = "",
  deleting = false;
const typingEl = document.querySelector(".typing");

function type() {
  const role = roles[i];
  if (deleting) {
    current = role.substring(0, j - 1);
    j--;
  } else {
    current = role.substring(0, j + 1);
    j++;
  }
  typingEl.textContent = current;

  if (!deleting && j === role.length) {
    deleting = true;
    setTimeout(type, 2000);
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
    setTimeout(type, 600);
  } else {
    setTimeout(type, deleting ? 60 : 100);
  }
}
type();

// Navbar & Mobile Menu
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 80);
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".mobile-menu").classList.toggle("active");
});

// Skill Bars
document.querySelectorAll(".fill").forEach((bar) => {
  bar.style.width = "0";
  const target = bar.dataset.width + "%";
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bar.style.width = target;
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(bar.parentElement.parentElement);
});

// WhatsApp Contact Form
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const email = document.querySelector('input[placeholder="Your Email"]').value;
  const message = document.querySelector('textarea').value;

  const whatsappNumber = "2349136308934";
  const text = `Hi Mariam, I'm ${name} (${email}). %0A%0A${message}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank");
});

// Hire Me Button WhatsApp
document.querySelector(".hire-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const whatsappNumber = "2349136308934";
  const text = "Hi Mariam, I'm interested in hiring you for a project!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
});
