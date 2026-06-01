/***************************************************
==================== JS INDEX ======================
****************************************************

00. Background Image Js
02. Back to Top Js
03. Mobile Menu Js
04. Sidebar Js
05. Submenu Js
06. Menu Text Animation Js
07. Make Flip Text Structure Js
08. Make Split Flip Text Structure Js
09. Marquee Button Text Clone Js
10. Marquee Item Clone Js
11. Pricing Js
12. About Gallery Js
13. Client logo Js
14. Webgl Images Hover Animation Js
15. Reveal Hover Text Js
16. Swiper Slider Js
	- H1 Testimonial Slider
	- H3 Testimonial Slider
	- About Testimonial Slider
	- Timeline Slider
17. H1 Services Hover Effect Js
18. VenoBox Js
19. Service Hover Active Change Js
20. Flip Text 2 Js
21. Glitch anim Js
22. Tj Filter Js
23. Tooltip integration Js
24. Active Background Js
25. Load All Custom Js

****************************************************/

(function ($) {
	"use strict";

	const mainCustomJs = () => {
		/* 
  **********************************
  Background Image Js
  ********************************** 
  */
		const backgroudImages = $("[data-bg-image]");
		if (backgroudImages.length) {
			backgroudImages.each(function () {
				$(this).css(
					"background-image",
					"url(" + $(this).attr("data-bg-image") + ")",
				);
			});
		}

		/* 
  **********************************
  Back to Top Js
  ********************************** 
  */
		const btn = $("#back_to_top");
		if (btn.length) {
			function back_to_top() {
				var btn_wrapper = $(".back-to-top-wrapper");
				$(window).on("scroll", function () {
					if ($(window).scrollTop() > 1200) {
						btn_wrapper.addClass("back-to-top-btn-show");
					} else {
						btn_wrapper.removeClass("back-to-top-btn-show");
					}
				});

				btn.on("click", function (e) {
					e.preventDefault();
					$("html, body").animate({ scrollTop: 0 }, "300");
				});
			}
			back_to_top();
		}

		/* 
	**********************************
	Sticky Nav Js
	**********************************
	 */
		var lastScrollTop = "";
		function stickyMenu($targetMenu, $toggleClass) {
			var st = $(window).scrollTop();
			if ($(window).scrollTop() > 500) {
				if (st > lastScrollTop) {
					$targetMenu.removeClass($toggleClass);
				} else {
					$targetMenu.addClass($toggleClass);
				}
			} else {
				$targetMenu.removeClass($toggleClass);
			}

			lastScrollTop = st;
		}

		$(window).on("scroll", function () {
			if ($(".tj-header").length) {
				stickyMenu($(".header-sticky"), "sticky");
			}
		});

		/* 
  **********************************
   Mobile Menu Js
  ********************************** 
  */
		const mobileMenus = $("#mobile-menu");
		const isSiteEditorial = $("body.site-editorial").length > 0;
		const mobileToggleSpans =
			"<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>";

		if (isSiteEditorial && $(".tj-header_wrap").length) {
			$(".tj-header_wrap").each(function () {
				if (!$(this).find(".tj-header_mobile_toggle").length) {
					$(this).append(
						'<button type="button" class="tj-header_mobile_toggle tj_sidebar_toggle" aria-label="Open menu" aria-expanded="false" aria-controls="site-offcanvas-nav">' +
							mobileToggleSpans +
							"</button>",
					);
				}
			});
		}

		if (mobileMenus.length) {
			$("#mobile-menu").meanmenu({
				meanMenuContainer: ".mobile_menu",
				meanScreenWidth: "991",
				meanExpand: ['<i class="tji-dropdown"></i>'],
			});
		}

		/* 
  **********************************
  Sidebar Js
  ********************************** 
  */
		const closeOffcanvas = () => {
			$(".tj-offcanvas").removeClass("opened");
			$(".tj-offcanvas-overlay").removeClass("opened");
			$(".tj-header_mobile_toggle").attr("aria-expanded", "false");
		};

		if ($(".tj-offcanvas").length) {
			$(".tj-offcanvas").attr("id", "site-offcanvas-nav");

			$(document).on("click", ".tj-header_mobile_toggle", function (e) {
				e.preventDefault();
				$(".tj-offcanvas").addClass("opened");
				$(".tj-offcanvas-overlay").addClass("opened");
				$(this).attr("aria-expanded", "true");
			});

			$(".offcanvas_close").on("click", closeOffcanvas);
			$(".tj-offcanvas-overlay").on("click", closeOffcanvas);

			$(document).on(
				"click",
				".offcanvas_menu .mean-nav a:not(.mean-expand)",
				closeOffcanvas,
			);
		}

		/* 
  **********************************
  Submenu Js
  ********************************** 
  */
		if ($(".sub-menu").length) {
			$(".site_navigation nav").on(
				"mouseenter",
				"li.has-dropdown",
				function () {
					const $submenu = $(this).children(".sub-menu");

					// Disable pointer events during animation
					$submenu.css("pointer-events", "none");

					// Slide down
					$submenu.stop(true, true).slideDown(200, function () {
						// Re-enable pointer events after animation
						$(this).css("pointer-events", "auto");
					});
				},
			);

			$(".site_navigation nav").on(
				"mouseleave",
				"li.has-dropdown",
				function () {
					const $submenu = $(this).children(".sub-menu");

					// Disable pointer events during hide animation
					$submenu.css("pointer-events", "none");

					// Slide up
					$submenu.stop(true, true).slideUp(200, function () {
						// Keep pointer-events: none when hidden
						$(this).css("pointer-events", "none");
					});
				},
			);

			$(".site_navigation nav ul:not(.sub-menu) > li.has-dropdown").on(
				"mouseover",
				function () {
					$(".tj_navigation_wrap_overlay").addClass("active");
				},
			);
			$(".site_navigation nav ul:not(.sub-menu) > li.has-dropdown").on(
				"mouseleave",
				function () {
					$(".tj_navigation_wrap_overlay").removeClass("active");
				},
			);
		}

		/* 
  **********************************
  Menu Text Animation Js
  ********************************** 
  */
		const navItems = document.querySelectorAll(
			".navigation-2:not(.navigation-3) ul:not(.sub-menu) > li > a",
		);
		if (navItems?.length) {
			navItems.forEach(link => {
				const text = link.textContent;
				link.innerHTML = `
		<div class="tj-nav-text">
			${[...text].map(char => `<span>${char}</span>`).join("")}
		</div>
	`;
			});

			// adjust space width
			document.querySelectorAll(".tj-nav-text span").forEach(span => {
				if (span.textContent === " ")
					span.style.width = `${parseFloat(getComputedStyle(span).fontSize) / 5}px`;
			});
		}
		// home 4 navigation
		const navItems2 = document.querySelectorAll(
			".navigation-3 ul:not(.sub-menu) > li > a",
		);
		if (navItems2?.length) {
			navItems2.forEach(link => {
				const text = link.textContent;
				link.innerHTML = `
		<div class="tj-nav-text-2">
			${text}
		</div>
	`;
			});
		}

		/* 
  **********************************
  Make Flip Text Structure Js
  ********************************** 
  */
		const flipTextItems = document.querySelectorAll(
			".flip-text-wrap .flip-text",
		);
		if (flipTextItems?.length) {
			flipTextItems.forEach(el => {
				const text = el.textContent.trim();
				el.innerHTML = `
    <span class="front">${text}</span>
    <span class="back">${text}</span>
  `;
			});
		}

		/* 
  **********************************
  Make Split Flip Text Structure Js
  ********************************** 
  */
		const flipSpitTextItems = document.querySelectorAll(
			".split-flip-text-wrap",
		);
		if (flipSpitTextItems?.length) {
			flipSpitTextItems.forEach(textWrap => {
				const flipSpan = textWrap.querySelector(".split-flip-text");
				if (!flipSpan) return;

				const text = flipSpan.textContent.trim();

				// Create outer wrapper span
				const outerWrapper = document.createElement("span");

				// Split text by spaces to create word blocks
				const words = text.split(" ");

				words.forEach((word, wIndex) => {
					const wordSpan = document.createElement("span");
					wordSpan.className = "inline-block whitespace-nowrap";

					// Loop through each character in the word
					[...word].forEach(char => {
						const charWrap = document.createElement("span");
						charWrap.className = "relative inline-block char-wrap";
						charWrap.setAttribute("aria-hidden", "true");

						const front = document.createElement("span");
						front.className = "absolute inline-block";
						front.textContent = char;

						const back = document.createElement("span");
						back.className = "absolute inline-block";
						back.textContent = char;

						const invisible = document.createElement("span");
						invisible.className = "invisible";
						invisible.textContent = char;

						charWrap.appendChild(front);
						charWrap.appendChild(back);
						charWrap.appendChild(invisible);

						wordSpan.appendChild(charWrap);
					});

					// Add a space between words (except last word)
					if (wIndex < words.length - 1) {
						const spaceSpan = document.createElement("span");
						spaceSpan.className = "inline-block";
						spaceSpan.innerHTML = "&nbsp;";
						wordSpan.appendChild(spaceSpan);
					}

					outerWrapper.appendChild(wordSpan);
				});

				// Append a CLONE of the original .split-flip-text at the end
				outerWrapper.appendChild(flipSpan.cloneNode(true));

				// Replace the original flipSpan with the new wrapper
				flipSpan.parentNode.replaceChild(outerWrapper, flipSpan);
			});
		}

		/* 
  **********************************
  Marquee Button Text Clone Js
  ********************************** 
  */
		if ($(".tj_marquee_btn .text_btn").length) {
			$(".tj_marquee_btn .text_btn").each(function () {
				const textWrap = $(this);
				const textItem = textWrap.find("span").first();

				if (textItem.length) {
					for (let i = 0; i < 2; i++) {
						textWrap.append(textItem.clone());
					}
				}
			});
		}

		/* 
  **********************************
  Marquee Item Clone Js
  ********************************** 
  */
		if ($(".scroll-slider").length) {
			$(".scroll-slider").each(function () {
				const marqueeWrap = $(this);
				const marqueeItem = marqueeWrap.find(".scroll-wrapper").first();

				if (marqueeItem.length) {
					for (let i = 0; i < 3; i++) {
						marqueeWrap.append(marqueeItem.clone());
					}
				}

				// speed control Js
				const speed = $(this).attr("data-scroll-speed") || 30;
				const gap = $(this).attr("data-scroll-gap") || 30;

				$(this).css({
					"--duration": speed + "s",
					"--gap": gap + "px",
				});
			});
		}

		/* 
  **********************************
  Pricing Js
  ********************************** 
  */
		if ($(".tj_pricing_item").length) {
			$(".tj_pricing_item").each(function () {
				let item = $(this);

				let year = item.find(".yearly");
				let month = item.find(".monthly");
				let price = item.find(".price");

				year.on("click", function () {
					$(this).addClass("active");
					month.removeClass("active");

					price.text(price.data("year-price"));
				});

				month.on("click", function () {
					$(this).addClass("active");
					year.removeClass("active");

					price.text(price.data("month-price"));
				});
			});
		}

		/* 
  **********************************
  About Gallery Js
  ********************************** 
  */
		if ($(".about_gallery_item").length) {
			$(".about_gallery_item").on("mouseenter", function () {
				$(this).addClass("active").siblings().removeClass("active");
			});
		}

		/* 
  **********************************
  Client logo Js
  ********************************** 
  */
		// H2 Client
		const h2ClientItems = document.querySelectorAll(
			".h2_client_wrap .tj_client_item",
		);
		if (h2ClientItems?.length) {
			h2ClientItems.forEach((item, index) => {
				const imgs = item.querySelectorAll("img");
				let i = 0;

				setTimeout(() => {
					setInterval(() => {
						imgs.forEach(img => {
							img.style.opacity = "0";
							img.style.transform = "translateY(15px)";
						});

						imgs[i].style.opacity = "1";
						imgs[i].style.transform = "translateY(0)";

						i = (i + 1) % imgs.length;
					}, 4000);
				}, index * 200);
			});
		}
		// H3 Client
		const h3ClientItems = document.querySelectorAll(
			".h3_client_wrap .tj_client_item:has(img)",
		);
		if (h3ClientItems?.length) {
			h3ClientItems.forEach((item, index) => {
				const imgs = item.querySelectorAll("img");
				let i = 0;

				setTimeout(() => {
					setInterval(() => {
						imgs.forEach(img => {
							img.style.opacity = "0";
							img.style.transform = "translateY(15px)";
						});

						imgs[i].style.opacity = "1";
						imgs[i].style.transform = "translateY(0)";

						i = (i + 1) % imgs.length;
					}, 4000);
				}, index * 200);
			});
		}

		/* 
  **********************************
  Webgl Images Hover Animation Js
  ********************************** 
  */
		if ($(".tj--hover-item").length) {
			let hoverAnimation__do = function (t, n) {
				let a = new hoverEffect({
					parent: t.get(0),
					intensity: t.data("intensity") || void 0,
					speedIn: t.data("speedin") || void 0,
					speedOut: t.data("speedout") || void 0,
					easing: t.data("easing") || void 0,
					hover: t.data("hover") || void 0,
					image1: n.eq(0).attr("src"),
					image2: n.eq(0).attr("src"),
					displacementImage: t.data("displacement"),
					imagesRatio: n[0].height / n[0].width,
					hover: !1,
				});
				t.closest(".tj--hover-item")
					.on("mouseenter", function () {
						a.next();
					})
					.on("mouseleave", function () {
						a.previous();
					});
			};
			let hoverAnimation = function () {
				$(".tj--hover-img").each(function () {
					let n = $(this);
					let e = n.find("img");
					let i = e.eq(0);
					i[0].complete
						? hoverAnimation__do(n, e)
						: i.on("load", function () {
								hoverAnimation__do(n, e);
							});
				});
			};
			hoverAnimation();
		}

		/* 
  **********************************
  Reveal Hover Text Js
  ********************************** 
  */
		const hoverRevealTexts = document.querySelectorAll(".reveal-hover-text");
		if (hoverRevealTexts?.length) {
			hoverRevealTexts.forEach(el => {
				// Split only into lines
				const split = new SplitText(el, {
					types: "lines",
				});

				split.lines.forEach(line => {
					const text = line.textContent;

					line.classList.add("reveal-line");

					line.innerHTML = `
			<span class="front">${text}</span>
			<span class="back">${text}</span>
		`;
				});
			});
		}

		/* 
  **********************************
  Swiper Slider Js
  ********************************** 
  */
		// H1 Testimonial Slider
		if ($(".h1_testimonial_slider").length > 0) {
			var h1TestimonialContent = new Swiper(".h1_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 0,
				effect: "fade",
				loop: true,
				speed: 1500,
				arrow: false,
				autoplay: {
					delay: 5000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h1-slider-prev",
					nextEl: ".h1-slider-next",
				},
			});

			let h1TestimonialAuthor = new Swiper(".h1_testimonial_author_slider", {
				spaceBetween: 30,
				slidesPerView: 1,
				direction: "vertical",
				effect: "fade",
				loop: true,
				touchRatio: 0.2,
				slideToClickedSlide: true,
				speed: 1500,
			});
			// Linking the two Swipers together
			h1TestimonialContent.controller.control = h1TestimonialAuthor;
			h1TestimonialAuthor.controller.control = h1TestimonialContent;
		}
		// H3 Testimonial Slider
		if ($(".h3_testimonial_slider").length > 0) {
			var h3TestimonialContent = new Swiper(".h3_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h3-slider-prev",
					nextEl: ".h3-slider-next",
				},
				breakpoints: {
					992: {
						slidesPerView: 1.15,
					},
					1200: {
						slidesPerView: 1.4,
					},
					1400: {
						slidesPerView: 1.5,
					},
					1680: {
						slidesPerView: 2,
					},
				},
			});
		}
		// About Testimonial Slider
		if ($(".about_testimonial_slider").length > 0) {
			var aboutTestimonial = new Swiper(".about_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 30,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h3-slider-prev",
					nextEl: ".h3-slider-next",
				},
				breakpoints: {
					992: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 2,
					},
					1400: {
						slidesPerView: 3,
					},
				},
			});
		}
		// H4 Testimonial Slider
		if ($(".h4_testimonial_slider").length > 0) {
			var h4Testimonial = new Swiper(".h4_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 15,
				loop: true,
				speed: 1500,
				centeredSlides: true,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h3-slider-prev",
					nextEl: ".h3-slider-next",
				},
				breakpoints: {
					768: {
						slidesPerView: 1.4,
						spaceBetween: 30,
					},
					992: {
						slidesPerView: 1.8,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					1400: {
						slidesPerView: 2.325,
						spaceBetween: 30,
					},
					1600: {
						slidesPerView: 2.325,
						spaceBetween: 60,
					},
				},
			});
		}
		// H5 Testimonial Slider
		if ($(".h5_testimonial_slider").length > 0) {
			var h5Testimonial = new Swiper(".h5_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 15,
				loop: true,
				speed: 1500,
				centeredSlides: true,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h3-slider-prev",
					nextEl: ".h3-slider-next",
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					992: {
						slidesPerView: 2.4,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 3.3,
						spaceBetween: 30,
					},
					1400: {
						slidesPerView: 3.6,
						spaceBetween: 30,
					},
					1600: {
						slidesPerView: 4,
						spaceBetween: 60,
					},
				},
			});
		}
		// Timeline Slider
		if ($(".timeline-slider").length > 0) {
			var timelineContent = new Swiper(".timeline-slider", {
				slidesPerView: 1,
				spaceBetween: 30,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".timeline-prev",
					nextEl: ".timeline-next",
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 3,
						centeredSlides: true,
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 60,
						centeredSlides: true,
					},
				},
			});
		}
		// About Testimonial Slider
		if ($(".related_project_slider").length > 0) {
			var aboutTestimonial = new Swiper(".related_project_slider", {
				slidesPerView: 1,
				spaceBetween: 30,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},
				keyboard: {
					enabled: true,
				},
				navigation: {
					prevEl: ".h3-slider-prev",
					nextEl: ".h3-slider-next",
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
					},
					992: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 2,
					},
					1400: {
						slidesPerView: 3,
					},
				},
			});
		}
		// h6 Project Slider
		if ($(".h6_project_slider").length > 0) {
			var h6Project = new Swiper(".h6_project_slider", {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},

				navigation: {
					prevEl: ".h6_project_slider_prev",
					nextEl: ".h6_project_slider_next",
				},
				pagination: {
					el: ".h6_project_pagination",
					clickable: true,
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
					},
					992: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 2,
					},
					1400: {
						slidesPerView: 3,
					},
				},
			});
		}
		// h6 Testimonial Slider
		if (
			$(".h6_testimonial_slider_thumb").length > 0 &&
			$(".h6_testimonial_slider").length > 0
		) {
			let h6TestimonialSliderThumb = new Swiper(
				".h6_testimonial_slider_thumb",
				{
					loop: true,
					spaceBetween: 10,
					slidesPerView: 6,
					freeMode: true,
					watchSlidesProgress: true,
					breakpoints: {
						992: {
							spaceBetween: 20,
						},
						1200: {
							spaceBetween: 30,
						},
					},
				},
			);
			var h6TestimonialSlider = new Swiper(".h6_testimonial_slider", {
				slidesPerView: 1,
				spaceBetween: 30,
				loop: true,
				speed: 1500,
				autoplay: {
					delay: 4000,
				},
				navigation: {
					prevEl: ".h6_testimonial_nav_prev",
					nextEl: ".h6_testimonial_nav_next",
				},
				thumbs: {
					swiper: h6TestimonialSliderThumb,
				},
			});
		}

		/* 
  **********************************
  H1 Services Hover Effect Js
  ********************************** 
  */
		if ($(".h1_services_items").length > 0) {
			$(".h1_services_items .tj_service_item")
				.on("mouseenter", function () {
					$(this).addClass("is-active").siblings().removeClass("is-active");
				})
				.on("mouseleave", function () {
					$(this).siblings().addClass("is-active");
				});
		}

		/* 
  **********************************
  VenoBox Js
  ********************************** 
  */
		if ($(".tj-gallery").length > 0) {
			new VenoBox({
				selector: ".tj-gallery",
				numeration: true,
				// infinigall: true,
				spinner: "pulse",
			});
		}

		if ($(".video-popup").length > 0) {
			new VenoBox({
				selector: ".video-popup",
				numeration: true,
				// infinigall: true,
				spinner: "pulse",
			});
		}

		/* 
  **********************************
	Nice Select Js
	********************************** 
  */
		if ($(".tj-select select").length > 0) {
			$(".tj-select select").niceSelect();
		}

		/* 
  **********************************
  Service Hover Active Change Js
  ********************************** 
  */
		if ($(".hover-active-with-img-wrap").length) {
			$(".hover-active-with-img").on("mouseover", function () {
				const $this = $(this);

				// Remove active class from all siblings
				$this.siblings(".hover-active-with-img").removeClass("active");

				// Add active class to hovered item
				$this.addClass("active");

				// Get class name(s) of the icon inside hovered item
				const $icon = $this.find("i");
				const newClass = $icon.attr("class"); // get all classes as string

				// Find target icon container
				const $showContainer = $(".hover-active-with-img-show i");

				// Animate zoom out, change class, then zoom back in
				$showContainer
					.fadeOut(300)
					.css("transform", "scale(1.1)")
					.promise()
					.done(function () {
						$showContainer
							.attr("class", newClass) // replace classes
							.fadeIn(300)
							.css("transform", "scale(1)");
					});
			});
		}

		/* 
  **********************************
  Flip Text 2 Js
  ********************************** 
  */
		const serviceItems = document.querySelectorAll(
			".hover-active-with-img-wrap .tj_service_item",
		);
		if (serviceItems?.length) {
			serviceItems.forEach(item => {
				const title = item.querySelector(".split-flip-text-2");
				const text = title.textContent.trim();
				title.textContent = "";

				// Create layers
				const layer1 = document.createElement("div");
				layer1.classList.add("flip-layer", "layer1");
				const layer2 = document.createElement("div");
				layer2.classList.add("flip-layer", "layer2");
				layer1.textContent = text;
				layer2.textContent = text;

				// Append layers
				title.appendChild(layer1);
				title.appendChild(layer2);
			});
		}

		/* 
  **********************************
  Glitch anim Js
  ********************************** 
  */
		const tjGlitchHoverItems = document.querySelectorAll(
			".tj-glitch-anim, .tj-glitch-hover",
		);
		if (tjGlitchHoverItems?.length) {
			tjGlitchHoverItems.forEach(wrapper => {
				// Prevent duplicate creation (important for Elementor / re-init)
				if (wrapper.querySelector(".tj-glitch")) return;

				const img = wrapper.querySelector("img");
				if (!img) return;
				const imgSrc = img.getAttribute("src");
				const glitchWrap = document.createElement("div");
				glitchWrap.className = "tj-glitch";
				for (let i = 0; i < 4; i++) {
					const item = document.createElement("div");
					item.className = "tj-glitch-item";
					// store + apply background
					item.dataset.bgImage = imgSrc;
					item.style.backgroundImage = `url(${imgSrc})`;

					glitchWrap.appendChild(item);
				}

				wrapper.appendChild(glitchWrap);
			});
		}

		/* 
  **********************************
  Tj Filter Js
  ********************************** 
  */
		if (
			$(".tj_filter_item_wrapper")?.length &&
			!$(".editorial-project-grid")?.length
		) {
			$(".tj_filter_item_wrapper").imagesLoaded(function () {
				$(".tj_filter_item_wrapper").isotope({
					itemSelector: ".tj_filter_item_wrapper .tj_filter_item",
					percentPosition: true,
					layoutMode: "fitRows",
				});
			});
		}

		/* 
  **********************************
  Tooltip integration Js
  ********************************** 
  */
		const tooltipTriggerList = document.querySelectorAll(
			'[data-bs-toggle="tooltip"]',
		);
		if (tooltipTriggerList?.length) {
			tooltipTriggerList.forEach(el => {
				new bootstrap.Tooltip(el);
			});
		}

		/* 
  **********************************
  Active Background Js
  ********************************** 
  */
		function pricingFilterAnimation() {
			const containers = document.querySelectorAll(".tj-active-bg-container");
			if (!containers?.length) return;
			containers?.forEach(container => {
				const activeBg = container.querySelector(".tj-active-bg");
				let activeElement = container.querySelector(".active");

				function updateActiveBg(element) {
					if (!element) return;

					// Get element's position relative to container
					const rect = element.getBoundingClientRect();
					const containerRect = container.getBoundingClientRect();

					const left = rect.left - containerRect.left;
					const width = rect.width;
					const height = rect.height;

					// Remove 'active' class from siblings
					container
						.querySelectorAll(".nav-link")
						.forEach(el => el.classList.remove("active"));
					element.classList.add("active");

					// Set active background style
					activeBg.style.left = `${left - 1}px`;
					activeBg.style.width = `${width}px`;
					activeBg.style.height = `${height}px`;
				}

				// Add click listeners
				container.querySelectorAll(".nav-link").forEach(link => {
					link.addEventListener("click", () => updateActiveBg(link));
				});

				// Initialize active background
				updateActiveBg(activeElement);
			});
		}
		pricingFilterAnimation();

		/* 
  **********************************
  Circle Progress Js
  ********************************** 
  */
		function circleProgress() {
			const circles = document.querySelectorAll(".circle-big");
			if (circles?.length) {
				// Intersection Observer to trigger when in viewport
				const observer = new IntersectionObserver(
					(entries, observer) => {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								const circle = entry.target;
								const percent = parseInt(
									circle.getAttribute("data-percent", 10),
								);
								const progress = circle.querySelector(".progress");
								const text = circle.querySelector("span");

								const circumference = 2 * Math.PI * 55;
								progress.style.strokeDasharray = circumference;
								progress.style.transition = "stroke-dashoffset 1.5s ease-out";

								const dashOffset =
									circumference - (percent / 100) * circumference;
								progress.style.strokeDashoffset = dashOffset;

								// Animate number counting
								let current = 0;
								const duration = 1200; // ms
								const stepTime = 15; // update interval
								const increment = percent / (duration / stepTime);

								const counter = setInterval(() => {
									current += increment;
									if (current >= percent) {
										current = percent;
										clearInterval(counter);
									}
									text.textContent = Math.floor(current) + "%";
								}, stepTime);

								observer.unobserve(circle); // Run only once
							}
						});
					},
					{ threshold: 0.5 },
				); // 50% visible

				circles.forEach(circle => {
					observer.observe(circle);
				});
			}
		}
		circleProgress();

		/* --------------------------------------------
		Contact map Js
	-------------------------------------------- */
		const maps = document.querySelectorAll("#map");
		if (maps?.length) {
			// Initialize map
			const map = L.map("map", {
				center: [40.707943, -74.002124], // Location
				zoom: 14,
				zoomControl: false,
				scrollWheelZoom: false,
				gestureHandling: true,
			});

			// Dark basemap
			L.tileLayer(
				"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
			).addTo(map);

			// Custom red marker
			const customMarker = L.divIcon({
				className: "custom-marker tji-location",
				iconSize: [60, 60],
			});

			L.marker([40.707943, -74.002124], {
				icon: customMarker,
			}).addTo(map);
		}

		/* 
  **********************************
  skew showcase Js
  ********************************** 
  */
		const section = document.querySelector("body");
		const area = document.querySelector(".skew-project-area");
		const wrap = document.querySelector(".skew-project-wrap");
		const items = document.querySelectorAll(".skew-project-item");
		if (items?.length && wrap && area) {
			items.forEach(item => {
				item.addEventListener("mouseenter", function () {
					area.style.transform = "translate3d(0px, 80px, 0px)";
				});
				item.addEventListener("mouseleave", function () {
					area.style.transform = "translate3d(0px, 0px, 0px)";
				});
			});

			const maxRotateX = 30; // up/down tilt
			const maxRotateY = 30; // left/right tilt

			section.addEventListener("mousemove", e => {
				const rect = section.getBoundingClientRect();

				// cursor position normalized (-0.5 to 0.5)
				const x = (e.clientX - rect.left) / rect.width - 0.6;
				const y = (e.clientY - rect.top) / rect.height - 0.6;

				const rotateX = 70 + y * maxRotateX * -1;
				const rotateY = 0;
				const rotateZ = 40 + x * maxRotateY;

				wrap.style.transform = `
      	rotateX(${rotateX}deg)
      	rotateY(${rotateY}deg)
      	rotateZ(${rotateZ}deg)
    		`;
			});

			// reset smoothly when cursor leaves
			section.addEventListener("mouseleave", () => {
				wrap.style.transform = `
      rotateX(70deg)
      rotateY(0deg)
      rotateZ(40deg)
    `;
			});
		}

		/* 
  **********************************
  gallery showcase Js
  ********************************** 
  */
		const container = document.querySelector(".gallery-showcase-section");
		const wrapper = document.querySelector(".gallery-showcase-wrapper");
		const baseGrid = document.querySelector(".gallery-project-wrap");
		const showcaseTitle = document.querySelector(".showcase-title");

		if (container && wrapper && baseGrid && showcaseTitle) {
			let pos = { x: 0, y: 0 };
			let cursor = { x: 0, y: 0 };
			let target = { x: 0, y: 0 };
			let current = { x: 0, y: 0 };
			let isDragging = false;
			let start = { x: 0, y: 0 };

			const CLONE_RANGE = 2;
			const grids = [];

			const defaultTitle = showcaseTitle.innerHTML;

			const { width: gridW, height: gridH } = baseGrid.getBoundingClientRect();

			const style = getComputedStyle(document.documentElement);
			let GAP = {
				x: parseInt(style.getPropertyValue("--gallery-gap-x", 10)) || 80,
				y: parseInt(style.getPropertyValue("--gallery-gap-y", 10)) || 80,
			};

			// --- create clones ---
			for (let y = -CLONE_RANGE; y <= CLONE_RANGE; y++) {
				for (let x = -CLONE_RANGE; x <= CLONE_RANGE; x++) {
					const clone = baseGrid.cloneNode(true);
					clone.style.position = "absolute";
					clone.dataset.offsetX = x * (gridW + GAP.x);
					clone.dataset.offsetY = y * (gridH + GAP.y);
					wrapper.appendChild(clone);
					grids.push(clone);
				}
			}

			baseGrid.remove();

			// --- attach hover/touch title events to ALL items ---
			function bindTitleEvents(scope) {
				const items = scope.querySelectorAll(".gallery-project-item");

				items.forEach(item => {
					const titleEl = item.querySelector(".title");
					if (!titleEl) return;

					const text = titleEl.innerHTML;

					// desktop hover
					item.addEventListener("mouseenter", () => {
						showcaseTitle.innerHTML = text;
					});

					item.addEventListener("mouseleave", () => {
						showcaseTitle.innerHTML = defaultTitle;
					});

					// mobile tap
					item.addEventListener("touchstart", () => {
						showcaseTitle.innerHTML = text;
					});
				});
			}

			// bind for each cloned grid
			grids.forEach(grid => bindTitleEvents(grid));

			// --- detect mobile ---
			const isMobile =
				/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
					navigator.userAgent,
				);

			// --- desktop drag ---
			if (!isMobile) {
				container.addEventListener("mousedown", e => {
					isDragging = true;
					start.x = e.clientX - pos.x;
					start.y = e.clientY - pos.y;
				});

				window.addEventListener("mouseup", () => (isDragging = false));

				window.addEventListener("mousemove", e => {
					if (isDragging) {
						pos.x = e.clientX - start.x;
						pos.y = e.clientY - start.y;
					} else {
						const cx = window.innerWidth / 2;
						const cy = window.innerHeight / 2;
						cursor.x = (e.clientX - cx) * 0.15;
						cursor.y = (e.clientY - cy) * 0.15;
					}
				});
			}

			// --- mobile drag ---
			if (isMobile) {
				container.addEventListener("touchstart", e => {
					isDragging = true;
					start.x = e.touches[0].clientX - pos.x;
					start.y = e.touches[0].clientY - pos.y;
				});

				window.addEventListener("touchend", () => (isDragging = false));

				window.addEventListener("touchmove", e => {
					if (isDragging) {
						pos.x = e.touches[0].clientX - start.x;
						pos.y = e.touches[0].clientY - start.y;
					}
				});
			}

			// --- recycle ---
			function recycleTiles() {
				grids.forEach(grid => {
					let ox = +grid.dataset.offsetX;
					let oy = +grid.dataset.offsetY;

					if (current.x + ox > gridW + GAP.x)
						ox -= (gridW + GAP.x) * (CLONE_RANGE * 2 + 1);
					else if (current.x + ox < -gridW - GAP.x)
						ox += (gridW + GAP.x) * (CLONE_RANGE * 2 + 1);

					if (current.y + oy > gridH + GAP.y)
						oy -= (gridH + GAP.y) * (CLONE_RANGE * 2 + 1);
					else if (current.y + oy < -gridH - GAP.y)
						oy += (gridH + GAP.y) * (CLONE_RANGE * 2 + 1);

					grid.dataset.offsetX = ox;
					grid.dataset.offsetY = oy;
				});
			}

			// --- animate ---
			function animate() {
				target.x = pos.x + cursor.x;
				target.y = pos.y + cursor.y;

				current.x += (target.x - current.x) * 0.08;
				current.y += (target.y - current.y) * 0.08;

				recycleTiles();

				grids.forEach(grid => {
					grid.style.transform = `translate3d(${+grid.dataset.offsetX + current.x}px, ${+grid.dataset.offsetY + current.y}px, 0)`;
				});

				requestAnimationFrame(animate);
			}

			animate();
		}

		/*
		*******************************
		file upload js
		*******************************
		*/
		const fileInput = document.getElementById("inputFile");
		if (fileInput) {
			const fileNameText = document.querySelector(
				".upload-file-area .file-name",
			);
			const defaultText = fileNameText.textContent;

			fileInput.addEventListener("change", function () {
				if (this.files && this.files.length > 0) {
					fileNameText.textContent = this.files[0].name;
				} else {
					fileNameText.textContent = defaultText;
				}
			});
		}

		/*
		*******************************
	 	copyright year
		*******************************
		*/
		const yearEl = document.querySelector(".tj_copyright span");

		if (yearEl) {
			const currentYear = new Date().getFullYear();
			const spanYear = parseInt(yearEl.textContent, 10);

			if (spanYear < currentYear) {
				yearEl.textContent = currentYear;
			}
		}

		/*
		*******************************
    home 4 Hero Hover Parallax
		*******************************
		*/
		function initTjHoverParallax() {
			const wrappers = gsap.utils.toArray(".tj-hover-parallex-wrapper");
			const items = gsap.utils.toArray(".tj-hover-parallex");
			if (!wrappers.length || !items.length) return;
			wrappers.forEach((wrapper, i) => {
				const target = items[i];
				if (!target) return;

				// Mouse move event
				wrapper.addEventListener("mousemove", e => {
					parallaxMove(e, wrapper, target, 200);
				});
			});

			// Parallax calculation
			function parallaxMove(e, wrapper, target, movement) {
				const rect = wrapper.getBoundingClientRect();
				const relX = e.clientX - rect.left;
				gsap.to(target, {
					duration: 1,
					xPercent: ((relX - rect.width / 2) / rect.width) * movement,
					ease: "power2.out",
				});
			}
		}
		initTjHoverParallax();

		// Project hover Js
		if ($(".hover-item").length > 0) {
			$(".hover-item").on("mouseover", function () {
				$(this).addClass("active").siblings().removeClass("active");
			});
		}
	};

	/* 
  **********************************
  Load All Custom Js
  ********************************** 
  */
	if (typeof TJPreloader !== "undefined") {
		TJPreloader.init();
	}
	document.addEventListener("readystatechange", () => {
		if (document.readyState === "complete") {
			mainCustomJs();
			if (typeof GSAPAnimations !== "undefined") {
				setTimeout(() => GSAPAnimations.init(), 2000);
			}
		}
	});
})(jQuery);

