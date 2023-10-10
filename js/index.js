//3rd section
const graph = document.querySelectorAll('.graph-stick');
const graphText = document.querySelectorAll('.graph-percent span');
const percent = [80, 95, 80, 90, 95];
let i = 0;
let j = 0;
let isPlay;

//4th section
let swiperState;
let swiper = new Swiper(".mySwiper", {
    speed: 5000,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    loopAdditionalSlides: 1,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    breakpoints: {
        1024: {
            slidesPerView: 2,
        },
        1400: {
            slidesPerView: 4,
        }
    }
});
swiper.autoplay.stop();

const reviewCon = document.querySelector('.review-con');
const reviewTitle = document.querySelector('.review-con .review-title');
const slideList = document.querySelector('.review-wrap');
const slideItem = document.querySelectorAll('.review-box');
const itemWidth = (slideItem[0].offsetWidth) + parseInt(window.getComputedStyle(slideItem[0]).getPropertyValue('margin-right'));

//5th section
const iconAcd = document.querySelectorAll('.accordion .accordion-item');
const iconAcdBtn = document.querySelectorAll('.accordion .accordion-head');
const iconAcdBody = document.querySelectorAll('.accordion .accordion-body');

const noIconAcd = document.querySelectorAll('.accordion-simple .accordion-item');
const noIconAcdBtn = document.querySelectorAll('.accordion-simple .accordion-head');
const noIconAcdBody = document.querySelectorAll('.accordion-simple .accordion-body');

const acdText = document.querySelectorAll('.accordion-text');
const acdBody = document.querySelectorAll('.accordion-body');

acdBody.forEach((item, index) => {
    item.style.height = acdText[index].offsetHeight + 'px';
});

function makeChart() {
    if (!isPlay) {
        isPlay = true;
        graph.forEach((el, index) => {
            const chartAct = setInterval(() => {
                if (i <= percent[index]) {
                    el.style.background = ' linear-gradient(to top,#3066E2 ' + i + '%, #C2DAF6 ' + i + '%)';
                    i++;
                } else {
                    clearInterval(chartAct);
                }

            }, 20);
        })

    }
}

//3rd section counter
// CONFIG
let visibilityIds = ['#counters_1', '#counters_2', '#counters_3']; //must be an array, could have only one element
let counterClass = '.counter';
let defaultSpeed = 3000; //default value
//config end

function getVisibilityStatus() {
    elValFromTop = [];
    var windowHeight = $(window).height(),
        windowScrollValFromTop = $(this).scrollTop();

    visibilityIds.forEach(function (item, index) { //Call each class
        try { //avoid error if class not exist
            elValFromTop[index] = Math.ceil($(item).offset().top);
        } catch (err) {
            return;
        }
        // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
        //it should be in view and the event should fire, otherwise reverse any previously applied methods
        if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
            counter_init(item);
        }
    });
}

function counter_init(groupId) {
    let num, speed, direction, index = 0;
    $(counterClass).each(function () {
        num = $(this).attr('data-TargetNum');
        speed = $(this).attr('data-Speed');
        direction = $(this).attr('data-Direction');
        easing = $(this).attr('data-Easing');
        if (speed == undefined) speed = defaultSpeed;
        $(this).addClass('c_' + index); //add a class to recognize each counter
        doCount(num, index, speed, groupId, direction, easing);
        index++;
    });
}

function doCount(num, index, speed, groupClass, direction, easing) {
    let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
    if (easing == undefined) easing = "swing";
    $(className).animate({
        num
    }, {
        duration: +speed,
        easing: easing,
        step: function (now) {
            if (direction == 'reverse') {
                $(this).text(num - Math.floor(now));
            } else {
                $(this).text(Math.floor(now));
            }
        },
        complete: doCount
    });
}
//counter end

window.addEventListener('scroll', function () {
    const scrollPoint = (window.innerHeight / 10) * 9;
    const reviewScroll = reviewTitle.getBoundingClientRect().top;

    //3rd section
    if (graph[0].getBoundingClientRect().top <= scrollPoint) {
        setTimeout(makeChart, 600);
        getVisibilityStatus();
    }

    //4th section
    if (reviewScroll <= scrollPoint) {
        let tl = gsap.timeline();

        // tl.to(reviewTitle, {
        //     duration: 0.3,
        //     opacity: 1,
        //     y: 0,
        // })
        if (!swiperState) {
            swiperState = true;
            slideItem.forEach(el => {
                tl.to(el, {
                    duration: 0.2,
                    opacity: 1,
                })
            })
            //swiper js
            setTimeout(() => {
                swiper.autoplay.start();
            }, 300);
        }
    }
});

window.addEventListener('resize', function () {
    acdBody.forEach((item, index) => {
        item.style.height = acdText[index].offsetHeight + 'px';
    });
})
accordionAct(iconAcdBtn, iconAcd, iconAcdBody);
accordionAct(noIconAcdBtn, noIconAcd, noIconAcdBody);

function accordionAct(btn, item, body) {
    btn.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            if (item[index].classList.contains('active')) {
                item.forEach(all => {
                    all.classList.remove('active');
                })
                body.forEach(all => {
                    all.classList.add('none');
                })
            } else {
                item.forEach(all => {
                    all.classList.remove('active');
                })
                item[index].classList.add('active');
                body.forEach(all => {
                    all.classList.add('none');
                })
                body[index].classList.remove('none');
            }
        })
    })
}

//gsap
const visual_title = document.querySelectorAll('.visual__hid .hid__span');
const visual_btn = document.querySelectorAll('.visual-start a');

const service_title = document.querySelector('.service__title');

//1st section gsap
function visual() {
    let tl = gsap.timeline();

    tl.to(visual_title[0], {
        duration: 0.5,
        y: 0,
    }, '-=30%').to(visual_title[1], {
        duration: 0.5,
        y: 0,
    }, '-=30%').to(visual_title[2], {
        duration: 0.5,
        y: 0,
    }, '-=30%').to(visual_btn[0], {
        duration: 0.5,
        y: 0,
    }, '-=30%').to(visual_btn[1], {
        duration: 0.5,
        y: 0,
    }, '-=30%')
}
visual();

//2nd~ section gsap
// window.addEventListener('scroll',function(){
//     let scrPoint=
// })