const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll(".faq-question").forEach((button, index) => {
  const item = button.closest(".faq-item");
  const answer = item?.querySelector(".faq-answer");

  if (!item || !answer) {
    return;
  }

  const answerId = answer.id || `faq-answer-${index + 1}`;
  answer.id = answerId;
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", answerId);

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      const openButton = openItem.querySelector(".faq-question");
      if (openButton) {
        openButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const waitlistForm = document.querySelector("#waitlist-form");
const formStatus = document.querySelector("#form-status");
const WAITLIST_ENDPOINT = "https://formsubmit.co/ajax/hello@everlemon.org";

if (waitlistForm && formStatus) {
  waitlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    const formData = new FormData(waitlistForm);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    formStatus.textContent = "Sending your details...";
    formStatus.classList.remove("is-error");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      waitlistForm.reset();
      formStatus.textContent = "Thank you. Your details have been sent and EverLemon will be in touch personally.";
    } catch (error) {
      formStatus.textContent = "Something went wrong while sending. Please email hello@everlemon.org instead.";
      formStatus.classList.add("is-error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Join the Founding Families";
      }
    }
  });
}