const prefersReducedMotionMedia = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)");

const prefersReducedMotion = () => prefersReducedMotionMedia().matches;

const managedLoopVideos = new Set();

const isVideoInViewport = (video) => {
  const rect = video.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
};

const shouldPlayLoopVideo = (video) => {
  if (!video || prefersReducedMotion() || document.hidden) return false;
  if (video.closest(".is-filter-hidden")) return false;
  if (video.hasAttribute("controls")) return false;
  if (video.closest(".project-preview-lightbox:not([hidden])")) return false;
  return true;
};

const registerLoopVideo = (video) => {
  if (!video) return;
  managedLoopVideos.add(video);
};

const playLoopVideo = (video) => {
  if (!shouldPlayLoopVideo(video)) return;
  video.play().catch(() => {
    window.setTimeout(() => {
      if (!shouldPlayLoopVideo(video)) return;
      video.play().catch(() => {});
    }, 300);
  });
};

const resumeAllLoopVideos = () => {
  if (prefersReducedMotion() || document.hidden) return;
  managedLoopVideos.forEach((video) => {
    if (video.paused && shouldPlayLoopVideo(video)) {
      ensureLoopingVideo(video);
    }
  });
};

let loopVideoLifecycleInit = false;

const initLoopVideoLifecycle = () => {
  if (loopVideoLifecycleInit) return;
  loopVideoLifecycleInit = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      managedLoopVideos.forEach((video) => video.pause());
      return;
    }
    resumeAllLoopVideos();
  });

  window.addEventListener("pageshow", () => {
    resumeAllLoopVideos();
  });

  window.addEventListener("focus", () => {
    resumeAllLoopVideos();
  });

  window.setInterval(() => {
    if (document.hidden || prefersReducedMotion()) return;
    resumeAllLoopVideos();
  }, 8000);
};

