"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var heroSection = document.querySelector('.hero');
    var heroVideo = document.querySelector('.hero-video');
    var heroPoster = document.querySelector('.hero-poster');

    if (heroSection && heroVideo) {
        var loadVideo = function () {
            if (heroVideo.dataset.loaded === 'true') return;
            heroVideo.dataset.loaded = 'true';
            heroVideo.load();
            heroVideo.style.opacity = '1';
            heroVideo.style.visibility = 'visible';
            heroSection.classList.add('ready');
            if (heroPoster) {
                heroPoster.style.opacity = '0';
            }
            var playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(function () {});
            }
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(function () {
                loadVideo();
            });
        } else {
            setTimeout(loadVideo, 300);
        }

        window.addEventListener('pointerdown', loadVideo, { once: true });
        window.addEventListener('keydown', loadVideo, { once: true });
        window.addEventListener('scroll', loadVideo, { once: true, passive: true });
    }

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
