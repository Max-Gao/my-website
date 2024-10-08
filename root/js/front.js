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
});

document.getElementById('language-selector').addEventListener('change', function() {
    var selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
});
