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

const graphicProjects = document.querySelector("[data-graphic-projects]");

if (graphicProjects) {
  const tabs = Array.from(graphicProjects.querySelectorAll("[data-project-tab]"));
  const panels = Array.from(graphicProjects.querySelectorAll("[data-project-panel]"));
  const visuals = Array.from(graphicProjects.querySelectorAll("[data-project-visual]"));
  const gallery = graphicProjects.querySelector("[data-project-gallery]");

  const setGraphicProject = (project) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.projectTab === project;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.projectPanel !== project;
    });

    visuals.forEach((visual) => {
      visual.hidden = visual.dataset.projectVisual !== project;
    });

    gallery?.setAttribute("data-active-project", project);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setGraphicProject(tab.dataset.projectTab));
    tab.addEventListener("keydown", (event) => {
      const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

      if (!direction) {
        return;
      }

      event.preventDefault();
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      setGraphicProject(tabs[nextIndex].dataset.projectTab);
    });
  });

  const selectedTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0];
  setGraphicProject(selectedTab.dataset.projectTab);
}
