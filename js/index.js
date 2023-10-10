//3rd section
const graph = document.querySelectorAll('.graph-stick');
const graphText = document.querySelectorAll('.graph-percent span');
const percent = [80, 95, 80, 90, 95];
const shame = [3240, 95, 2890, 12062, 2860];
// const shame=[162.0, 4.25, 144.5,603.1, 143.0];
let i = 0;
let j = 0;
let isPlay;

let swiperState;

const reviewCon = document.querySelector('.review-con');
const reviewTitle = document.querySelector('.review-con .review-title');
const slideItem = document.querySelectorAll('.review-box');
const itemWidth = (slideItem[0].offsetWidth) + parseInt(window.getComputedStyle(slideItem[0]).getPropertyValue('margin-right'));

//초기 css세팅
slideItem.forEach((el, index) => {
    el.style.transform = `translateX(${itemWidth * (slideItem.length - index)}px)`;
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
        // graphText.forEach((el, index) => {
        //     const chartTextAct = setInterval(() => {
        //         if (j <= shame[index]) {
        //             el.innerHTML = j;
        //             j++;
        //         }else{
        //             clearInterval(chartTextAct);
        //         }
        //     }, 20);
        // })

    }
}

window.addEventListener('scroll', function () {
    const scrollPoint = (window.innerHeight / 10) * 9;
    const reviewScroll = reviewTitle.getBoundingClientRect().top;
    //3rd section
    if (graph[0].getBoundingClientRect().top <= scrollPoint) {

        setTimeout(makeChart, 600);
    }

    //4th section
    if (reviewScroll <= scrollPoint) {
        let tl = gsap.timeline();

        tl.to(reviewTitle, {
            duration: 0.3,
            opacity: 1,
            y: 0,
        })

        slideItem.forEach(el => {
            gsap.to(el, {
                duration: 1,
                x: 0,
            })
        })

        //swiper js
        if (!swiperState) {
            swiperState = true;
            swiper = new Swiper(".mySwiper", {
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
        }
    }
});

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