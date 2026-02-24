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
