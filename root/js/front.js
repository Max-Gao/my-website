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
        NAVBAR ACTIVE SECTION
        Match the highlighted link to the visible section heading,
        not the padded section container boundary.
    ===================================================== */
    var navLinks = Array.from(document.querySelectorAll('#navbar .navbar-nav .nav-link[href^="#"]'));
    var navSections = navLinks.map(function (link) {
        var section = document.querySelector(link.getAttribute('href'));
        return {
            link: link,
            heading: section && (section.querySelector('header h2') || section.querySelector('h1') || section)
        };
    }).filter(function (item) {
        return item.heading;
    });

    var updateActiveNav = function () {
        if (!navSections.length) return;

        var nav = document.querySelector('#navbar');
        var navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
        var activationLine = navBottom + (window.innerHeight - navBottom) * 0.72;
        var activeSection = navSections[0];

        navSections.forEach(function (item) {
            if (item.heading.getBoundingClientRect().top <= activationLine) {
                activeSection = item;
            }
        });

        navSections.forEach(function (item) {
            item.link.classList.toggle('active', item === activeSection);
        });
    };

    var navUpdatePending = false;
    var scheduleActiveNavUpdate = function () {
        if (navUpdatePending) return;
        navUpdatePending = true;
        window.requestAnimationFrame(function () {
            navUpdatePending = false;
            updateActiveNav();
        });
    };

    window.addEventListener('scroll', scheduleActiveNavUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveNavUpdate);
    window.addEventListener('load', scheduleActiveNavUpdate);
    scheduleActiveNavUpdate();

    /* =====================================================
        MOBILE NAVBAR - Close menu on link click
    ===================================================== */
    var allNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && allNavLinks.length > 0) {
        var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        allNavLinks.forEach(function(link) {
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