const ensureLoopingVideo = (video, { play = true } = {}) => {
  if (!video) return;

  registerLoopVideo(video);

  if (prefersReducedMotion()) {
    video.pause();
    video.removeAttribute("autoplay");
    return;
  }

  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("autoplay", "");
  if (video.getAttribute("preload") === "none") {
    video.setAttribute("preload", "auto");
  }
  video.controls = false;
  video.removeAttribute("controls");

  if (!play) return;

  const attemptPlay = () => {
    if (!shouldPlayLoopVideo(video)) return;
    playLoopVideo(video);
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    attemptPlay();
    return;
  }

  video.addEventListener("loadeddata", attemptPlay, { once: true });
  video.addEventListener("canplay", attemptPlay, { once: true });
};

const bindContinuousLoopVideos = (videos, { pauseOffscreen = false } = {}) => {
  const list = Array.from(videos).filter(Boolean);
  if (!list.length) return;

  initLoopVideoLifecycle();
  list.forEach((video) => ensureLoopingVideo(video));

  if (prefersReducedMotion()) return;

  const resumeIfEligible = (video) => {
    if (!shouldPlayLoopVideo(video)) return;
    if (pauseOffscreen && !isVideoInViewport(video)) return;
    ensureLoopingVideo(video);
  };

  list.forEach((video) => {
    video.addEventListener("pause", () => {
      window.requestAnimationFrame(() => resumeIfEligible(video));
    });
  });

  if (pauseOffscreen) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) ensureLoopingVideo(video);
          else video.pause();
        });
      },
      { threshold: 0.08, rootMargin: "80px 0px" }
    );
    list.forEach((video) => observer.observe(video));
  }
};

