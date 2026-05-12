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

	function initPortfolioFilterCounts() {
		const group = document.querySelector(".tj_filter_btn_group");
		const grid = document.querySelector(".tj_filter_item_wrapper");
		if (!group || !grid) return;
		const items = grid.querySelectorAll(".tj_filter_item");
		group.querySelectorAll("button[data-filter]").forEach(btn => {
			const filter = btn.getAttribute("data-filter");
			if (!filter) return;
			const flip = btn.querySelector(".flip-text");
			if (!flip) return;
			const base = flip.textContent.replace(/\s*\(\d+\)\s*$/, "").trim();
			let count = 0;
			if (filter === ".all") {
				count = items.length;
			} else {
				const cls = filter.startsWith(".") ? filter.slice(1) : filter;
				items.forEach(el => {
					if (el.classList.contains(cls)) count += 1;
				});
			}
			flip.textContent = `${base} (${count})`;
			btn.setAttribute("aria-label", `${base}, ${count} projects`);
		});
	}

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
		if ($(".tj-offcanvas").length) {
			$(".tj_sidebar_toggle").on("click", function () {
				$(".tj-offcanvas").addClass("opened");
				$(".tj-offcanvas-overlay").addClass("opened");
			});

			$(".offcanvas_close").on("click", function () {
				$(".tj-offcanvas").removeClass("opened");
				$(".tj-offcanvas-overlay").removeClass("opened");
			});
			$(".tj-offcanvas-overlay").on("click", function () {
				$(".tj-offcanvas").removeClass("opened");
				$(this).removeClass("opened");
			});
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

		initPortfolioFilterCounts();

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
		if ($(".tj_filter_item_wrapper")?.length) {
			$(".tj_filter_item_wrapper").imagesLoaded(function () {
				var $grid = $(".tj_filter_item_wrapper").isotope({
					itemSelector: ".tj_filter_item_wrapper .tj_filter_item",
					percentPosition: true,
					layoutMode: "fitRows",
					filter: ".selected_work",
				});

				$grid.on("layoutComplete", function () {
					if (typeof ScrollTrigger !== "undefined") {
						ScrollTrigger.refresh();
					}
				});

				// filter items on button click
				$(".tj_filter_btn_group").on("click", "button", function () {
					$(".tj_filter_btn_group button").removeClass("active");
					$(this).addClass("active");

					var filterValue = $(this).attr("data-filter");
					$grid.isotope({ filter: filterValue });
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

const initVideoPopupControls = () => {
  const videoCards = document.querySelectorAll(
    ".schedgo-card, .breaking-barriers-card, .bloomandvine-card, .makeability-card, .fitted-card, .rulemate-card"
  );

  const clamp01 = (value) => Math.min(1, Math.max(0, value));

  videoCards.forEach((card) => {
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

    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", () => {
      stop();
      slides.forEach((img) => {
        img.classList.remove("is-active");
      });
      dots.forEach((dot) => {
        dot.classList.remove("is-active");
        dot.setAttribute("aria-current", "false");
      });
    });
  });
};

const initNordstromDeckSlideshow = () => {
  const FIGMA_MSG_ORIGIN = "https://www.figma.com";
  document.querySelectorAll(".nordstrom-rack-card").forEach((card) => {
    const preview = card.querySelector(".nordstrom-rack-preview");
    if (!preview) return;
    const iframe = preview.querySelector("iframe.nordstrom-deck-embed");
    const slideImgs = Array.from(preview.querySelectorAll("img.nordstrom-slide"));

    let intervalId = null;
    let startDelayId = null;

    const clearTimers = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      if (startDelayId) {
        window.clearTimeout(startDelayId);
        startDelayId = null;
      }
    };

    const sendToDeck = (payload) => {
      if (!iframe?.contentWindow) return;
      try {
        iframe.contentWindow.postMessage(payload, FIGMA_MSG_ORIGIN);
      } catch (_) {
        /* ignore */
      }
    };

    const startImageSlideshow = () => {
      if (slideImgs.length === 0) return;
      if (iframe) iframe.classList.add("nordstrom-deck-embed--hidden");
      let idx = 0;
      slideImgs.forEach((img, i) => img.classList.toggle("is-active", i === 0));
      intervalId = window.setInterval(() => {
        idx = (idx + 1) % slideImgs.length;
        slideImgs.forEach((img, i) => img.classList.toggle("is-active", i === idx));
      }, 3500);
    };

    const startIframeAdvance = () => {
      if (!iframe) return;
      iframe.classList.remove("nordstrom-deck-embed--hidden");
      const tick = () => sendToDeck({ type: "NAVIGATE_FORWARD" });
      startDelayId = window.setTimeout(() => {
        tick();
        intervalId = window.setInterval(tick, 4000);
      }, 1400);
    };

    card.addEventListener("mouseenter", () => {
      clearTimers();
      if (slideImgs.length > 0) {
        startImageSlideshow();
      } else {
        startIframeAdvance();
      }
    });

    card.addEventListener("mouseleave", () => {
      clearTimers();
      slideImgs.forEach((img) => img.classList.remove("is-active"));
      if (slideImgs.length > 0 && iframe) iframe.classList.remove("nordstrom-deck-embed--hidden");
      if (slideImgs.length === 0) sendToDeck({ type: "RESTART" });
    });
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
    const iframe = pw.querySelector("iframe.nordstrom-deck-embed");
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

  document.querySelectorAll(".tj_project_grid .tj_project_item .project_image .preview-window").forEach((pw) => {
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
};

const initProjectPageEnhancements = () => {
  initVideoPopupControls();
  initWicsSocialSlideshow();
  initNordstromDeckSlideshow();
  initProjectPreviewLightbox();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectPageEnhancements);
} else {
  initProjectPageEnhancements();
}

