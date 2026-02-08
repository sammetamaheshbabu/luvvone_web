document.addEventListener("DOMContentLoaded", () => {
  const toast = (() => {
    const el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);

    let hideTimer = null;
    const show = (message) => {
      el.textContent = message;
      el.classList.add("is-visible");
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        el.classList.remove("is-visible");
      }, 2400);
    };

    el.addEventListener("click", () => {
      el.classList.remove("is-visible");
    });

    return { show };
  })();

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".fade-in");
  animatedElements.forEach((el) => observer.observe(el));

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Smooth scrolling for in-page anchors (but ignore plain '#')
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Coming soon actions: any placeholder links or explicit markers
  // (exclude logo links, which may legitimately point to '#')
  document
    .querySelectorAll('a[href="#"]:not(.logo), a[data-soon]')
    .forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const message = a.getAttribute("data-soon-message") || "Coming soon";
        toast.show(message);
      });
    });

  // Contact form: prevent noop submit and show trust message
  document.querySelectorAll('form[action="#"]').forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      toast.show("Contact form coming soon. Email us at svbtechlabs@gmail.com");
    });
  });
});
