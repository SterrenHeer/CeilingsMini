$('.header_toggler').click(function() {
    $('.header_contacts').toggleClass('show flex');
});

function tabs(tabContainerSelector, tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabsParent = document.querySelector(`${tabContainerSelector} ${tabsParentSelector}`),
        tabs = document.querySelectorAll(`${tabContainerSelector} ${tabsSelector}`),
		tabsContent = document.querySelectorAll(`${tabContainerSelector} ${tabsContentSelector}`);

	function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
}

function slider({container, slide, nextArrow, prevArrow, wrapper, field}) {
    let slideIndex = 1;
    let offset = 0;
    let width
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);
    
    width = window.getComputedStyle(slidesWrapper).width;
    slides.forEach((slide) => {
        slide.style.width = width;
    });
    window.addEventListener('resize', (e) => {
        width = window.getComputedStyle(slidesWrapper).width;
        slides.forEach((slide) => {
            slide.style.width = width;
        });
    });   
    
    slidesField.style.width = 100 * slides.length + "%";

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('gallery_slider_indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('active');
        } 
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
	});

    prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
	});

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex-1].classList.add('active');
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/[^\d\.]/g, '');
    }
}

tabs('.promo_content_item.tab_1', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_2', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_3', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_4', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');

slider({
    container: '.gallery_slider',
    slide: '.gallery_slide',
    nextArrow: '.gallery_slider_next',
    prevArrow: '.gallery_slider_prev',
    wrapper: '.gallery_slider_wrapper',
    field: '.gallery_slider_inner'
});