const initVideoPopupControls = () => {
  const videoCards = document.querySelectorAll(
    ".schedgo-card, .breaking-barriers-card, .bloomandvine-card, .makeability-card, .fitted-card, .rulemate-card"
  );

  const clamp01 = (value) => Math.min(1, Math.max(0, value));

  videoCards.forEach((card) => {
    if (card.closest(".ideas-scatter-stage--live")) return;

    const video = card.querySelector(".project-video-popup video");
    const track = card.querySelector(".video-scrub__track");
    const fill = card.querySelector(".video-scrub__fill");
    const soundToggle = card.querySelector(".video-sound-toggle");
    if (!video || !track || !fill) return;

    let dragging = false;
    let raf = null;

    const syncSoundToggle = () => {
      if (!soundToggle) return;
      const icon = soundToggle.querySelector(".sound-icon");
      const isMuted = video.muted;
      soundToggle.setAttribute("aria-pressed", String(!isMuted));
      soundToggle.setAttribute(
        "aria-label",
        isMuted ? "Unmute video" : "Mute video"
      );
      if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
    };

    const setFill = (ratio) => {
      fill.style.width = `${clamp01(ratio) * 100}%`;
    };

    const seekFromClientX = (clientX) => {
      const rect = track.getBoundingClientRect();
      if (!rect.width) return;
      const ratio = clamp01((clientX - rect.left) / rect.width);
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = ratio * video.duration;
      setFill(ratio);
    };

    const scheduleFillFromVideo = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;
        if (dragging) return;
        setFill(video.currentTime / video.duration);
      });
    };

    video.addEventListener("timeupdate", scheduleFillFromVideo);
    video.addEventListener("loadedmetadata", scheduleFillFromVideo);

    const onPointerDown = (event) => {
      dragging = true;
      track.setPointerCapture?.(event.pointerId);
      seekFromClientX(event.clientX);
    };

    const onPointerMove = (event) => {
      if (!dragging) return;
      seekFromClientX(event.clientX);
    };

    const onPointerUp = (event) => {
      if (!dragging) return;
      dragging = false;
      track.releasePointerCapture?.(event.pointerId);
      scheduleFillFromVideo();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    if (soundToggle) {
      soundToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        video.muted = !video.muted;
        syncSoundToggle();
        video.play().catch(() => {});
      });
    }

    const isHomeLiveGrid = Boolean(card.closest(".home-project-grid--live"));
    const isAlwaysPlayingGrid = Boolean(
      isHomeLiveGrid || card.closest(".playground-carousel-stage--live, .ideas-scatter-stage--live")
    );

    if (!isAlwaysPlayingGrid) {
      card.addEventListener("mouseenter", () => {
        video.muted = true;
        syncSoundToggle();
        video.play().catch(() => {});
        scheduleFillFromVideo();
      });

      card.addEventListener("mouseleave", () => {
        dragging = false;
        video.pause();
        video.muted = true;
        syncSoundToggle();
      });
    }

    video.muted = true;
    syncSoundToggle();
  });
};

