const reduceMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
AOS.init({ duration: reduceMotionPreference.matches ? 0 : 900, once: true, offset: 80, easing: "ease-out-cubic" });

// Typing Effect
const roles = ["Frontend Engineer"];
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
if (reduceMotionPreference.matches) {
  typingEl.textContent = roles[0];
} else {
  type();
}

// Navbar & Mobile Menu
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 80);
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function setMobileMenuOpen(isOpen) {
  mobileMenu.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.querySelector("i").classList.toggle("fa-bars", !isOpen);
  menuToggle.querySelector("i").classList.toggle("fa-xmark", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMobileMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMobileMenuOpen(false);
});

// Smooth section-entry transition for in-page navigation and scrolling.
if (!reduceMotionPreference.matches && "IntersectionObserver" in window) {
  const pageSections = document.querySelectorAll("section[id]");
  pageSections.forEach((section) => section.classList.add("section-transition"));

  const sectionTransitionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  pageSections.forEach((section) => sectionTransitionObserver.observe(section));
}

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

// Interactive project-card tilt. Disabled for touch and reduced-motion users.
const touchLayout = window.matchMedia("(hover: none)");

document.querySelectorAll(".project").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reduceMotionPreference.matches || touchLayout.matches || event.pointerType !== "mouse") return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 9;
    const rotateY = (x - 0.5) * 11;

    card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  });
});

// WhatsApp Contact Form
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const email = document.querySelector('input[placeholder="Your Email"]').value;
  const message = document.querySelector('textarea').value;

  const whatsappNumber = "2349045151582";
  const text = `Hi Mariam, I'm ${name} (${email}). %0A%0A${message}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank");
});

// Hire Me Button WhatsApp
document.querySelector(".hire-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const whatsappNumber = "2349045151582";
  const text = "Hi Mariam, I'm interested in hiring you for a project!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
});
