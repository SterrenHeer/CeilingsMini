// let baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
// let newUrl = baseUrl + '?utm_source=yandex&utm_medium=cpc&utm_campaign=%7Bcampaign_name_lat%7D&utm_content=%7Bad_id%7D&utm_term=%7Bkeyword%7D';
// history.pushState(null, null, newUrl);

let utms_names = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_city'];

utms_names.forEach(name => {
    let utm_inputs = document.querySelectorAll(`.${name}`);
    utm_inputs.forEach(input => {
        if (name == 'utm_city') {
            input.value = document.querySelector('#city').textContent;
        } else {
            input.value = new URL(window.location.href).searchParams.get(`${name}`);
        }
    });
});            

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

let roulette_btn = document.querySelector('.roulette_btn');
let hundredth_btn = document.querySelector('.hundredth_form button');
if (localStorage.getItem('roulette') == 'send') {
    roulette_btn.classList.add('hide');
}
let hundredth = setTimeout(() => openModal('.hundredth'), 40000)
if (localStorage.getItem('hundredth') == 'send') {
    clearInterval(hundredth);
}

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

function deleteNotDigits(str) {
    return +str.replace(/[^\d\.]/g, '');
}

function congratulate() {
    let roulette_btn = document.querySelector('.roulette_btn');
    let roulette_image = document.querySelector('.roulette_image img');
    let roulette_row = document.querySelector('.roulette_row img');
    let roulette_result = document.querySelector('.roulette_result');
    let roulette_items = document.querySelectorAll('.roulette_content_item');
    let angle = '', result, rotate;

    const media = window.matchMedia('(max-width: 992px)');
    media.matches ? rotate = 180 : rotate = 90;
    roulette_row.style.transform = `rotate(${rotate}deg)`;

    roulette_image.style.animation = 'none';
    roulette_row.style.animation = 'none';
    
    let timer = setInterval(function() {
        angle = deleteNotDigits(angle) + 3 + 'deg';
        roulette_image.style.transform = `rotate(${angle})`;
    }, 10);

    setTimeout(function(){
        roulette_btn.classList.add('hide');
        roulette_items[0].classList.add('hide');
        roulette_items[1].classList.remove('hide');
        clearInterval(timer);

        if (((deleteNotDigits(angle) - rotate) / 60) % 6 == 0 || ((deleteNotDigits(angle) - rotate) / 60) % 6 <= 0.5) {
            result = 1;
        } else {
            result = 7 - ((deleteNotDigits(angle) - rotate) / 60) % 6;
        }
    
        result = Math.round(result);
        roulette_result.value = result;
    }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
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
    width = Math.floor(deleteNotDigits(width)) + 'px';

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
            makeTimer(duration);
            changeActivity();
        });
    });

    window.addEventListener('resize', (e) => {
        width = window.getComputedStyle(slidesWrapper).width;
        width = Math.floor(deleteNotDigits(width)) + 'px';
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
		moveNext();
        makeTimer(duration);
	});

    prev.addEventListener("click", () => {
		movePrev();
        makeTimer(duration);
	});

    makeTimer(duration);

    function moveNext() {
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
    }

    function movePrev() {
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
    }
    
    function changeActivity() {
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
    }

    function makeTimer(duration){
        if (duration == 0) {
            return;
        }
        clearInterval(timer)
        timer = setInterval(moveNext(), duration);
    }

    let startX;
    let endX;

    const start = (e) => {
        startX = e.pageX || e.touches[0].pageX;	
    }

    const end = () => {
        if (endX < startX) {
            moveNext();
            makeTimer(duration);
        }  
        if (endX > startX) {
            movePrev();
            makeTimer(duration);
        }
    }

    const move = (e) => {
        e.preventDefault();
        endX = e.pageX || e.touches[0].pageX;
    }

    slidesField.addEventListener('mousedown', start);
    slidesField.addEventListener('touchstart', start);

    slidesField.addEventListener('mousemove', move);
    slidesField.addEventListener('touchmove', move);

    slidesField.addEventListener('mouseleave', end);
    slidesField.addEventListener('mouseup', end);
    slidesField.addEventListener('touchend', end);
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

$("form").submit(function (event) {
    event.preventDefault();
    let name = event.target.classList.value.slice(0, -5);
    let formData = new FormData(document.querySelector(`.${name}_form`));
    sendPhp(name, formData);
});

function sendPhp(name, data) {
    $.ajax({
        url: `./php/send_${name}.php`,
        type: 'POST',
        cache: false,
        data: data,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            $(`.${name}_form`).trigger('reset');
            setTimeout(() => {
                window.location.replace('http://naujos-lubos.lt/');
            }, 3000)
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
    prevArrow: '.gallery_slider_prev'
});

modal('[data-modal]', 'data-close', '.consult');
modal('[data-modal-2]', 'data-close', '.roulette');