const initWicsSocialSlideshow = () => {
  const cards = document.querySelectorAll(".wics-social-card");

  cards.forEach((card) => {
    const preview = card.querySelector(".wics-social-preview");
    const slides = preview ? Array.from(preview.querySelectorAll(".preview-window img.wics-slide")) : [];
    const dotsWrap = preview ? preview.querySelector(".wics-dots") : null;
    if (!preview || slides.length === 0 || !dotsWrap) return;

    let timer = null;
    let index = 0;
    const dots = [];

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "wics-dot";
      dot.setAttribute("aria-label", `Show graphic ${i + 1}`);
      dot.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        goTo(i, { restartTimer: true });
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    const syncDots = () => {
      dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const setActive = (nextIndex) => {
      slides.forEach((img, i) => {
        img.classList.toggle("is-active", i === nextIndex);
      });
      syncDots();
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      stop();
      timer = window.setInterval(() => {
        index = (index + 1) % slides.length;
        setActive(index);
      }, 3000);
    };

    const goTo = (nextIndex, { restartTimer } = { restartTimer: false }) => {
      index = (nextIndex + slides.length) % slides.length;
      setActive(index);
      if (restartTimer) {
        startTimer();
      }
    };

    const prevHit = preview.querySelector(".wics-hit-prev");
    const nextHit = preview.querySelector(".wics-hit-next");
    if (prevHit) {
      prevHit.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        goTo(index - 1, { restartTimer: true });
      });
    }
    if (nextHit) {
      nextHit.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        goTo(index + 1, { restartTimer: true });
      });
    }

    const start = () => {
      index = 0;
      setActive(index);
      startTimer();
    };

    const resetSlides = () => {
      stop();
      slides.forEach((img) => {
        img.classList.remove("is-active");
      });
      dots.forEach((dot) => {
        dot.classList.remove("is-active");
        dot.setAttribute("aria-current", "false");
      });
    };

    const board = card.closest(".playground-carousel-stage--live");
    if (board) {
      const boardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else resetSlides();
          });
        },
        { threshold: 0.25, rootMargin: "40px 0px" }
      );
      boardObserver.observe(card);
      return;
    }

    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", resetSlides);
  });
};

const EXPAND_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3H3v6h2V5h4V3zm12 0h-6v2h4v4h2V3zM3 15v6h6v-2H5v-4H3zm18 0h-2v4h-4v2h6v-6z" fill="currentColor"/></svg>`;

