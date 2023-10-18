document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("*[data-tooltip]").forEach((tooltip) => {
    const tooltipText = tooltip.getAttribute("data-tooltip");

    const tooltipElement = document.createElement("span");
    tooltipElement.className = "tooltip-text";
    tooltipElement.textContent = tooltipText;

    tooltip.appendChild(tooltipElement);
  });
});
