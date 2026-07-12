"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
		NAVBAR BEHAVIOR
	===================================================== */
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 5) {
            document.querySelector(".navbar").classList.add("active");
        } else {
            document.querySelector(".navbar").classList.remove("active");
        }
    });

    /* =====================================================
		BOOTSTRAP SCROLLSPY
	===================================================== */
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: "#navbar",
        offset: 50,
    });

    /* =====================================================
        MOBILE NAVBAR - Close menu on link click
    ===================================================== */
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navLinks.length > 0) {
        var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Check if the navbar is in mobile view (collapsed)
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    /* =====================================================
        LANGUAGE SELECTOR
    ===================================================== */
    var languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            var selectedValue = this.value;
            if (selectedValue) {
                window.location.href = selectedValue;
            }
        });
    }
});