const initProjectPreviewLightbox = () => {
  const lightbox = document.getElementById("project-preview-lightbox");
  if (!lightbox) return;

  const backdrop = lightbox.querySelector(".project-preview-lightbox__backdrop");
  const closeBtn = lightbox.querySelector(".project-preview-lightbox__close");
  const content = lightbox.querySelector(".project-preview-lightbox__content");
  if (!backdrop || !closeBtn || !content) return;

  let lastFocus = null;
  let keyHandler = null;
  let mediaTeardown = null;

  const open = () => {
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.classList.add("project-lightbox-open");
    lastFocus = document.activeElement;
    closeBtn.focus();
    keyHandler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", keyHandler);
  };

  const close = () => {
    if (mediaTeardown) {
      mediaTeardown();
      mediaTeardown = null;
    }
    content.innerHTML = "";
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.classList.remove("project-lightbox-open");
    if (keyHandler) {
      document.removeEventListener("keydown", keyHandler);
      keyHandler = null;
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  };

  backdrop.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  const buildVideo = (orig) => {
    const wrap = document.createElement("div");
    wrap.className = "project-lightbox-media project-lightbox-media--video";
    const v = document.createElement("video");
    v.setAttribute("controls", "");
    v.setAttribute("playsinline", "");
    v.muted = orig.muted;
    orig.querySelectorAll("source").forEach((s) => v.appendChild(s.cloneNode(true)));
    if (orig.src) v.src = orig.src;
    v.currentTime = orig.currentTime;
    wrap.appendChild(v);
    const wasPaused = orig.paused;
    orig.pause();
    v.play().catch(() => {});
    return {
      el: wrap,
      teardown: () => {
        orig.currentTime = v.currentTime;
        if (!wasPaused) orig.play().catch(() => {});
      },
    };
  };

  const buildVideoFromSrc = (src, label = "") => {
    const wrap = document.createElement("div");
    wrap.className = "project-lightbox-media project-lightbox-media--video";
    const v = document.createElement("video");
    v.setAttribute("controls", "");
    v.setAttribute("playsinline", "");
    v.controls = true;
    v.src = src;
    if (label) v.setAttribute("aria-label", label);
    wrap.appendChild(v);
    v.play().catch(() => {});
    return {
      el: wrap,
      teardown: () => {
        v.pause();
      },
    };
  };

  const buildImage = (orig) => {
    const wrap = document.createElement("div");
    wrap.className = "project-lightbox-media project-lightbox-media--image";
    const img = document.createElement("img");
    img.src = orig.currentSrc || orig.src;
    img.alt = orig.alt || "";
    wrap.appendChild(img);
    return { el: wrap, teardown: () => {} };
  };

  const buildIframe = (orig) => {
    const wrap = document.createElement("div");
    wrap.className = "project-lightbox-media project-lightbox-media--iframe";
    const frame = document.createElement("iframe");
    frame.title = orig.title || "Embedded preview";
    frame.src = orig.src;
    frame.setAttribute("allowfullscreen", "");
    wrap.appendChild(frame);
    return { el: wrap, teardown: () => {} };
  };

  const buildSlidesFromList = (slides) => {
    const wrap = document.createElement("div");
    wrap.className = "project-lightbox-media project-lightbox-media--slides";
    let idx = slides.findIndex((s) => s.classList.contains("is-active"));
    if (idx < 0) idx = 0;
    const img = document.createElement("img");
    img.className = "project-lightbox-slide-img";
    img.alt = "";
    const sync = () => {
      const s = slides[idx];
      img.src = s.currentSrc || s.src;
      img.alt = s.alt || "";
    };
    sync();
    const bar = document.createElement("div");
    bar.className = "project-lightbox-slide-bar";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "project-lightbox-slide-btn";
    prev.setAttribute("aria-label", "Previous slide");
    prev.textContent = "←";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "project-lightbox-slide-btn";
    next.setAttribute("aria-label", "Next slide");
    next.textContent = "→";
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      idx = (idx - 1 + slides.length) % slides.length;
      sync();
    });
    next.addEventListener("click", (e) => {
      e.stopPropagation();
      idx = (idx + 1) % slides.length;
      sync();
    });
    bar.append(prev, next);
    wrap.append(img, bar);
    return { el: wrap, teardown: () => {} };
  };

  const openFromPreviewWindow = (pw) => {
    content.innerHTML = "";

    const carouselSlides = Array.from(
      pw.querySelectorAll("img.wics-slide, img.nordstrom-slide"),
    );
    const iframe = pw.querySelector("iframe.nordstrom-pdf-embed");
    const video = pw.querySelector("video");
    const imgOther = pw.querySelector(
      "img:not(.wics-slide):not(.nordstrom-slide)",
    );

    let built = null;
    if (carouselSlides.length) {
      built = buildSlidesFromList(carouselSlides);
    } else if (iframe) {
      built = buildIframe(iframe);
    } else if (video) {
      built = buildVideo(video);
    } else if (imgOther) {
      built = buildImage(imgOther);
    } else {
      return;
    }

    content.appendChild(built.el);
    mediaTeardown = built.teardown;
    open();
  };

  document.querySelectorAll(".tj_project_grid:not(.home-project-grid--live):not(.playground-float-stage) .tj_project_item .project_image .preview-window").forEach((pw) => {
    if (pw.querySelector(".project-preview-expand")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project-preview-expand";
    btn.setAttribute("aria-label", "Expand preview");
    btn.innerHTML = EXPAND_ICON_SVG;
    pw.appendChild(btn);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openFromPreviewWindow(pw);
    });
  });

  document.querySelectorAll("[data-case-study-video]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.getAttribute("data-case-study-video");
      if (!src) return;
      content.innerHTML = "";
      const built = buildVideoFromSrc(
        src,
        trigger.getAttribute("aria-label") || "Case study video",
      );
      content.appendChild(built.el);
      mediaTeardown = built.teardown;
      open();
    });
  });
};

const MAKEABILITY_PORTFOLIO_VIDEO = "./assets/videos/makeability_final.mp4";
const MAKEABILITY_PORTFOLIO_VIDEO_FALLBACK =
  "./assets/videos/makeability_v.mp4";
const SCHEDGO_PORTFOLIO_VIDEO = "./assets/videos/schedgo_v.mp4";
const SCHEDGO_PORTFOLIO_VIDEO_FALLBACK = "./assets/videos/schedgo_video.mp4";
const BREAKING_BARRIERS_PORTFOLIO_VIDEO =
  "./assets/videos/breaking_barriers_video.mp4";
const BREAKING_BARRIERS_PORTFOLIO_VIDEO_FALLBACK =
  "./assets/videos/breaking_barriers_video.mov";
const BLOOMANDVINE_PORTFOLIO_VIDEO = "./assets/videos/bloomandvine_video.mp4";
const BLOOMANDVINE_PORTFOLIO_VIDEO_FALLBACK =
  "./assets/videos/bloomandvine_video.mov";

const initPortfolioCardVideo = (gridSelector, cardSelector, sources) => {
  document
    .querySelectorAll(`${gridSelector} ${cardSelector} video`)
    .forEach((video) => {
      let sourceIndex = 0;

      const setSource = (url) => {
        let sourceEl = video.querySelector("source");
        if (!sourceEl) {
          sourceEl = document.createElement("source");
          sourceEl.type = "video/mp4";
          video.appendChild(sourceEl);
        }
        sourceEl.src = url;
        video.removeAttribute("src");
        video.load();
      };

      const tryPlay = () => {
        ensureLoopingVideo(video);
      };

      const tryNextSource = () => {
        sourceIndex += 1;
        if (sourceIndex >= sources.length) return;
        setSource(sources[sourceIndex]);
      };

      video.addEventListener("error", tryNextSource);
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.addEventListener("canplay", tryPlay, { once: true });

      if (!video.querySelector("source")?.getAttribute("src")) {
        setSource(sources[0]);
      } else {
        video.load();
        tryPlay();
      }
    });
};

const FITTED_PORTFOLIO_VIDEO = "./assets/videos/fitted_video.mp4";
const FITTED_PORTFOLIO_VIDEO_FALLBACK = "./assets/videos/fitted_video.mov";
const RULEMATE_PORTFOLIO_VIDEO = "./assets/videos/rulemate_video.mp4";

const initMakeabilityPortfolioVideo = () => {
  initPortfolioCardVideo(".home-project-grid--live", ".makeability-card", [
    MAKEABILITY_PORTFOLIO_VIDEO,
    MAKEABILITY_PORTFOLIO_VIDEO_FALLBACK,
  ]);
};

const initSchedgoPortfolioVideo = () => {
  initPortfolioCardVideo(".home-project-grid--live", ".schedgo-card", [
    SCHEDGO_PORTFOLIO_VIDEO,
    SCHEDGO_PORTFOLIO_VIDEO_FALLBACK,
  ]);
};

const initBreakingBarriersPortfolioVideo = () => {
  initPortfolioCardVideo(".home-project-grid--live", ".breaking-barriers-card", [
    BREAKING_BARRIERS_PORTFOLIO_VIDEO,
    BREAKING_BARRIERS_PORTFOLIO_VIDEO_FALLBACK,
  ]);
};

const initBloomandvinePortfolioVideo = () => {
  initPortfolioCardVideo(".home-project-grid--live", ".bloomandvine-card", [
    BLOOMANDVINE_PORTFOLIO_VIDEO,
    BLOOMANDVINE_PORTFOLIO_VIDEO_FALLBACK,
  ]);
};

const IDEAS_CAROUSEL_STAGE_SELECTOR =
  ".playground-carousel-stage--live, .ideas-scatter-stage--live";
const IDEAS_CAROUSEL_PIECE_SELECTOR = ".playground-piece, .ideas-piece";
const IDEAS_CAROUSEL_LANDSCAPE_CLASS = "playground-piece--landscape";
const IDEAS_CAROUSEL_LANDSCAPE_CLASS_ALT = "ideas-piece--landscape";

const initPlaygroundCarousel = () => {
  const stage = document.querySelector(IDEAS_CAROUSEL_STAGE_SELECTOR);
  if (!stage) return;

  const pieces = stage.querySelectorAll(IDEAS_CAROUSEL_PIECE_SELECTOR);
  const clearFocus = () => pieces.forEach((piece) => piece.classList.remove("is-focused"));

  pieces.forEach((piece) => {
    const focusPiece = () => {
      clearFocus();
      piece.classList.add("is-focused");
    };
    piece.addEventListener("mouseenter", focusPiece);
    piece.addEventListener("focusin", focusPiece);
  });

  stage.addEventListener("mouseleave", clearFocus);

  const refreshPlaygroundScroll = () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
    const smoother =
      typeof ScrollSmoother !== "undefined" ? ScrollSmoother.get() : null;
    if (smoother && typeof smoother.refresh === "function") {
      smoother.refresh();
    }
  };

  const applyLandscape = (media) => {
    const piece = media.closest(IDEAS_CAROUSEL_PIECE_SELECTOR);
    if (!piece) return;
    const isLandscape =
      (media.tagName === "VIDEO" && media.videoWidth > media.videoHeight) ||
      (media.tagName === "IMG" && media.naturalWidth > media.naturalHeight);
    if (isLandscape) {
      piece.classList.add(IDEAS_CAROUSEL_LANDSCAPE_CLASS);
      piece.classList.add(IDEAS_CAROUSEL_LANDSCAPE_CLASS_ALT);
    }
  };

  stage.querySelectorAll("video").forEach((video) => {
    if (video.videoWidth) {
      applyLandscape(video);
    } else {
      video.addEventListener("loadedmetadata", () => applyLandscape(video), {
        once: true,
      });
    }
  });

  stage
    .querySelectorAll(
      ".playground-piece__media--poster img, .ideas-piece__media--poster img"
    )
    .forEach((img) => {
    if (img.complete && img.naturalWidth) {
      applyLandscape(img);
    } else {
      img.addEventListener("load", () => applyLandscape(img), { once: true });
    }
  });

  window.addEventListener("load", refreshPlaygroundScroll, { once: true });
  stage.querySelectorAll("img, video").forEach((media) => {
    media.addEventListener("load", refreshPlaygroundScroll, { once: true });
    media.addEventListener("loadeddata", refreshPlaygroundScroll, { once: true });
  });
  refreshPlaygroundScroll();
};

