var timing = 300;

function toggleDropdown($header, $content) {
  var isExpanded = $content.attr("aria-hidden") === "false";
  var $dropdown = $header.closest(".js-dropdown");

  if (!isExpanded) {
    // Expand the dropdown
    $content.attr("aria-hidden", "false");
    $content.slideDown(timing);
    $dropdown.addClass("active"); // Add the "active" class
  } else {
    // Collapse the dropdown
    $content.attr("aria-hidden", "true");
    $content.slideUp(timing);
    $dropdown.removeClass("active"); // Remove the "active" class
  }
}

function handleResize() {
  $(".js-dropdown").each(function () {
    var $dropdown = $(this);
    var mq = $dropdown.data("mq");
    var $header = $dropdown.find(".js-header");
    var $content = $dropdown.find(".js-content");
    var isHidden = $content.attr("aria-hidden") === "true";

    // Store the initial aria-hidden attribute
    if (typeof mq !== "undefined") {
      if (!$dropdown.data("initial-aria-hidden")) {
        $dropdown.data("initial-aria-hidden", $content.attr("aria-hidden"));
      }
    }

    // Unbind the click event before binding it again to prevent repeated bindings
    $header.off("click");

    // Click event to toggle dropdown
    if (typeof mq === "undefined" || window.innerWidth <= mq) {
      $header.on("click", function () {
        toggleDropdown($header, $content);
      });
      $dropdown.addClass("active"); // Add the "active" class
    } else {
      $dropdown.removeClass("active"); // Remove the "active" class
    }

    // Keyboard navigation
    $header.on("keydown", function (e) {
      var key = e.which || e.keyCode;
      if (key === 13 || key === 32) {
        // Enter or Space key
        e.preventDefault();
        toggleDropdown($header, $content);
      }
    });

    if (typeof mq === "undefined" || window.innerWidth > mq) {
      // When resizing above data-mq, always show content
      $content.attr("aria-hidden", "false");
      $content.slideDown(timing);
    } else {
      // When resizing below data-mq, set content visibility based on the initial aria-hidden attribute
      var initialAriaHidden = $dropdown.data("initial-aria-hidden");
      if (initialAriaHidden === "true") {
        $content.attr("aria-hidden", "true");
        $content.slideUp(0); // Hide content
      } else {
        $content.attr("aria-hidden", "false");
        $content.slideDown(0); // Show content
      }
    }
  });
}

// Call handleResize on page load and window resize
$(window).on("load resize", function () {
  handleResize();
});