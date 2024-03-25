const header_toggler = document.querySelector('.header_toggler');
const header_contacts = document.querySelector('.header_contacts');

header_toggler.addEventListener('click', (e) => {
    header_contacts.classList.toggle('show');
    header_contacts.classList.toggle('flex');
});

const survey_buttons = document.querySelectorAll('.btn_test_survey, .btn_back');

survey_buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let next = e.target.getAttribute('data-show');
        e.target.parentElement.parentElement.style.display = 'none';
        document.querySelector(`#${next}`).style.display = 'flex';
    });
});

const area_range = document.querySelector("#area_range");
const area_value = document.querySelector("#area_value");

area_value.innerHTML = area_range.value;

area_range.oninput = function() {
    area_value.innerHTML = this.value;
}

const counters_items = document.querySelectorAll(".counters");
const counters_values = document.querySelectorAll(".values");

counters_values.forEach((item, index) => {
    item.innerHTML = counters_items[index].value;
});
counters_items.forEach((item, index) => {
    item.oninput = function() {
        counters_values[index].innerHTML = item.value;
    }
});

function congratulate() {
    let roulette_btn = document.querySelector('.roulette_btn');
    let roulette_image = document.querySelector('.roulette_image img');
    let roulette_items = document.querySelectorAll('.roulette_content_item');
    
    roulette_image.style.animation = 'spin 1s linear 0s infinite'
    setTimeout(function(){
        roulette_btn.classList.add('hide');
        roulette_items.forEach((item) => {
            item.classList.toggle('hide');
        });
        roulette_image.style.animation = 'spin 17s linear 0s infinite'
    }, 3000);
    
}

function slider({container, wrapper, field, slide, indicatorsSelector, nextArrow, prevArrow, duration = 0}) {
    let slideIndex = 1,
        offset = 0,
        timer = 0,
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

    function makeTimer(duration){
        if (duration == 0) {
            return;
        }
        
        timer = setInterval(function(){
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
        },duration);
    }

    function deleteNotDigits(str) {
        return +str.replace(/[^\d\.]/g, '');
    }

    makeTimer(duration);
}

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, closeSelector, modalSelector) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute(closeSelector) == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });
}

slider({
    container: '.gallery_slider',
    wrapper: '.gallery_slider_wrapper',
    field: '.gallery_slider_inner',
    slide: '.gallery_slide',
    indicatorsSelector: 'gallery_slider_indicators',
    nextArrow: '.gallery_slider_next',
    prevArrow: '.gallery_slider_prev',
    duration: 3000,
});

modal('[data-modal]', 'data-close', '.consult');
modal('[data-modal-2]', 'data-close', '.roulette');
