// Sticky Header on scroll
const siteHeader = document.querySelector(".js-site-header");
window.addEventListener("scroll", () =>
  window.scrollY > 200
    ? siteHeader.classList.add("scrolling")
    : siteHeader.classList.remove("scrolling")
);
window.dispatchEvent(new Event("scroll"));

// Active nav link state
const navlinks = [...document.querySelectorAll(".js-nav-list a")];
const activeNavLink = navlinks.find(
  (link) => new URL(link.href).pathname === window.location.pathname
);
if (activeNavLink) activeNavLink.classList.add("active");

// Reset nav styles on resize
const topNavMobileMq = getComputedStyle(
  document.documentElement
).getPropertyValue("--nav-mobile-mq"); // top nav switches to mobile layout
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > topNavMobileMq && mainNavInput.checked) {
      mainNavInput.checked = false;
      mainNavInput.dispatchEvent(new Event("change"));
    }
  }, 300);
});
