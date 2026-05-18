const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
  const previous = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  let current = 0;

  const setActive = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.toggleAttribute("inert", slideIndex !== current);
      slide.setAttribute("aria-hidden", String(slideIndex !== current));
    });

    dots.forEach((dot, dotIndex) => {
      dot.toggleAttribute("aria-current", dotIndex === current);
    });
  };

  const scrollToSlide = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    slides[nextIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(nextIndex);
  };

  previous.addEventListener("click", () => scrollToSlide(current - 1));
  next.addEventListener("click", () => scrollToSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => scrollToSlide(index)));

  let scrollFrame;
  carousel.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
        setActive(index);
      });
    },
    { passive: true },
  );

  setActive(0);
}