const initPlaygroundProjectGridMedia = () => {
  const grid = document.querySelector(IDEAS_CAROUSEL_STAGE_SELECTOR);
  if (!grid) return;

  initPortfolioCardVideo(IDEAS_CAROUSEL_STAGE_SELECTOR, ".fitted-card", [
    FITTED_PORTFOLIO_VIDEO,
    FITTED_PORTFOLIO_VIDEO_FALLBACK,
  ]);
  initPortfolioCardVideo(IDEAS_CAROUSEL_STAGE_SELECTOR, ".rulemate-card", [
    RULEMATE_PORTFOLIO_VIDEO,
  ]);

  const videos = Array.from(grid.querySelectorAll("video"));
  bindContinuousLoopVideos(videos, { pauseOffscreen: false });

  const filmPiece = grid.querySelector(
    ".playground-piece--film, .ideas-piece--film"
  );
  if (filmPiece && !filmPiece.classList.contains("ideas-piece--film")) {
    const sequenceVideo = filmPiece.querySelector(
      ".playground-sequence-video, .ideas-sequence-video"
    );
    const soundToggle = filmPiece.querySelector(".video-sound-toggle");
    if (sequenceVideo && soundToggle) {
      const syncSound = () => {
        const icon = soundToggle.querySelector(".sound-icon");
        const isMuted = sequenceVideo.muted;
        soundToggle.setAttribute("aria-pressed", String(!isMuted));
        soundToggle.setAttribute(
          "aria-label",
          isMuted ? "Unmute video" : "Mute video"
        );
        if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
      };
      syncSound();
      soundToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        sequenceVideo.muted = !sequenceVideo.muted;
        syncSound();
      });
    }
  }
};

const initHomeProjectGridMedia = () => {
  const grids = document.querySelectorAll(".home-project-grid--live");
  if (!grids.length) return;

  initMakeabilityPortfolioVideo();
  initSchedgoPortfolioVideo();
  initBreakingBarriersPortfolioVideo();
  initBloomandvinePortfolioVideo();

  const videos = [];
  grids.forEach((grid) => {
    grid.querySelectorAll("video").forEach((video) => {
      videos.push(video);
    });
  });

  bindContinuousLoopVideos(videos, { pauseOffscreen: false });

  const canFineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canFineHover) {
    grids.forEach((grid) => {
      grid.querySelectorAll(".home-project-card").forEach((card) => {
        const video = card.querySelector("video");
        if (!video) return;
        card.addEventListener("pointerenter", () => {
          card.classList.add("is-media-active");
        });
        card.addEventListener("pointerleave", () => {
          card.classList.remove("is-media-active");
        });
      });
    });
  }

  if (!prefersReducedMotion()) {
    document.querySelectorAll(".home-project-card__img--scroll").forEach((img) => {
      img.style.animationPlayState = "running";
    });
  }
};

const initHomeHeroProjectVideos = () => {
  const heroVideos = document.querySelectorAll(".home-hero-projects__thumb video");
  bindContinuousLoopVideos(heroVideos, { pauseOffscreen: false });

  if (prefersReducedMotion()) return;

  document.querySelectorAll(".home-hero-projects__thumb-scroll").forEach((img) => {
    img.style.animationPlayState = "running";
  });
};

const initCaseStudyPreviewVideos = () => {
  const videos = document.querySelectorAll(
    ".work-detail__figure-frame--video video, .case-study-figure__frame--video video, .work-detail__hero__media video, .case-study-hero__media video"
  );
  bindContinuousLoopVideos(videos, { pauseOffscreen: false });

  if (prefersReducedMotion()) return;

  document.querySelectorAll(".work-detail__figure-scroll, .case-study-figure__scroll").forEach((img) => {
    img.style.animationPlayState = "running";
  });
};

const HOME_HERO_CAROUSEL_INTERVAL_MS = 10000;
const HOME_WORK_HASH = "#work";
const HOME_SCROLL_TO_WORK_SESSION_KEY = "homeScrollToWork";

const shouldScrollHomeToWork = () => {
  try {
    return sessionStorage.getItem(HOME_SCROLL_TO_WORK_SESSION_KEY) === "1";
  } catch (_err) {
    return false;
  }
};

const clearHomeScrollToWorkIntent = () => {
  try {
    sessionStorage.removeItem(HOME_SCROLL_TO_WORK_SESSION_KEY);
  } catch (_err) {
    /* ignore */
  }
};

const stripHomeWorkHashFromUrl = () => {
  const url = new URL(window.location.href);
  if (url.hash !== HOME_WORK_HASH) return;
  history.replaceState(null, "", url.pathname + url.search);
};

const initHomeScrollToWorkLinkIntent = () => {
  if (document.documentElement.dataset.homeWorkIntentInit === "true") return;
  document.documentElement.dataset.homeWorkIntentInit = "true";

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href*="home.html#work"]');
    if (!link) return;
    try {
      sessionStorage.setItem(HOME_SCROLL_TO_WORK_SESSION_KEY, "1");
    } catch (_err) {
      /* ignore */
    }
  });
};

const scrollHomePageToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const smoother =
    typeof ScrollSmoother !== "undefined" ? ScrollSmoother.get() : null;
  if (smoother && typeof smoother.scrollTop === "function") {
    smoother.scrollTop(0);
  }
};

const scrollHomePageToWork = () => {
  const target = document.getElementById("work");
  if (!target) return;

  const smoother =
    typeof ScrollSmoother !== "undefined" ? ScrollSmoother.get() : null;
  if (smoother && typeof smoother.scrollTo === "function") {
    smoother.scrollTo(target, true, "top top");
    return;
  }

  target.scrollIntoView({ block: "start" });
};

const initHomeLandingScroll = () => {
  if (!document.body.classList.contains("page-home")) return;

  const hasWorkHash = window.location.hash === HOME_WORK_HASH;
  const scrollToWork = hasWorkHash && shouldScrollHomeToWork();

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (hasWorkHash && !scrollToWork) {
    stripHomeWorkHashFromUrl();
  }

  if (scrollToWork) {
    clearHomeScrollToWorkIntent();
    const syncWorkAnchor = () => scrollHomePageToWork();
    window.addEventListener("load", syncWorkAnchor, { once: true });
    window.setTimeout(syncWorkAnchor, 2300);
    return;
  }

  scrollHomePageToTop();
  requestAnimationFrame(scrollHomePageToTop);
  window.addEventListener("load", scrollHomePageToTop, { once: true });
  // ScrollSmoother initializes ~2s after load; keep fresh visits at the hero.
  window.setTimeout(scrollHomePageToTop, 2300);
};

