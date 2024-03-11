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

function slider({container, wrapper, field, slide, indicatorsSelector, nextArrow, prevArrow}) {
    let slideIndex = 1,
        offset = 0,
        mobile = false,
        dots = [];
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        mediaQuery = window.matchMedia('(max-width: 768px)');

    let width = window.getComputedStyle(slidesWrapper).width;

    let indicators = document.createElement('ol');
    indicators.classList.add(indicatorsSelector);
    slider.append(indicators);

    slidesField.style.width = 100 * slides.length + "%";  

    slides.forEach((slide) => {
        slide.style.width = width;
    });
    if (mediaQuery.matches) {
        mobile = true;
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        mobile ? dot.style.width = 100 / slides.length + "%" : dot.style.width = '';
        if (i == 0) {
            dot.classList.add('active');
        } 
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            changeActivity();
        });
    });

    window.addEventListener('resize', (e) => {
        width = window.getComputedStyle(slidesWrapper).width;
        slides.forEach((slide) => {
            slide.style.width = width;
        });
        mediaQuery.matches ? mobile = true : mobile = false;
        let dots = document.querySelectorAll('.dot')
        dots.forEach((dot) => {
            mobile ? dot.style.width = 100 / slides.length + "%" : dot.style.width = '';
        });
        slideIndex = 1,
        offset = 0,
        changeActivity();
    }); 

    next.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

        changeActivity();
	});

    prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

        changeActivity();
	});

    function changeActivity() {
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
    }

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
    wrapper: '.gallery_slider_wrapper',
    field: '.gallery_slider_inner',
    slide: '.gallery_slide',
    indicatorsSelector: 'gallery_slider_indicators',
    nextArrow: '.gallery_slider_next',
    prevArrow: '.gallery_slider_prev'
});
