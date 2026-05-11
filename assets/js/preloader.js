// preloader.js
(function ($) {
	"use strict";

	// ============================================
	// GSAP CONFIGURATION
	// ============================================
	gsap.config({
		nullTargetWarn: false,
		trialWarn: false,
	});

	if (typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
	}

	// ============================================
	// GLOBAL VARIABLES
	// ============================================
	const html = document.documentElement;
	const body = document.body;

	// ============================================
	// 1. PRELOADER MODULE
	// ============================================
	window.TJPreloader = {
		init: function () {
			// Preloader disabled: remove overlay immediately (no loading screen)
			const preloader = document.querySelector(".tj-preloader");
			html.classList.remove("loading", "first-load");
			body.classList.remove("preloader-active");
			if (preloader) {
				preloader.remove();
			}
		},

		exit: function (preloader) {
			const preloaderSvg = preloader.querySelector("#preloaderSvg");
			const marquee = preloader.querySelector(".loading_marquee");
			const preloaderText = preloader.querySelector(".tj-preloader_bottom");
			const curve = "M0 502S175 329.5 500 329.5s500 172.5 500 172.5V0H0Z";
			const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

			const preTl = gsap.timeline();
			preTl.to([marquee, preloaderText], {
				delay: 0.5,
				opacity: 0,
				duration: 0.4,
			});
			preTl
				.to(preloaderSvg, {
					duration: 0.5,
					attr: { d: curve },
					ease: "power2.in",
				})
				.to(preloaderSvg, {
					duration: 0.5,
					attr: { d: flat },
				});
			preTl.to(preloader, {
				yPercent: -100,
				duration: 0.6,
				ease: "power2.inOut",
				onStart: () => {
					preloader.remove();
					body.classList.remove("preloader-active");
				},
			});
		},
	};

	// Run as soon as this file loads (before main.js and other heavy scripts)
	if (window.TJPreloader) {
		window.TJPreloader.init();
	}
})(jQuery);