const initHomeHeroProjectCarousel = () => {
  const root = document.querySelector("[data-home-hero-carousel]");
  if (!root || root.dataset.carouselInit === "true") return;
  root.dataset.carouselInit = "true";

  const slides = Array.from(root.querySelectorAll("[data-hero-carousel-slide]"));
  if (!slides.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const progressBars = slides.map((slide) =>
    slide.querySelector("[data-hero-carousel-progress]")
  );
  const progressFills = slides.map((slide) =>
    slide.querySelector("[data-hero-carousel-progress-fill]")
  );
  const getActiveProgressFill = () =>
    slides[activeIndex]?.querySelector("[data-hero-carousel-progress-fill]") ??
    null;
  const progressEnabled =
    !prefersReducedMotion &&
    slides.length > 1 &&
    progressFills.every(Boolean);
  let activeIndex = 0;
  let timerId = null;
  let progressAnimation = null;
  let pausedRemainingMs = HOME_HERO_CAROUSEL_INTERVAL_MS;
  let interactionPaused = false;

  const resetAllProgressFills = () => {
    progressFills.forEach((fill) => {
      if (!fill) return;
      fill.style.transform = "scaleX(0)";
    });
  };

  if (progressEnabled) {
    resetAllProgressFills();
  } else {
    progressBars.forEach((bar) => {
      if (bar) bar.hidden = true;
    });
  }

  const getProgressRemainingMs = () => {
    if (!progressAnimation) return pausedRemainingMs;
    const timing = progressAnimation.effect?.getTiming?.();
    const duration =
      typeof timing?.duration === "number"
        ? timing.duration
        : HOME_HERO_CAROUSEL_INTERVAL_MS;
    const currentTime = progressAnimation.currentTime ?? 0;
    return Math.max(0, Math.round(duration - currentTime));
  };

  const pauseProgress = () => {
    if (!progressEnabled) return;
    pausedRemainingMs = getProgressRemainingMs();
    progressAnimation?.pause();
  };

  const goTo = (nextIndex, { restartTimer = false } = {}) => {
    const count = slides.length;
    activeIndex = ((nextIndex % count) + count) % count;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      if (isActive) {
        slide.setAttribute("aria-current", "true");
      } else {
        slide.removeAttribute("aria-current");
      }
    });

    progressAnimation?.cancel();
    progressAnimation = null;
    resetAllProgressFills();

    root.querySelectorAll(".home-hero-projects__thumb video").forEach((video) => {
      ensureLoopingVideo(video);
    });

    if (restartTimer) {
      interactionPaused = false;
      pausedRemainingMs = HOME_HERO_CAROUSEL_INTERVAL_MS;
      start(HOME_HERO_CAROUSEL_INTERVAL_MS);
    }
  };

  const pauseCarousel = () => {
    if (interactionPaused) return;
    interactionPaused = true;
    stop();
  };

  const resumeCarousel = () => {
    if (!interactionPaused) return;
    interactionPaused = false;
    start();
  };

  const stop = () => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
    pauseProgress();
  };

  const start = (delayMs) => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
    if (prefersReducedMotion || slides.length < 2) return;

    const duration =
      typeof delayMs === "number" ? delayMs : pausedRemainingMs;
    const remaining = Math.min(
      HOME_HERO_CAROUSEL_INTERVAL_MS,
      Math.max(50, duration)
    );

    if (progressEnabled) {
      const progressFill = getActiveProgressFill();
      if (progressFill) {
        const ratio = 1 - remaining / HOME_HERO_CAROUSEL_INTERVAL_MS;
        progressAnimation?.cancel();
        progressAnimation = progressFill.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          {
            duration: HOME_HERO_CAROUSEL_INTERVAL_MS,
            fill: "forwards",
            easing: "linear",
          }
        );
        if (ratio > 0 && ratio < 1) {
          progressAnimation.currentTime =
            HOME_HERO_CAROUSEL_INTERVAL_MS * ratio;
        }
        pausedRemainingMs = remaining;
      }
    }

    timerId = window.setTimeout(() => {
      timerId = null;
      goTo(activeIndex + 1);
      pausedRemainingMs = HOME_HERO_CAROUSEL_INTERVAL_MS;
      start(HOME_HERO_CAROUSEL_INTERVAL_MS);
    }, remaining);
  };

  const selectSlide = (index) => {
    if (activeIndex === index) {
      interactionPaused = false;
      pausedRemainingMs = HOME_HERO_CAROUSEL_INTERVAL_MS;
      start();
      return;
    }
    goTo(index, { restartTimer: true });
  };

  const navigateFromSlide = (slide, event) => {
    if (event.target.closest("a[href]")) return false;
    const href = slide.dataset.workHref || slide.dataset.caseStudyHref;
    if (!href) return false;
    window.location.assign(href);
    return true;
  };

  slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
      if (navigateFromSlide(slide, event)) return;
      selectSlide(index);
    });

    slide.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (navigateFromSlide(slide, event)) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      selectSlide(index);
    });

    slide.addEventListener("mouseenter", () => {
      if (slide.classList.contains("is-active")) pauseCarousel();
    });

    slide.addEventListener("mouseleave", (event) => {
      if (!slide.classList.contains("is-active")) return;
      if (slide.contains(event.relatedTarget)) return;
      resumeCarousel();
    });

    slide.addEventListener("focusin", () => {
      if (slide.classList.contains("is-active")) pauseCarousel();
    });

    slide.addEventListener("focusout", (event) => {
      if (!slide.classList.contains("is-active")) return;
      if (slide.contains(event.relatedTarget)) return;
      resumeCarousel();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  goTo(0);
  start(HOME_HERO_CAROUSEL_INTERVAL_MS);
};

const initHomeWorkSectionMotion = () => {
  const section = document.querySelector("#work.home-work-section");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const groups = section.querySelectorAll(".home-work-group");
  groups.forEach((group) => {
    const header = group.querySelector(".home-work-group__header");
    const cards = group.querySelectorAll(".home-project-card");
    if (!cards.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: "top 84%",
        once: true,
      },
    });

    if (header) {
      timeline.from(header, {
        autoAlpha: 0,
        y: 22,
        duration: 0.7,
        ease: "power2.out",
      });
    }

    timeline.from(
      cards,
      {
        autoAlpha: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
      },
      header ? "-=0.4" : 0
    );
  });

  section.querySelectorAll(".home-project-card").forEach((card) => {
    const media = card.querySelector(".home-project-card__media");
    const inner = media?.querySelector(
      ".home-project-card__video, .home-project-card__img:not(.home-project-card__img--scroll)"
    );
    if (!media || !inner) return;

    gsap.fromTo(
      inner,
      { yPercent: 2 },
      {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.55,
        },
      }
    );
  });

};

const initEditorialProjectFilter = () => {
  document.querySelectorAll(".editorial-filter-btn-group").forEach((group) => {
    const section = group.closest(".home-work-section, .project-filter-section");
    const grid = section?.querySelector(".editorial-project-grid");
    if (!grid) return;

    const items = grid.querySelectorAll(".tj_filter_item");
    const buttons = group.querySelectorAll(".tj_filter_btn[data-filter]");

    const applyFilter = (selector) => {
      const isActive = Boolean(selector);
      grid.classList.toggle("is-filter-active", isActive);

      items.forEach((item) => {
        const visible = !isActive || item.matches(selector);
        item.classList.toggle("is-filter-hidden", !visible);
        item.setAttribute("aria-hidden", visible ? "false" : "true");
        item.querySelectorAll("video").forEach((video) => {
          if (!visible) {
            video.pause();
            return;
          }
          if (grid.classList.contains("home-project-grid--live")) {
            ensureLoopingVideo(video);
          }
        });
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selector = button.getAttribute("data-filter");
        const wasActive = button.classList.contains("active");

        buttons.forEach((btn) => btn.classList.remove("active"));

        if (wasActive) {
          applyFilter(null);
          return;
        }

        button.classList.add("active");
        applyFilter(selector);
      });
    });

  });
};

const initDanceReels = () => {
  const videos = document.querySelectorAll(".page-dance .dance-reel-card__video");
  if (!videos.length) return;

  videos.forEach((video) => {
    const frame = video.closest(".dance-reel-card__frame");
    const showPosterFallback = () => {
      const poster = video.getAttribute("poster");
      if (!poster || frame?.querySelector(".dance-reel-card__poster")) return;
      const img = document.createElement("img");
      img.className = "dance-reel-card__poster";
      img.src = poster;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.decoding = "async";
      frame?.prepend(img);
      video.style.display = "none";
    };

    video.addEventListener("error", showPosterFallback, { once: true });
  });

  bindContinuousLoopVideos(videos, { pauseOffscreen: false });

  const refreshDanceScroll = () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  };

  videos.forEach((video) => {
    video.addEventListener(
      "loadedmetadata",
      () => {
        const frame = video.closest(".dance-reel-card__frame");
        const card = video.closest(".dance-reel-card");
        if (video.videoWidth > video.videoHeight) {
          frame?.classList.add("dance-reel-card__frame--landscape");
          card?.classList.add("dance-reel-card--landscape");
        }
        refreshDanceScroll();
      },
      { once: true }
    );
  });

  window.addEventListener("load", refreshDanceScroll, { once: true });
};

/** Continuous community marquee speed (px/s). */
const COMMUNITY_MARQUEE_SPEED_PX_S = 48;
const COMMUNITY_MARQUEE_SPEED_SINGLE_PX_S = 18;

const initCommunityGalleries = () => {
  if (!document.body.classList.contains("page-community")) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const prefersReduced = () => motionQuery.matches;

  const duplicateTrackItems = (track, items) => {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a[href]").forEach((link) => {
        link.setAttribute("tabindex", "-1");
      });
      track.appendChild(clone);
    });
  };

  const setMarqueeDuration = (track, loopDistancePx, speedPxS) => {
    const durationSec = Math.max(loopDistancePx / speedPxS, 8);
    track.style.setProperty("--community-marquee-duration", `${durationSec}s`);
  };

  document.querySelectorAll("[data-community-carousel]").forEach((root) => {
    const viewport = root.querySelector(".community-gallery-carousel__viewport");
    const track = root.querySelector(".community-gallery-carousel__track");
    if (!viewport || !track) return;

    const items = Array.from(
      track.querySelectorAll(".community-gallery__item:not([aria-hidden='true'])")
    );
    if (!items.length) return;

    root.classList.add("community-gallery-carousel--live");

    const canScroll = () => viewport.scrollWidth > viewport.clientWidth + 2;
    const isSingleItem = items.length === 1;

    if (isSingleItem && !canScroll()) {
      root.classList.add("community-gallery-carousel--static");
      return;
    }

    if (prefersReduced()) {
      root.classList.add("community-gallery-carousel--manual");
      return;
    }

    duplicateTrackItems(track, items);
    root.classList.add("community-gallery-carousel--marquee");

    const speedPxS = isSingleItem
      ? COMMUNITY_MARQUEE_SPEED_SINGLE_PX_S
      : COMMUNITY_MARQUEE_SPEED_PX_S;

    const refreshDuration = () => {
      const loopDistancePx = track.scrollWidth / 2;
      setMarqueeDuration(track, loopDistancePx, speedPxS);
    };

    refreshDuration();
    window.addEventListener("resize", refreshDuration, { passive: true });
  });
};

const initProjectPageEnhancements = () => {
  initLoopVideoLifecycle();
  initHomeScrollToWorkLinkIntent();
  initHomeLandingScroll();
  initVideoPopupControls();
  initWicsSocialSlideshow();
  initProjectPreviewLightbox();
  initHomeProjectGridMedia();
  initHomeHeroProjectVideos();
  initHomeHeroProjectCarousel();
  initHomeWorkSectionMotion();
  initCaseStudyPreviewVideos();
  initPlaygroundProjectGridMedia();
  initPlaygroundCarousel();
  initEditorialProjectFilter();
  initDanceReels();
  if (typeof initDanceOutletWall === "function") {
    initDanceOutletWall();
  }
  initCommunityGalleries();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectPageEnhancements);
} else {
  initProjectPageEnhancements();
}

