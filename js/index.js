//3rd section
const graph = document.querySelectorAll('.graph-stick');
const graphText = document.querySelectorAll('.graph-percent span');
const percent = [80, 95, 80, 90, 95];
const shame = [3240, 95, 2890, 12062, 2860];
// const shame=[162.0, 4.25, 144.5,603.1, 143.0];
let i = 0;
let j = 0;
let isPlay;

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

    if (graph[0].getBoundingClientRect().top <= scrollPoint) {

        setTimeout(makeChart, 600);
    }
});

//5th section
const iconAcd = document.querySelectorAll('.accordion .accordion-item');
const iconAcdBtn = document.querySelectorAll('.accordion .accordion-head');
const iconAcdBody = document.querySelectorAll('.accordion .accordion-body');

const noIconAcd=document.querySelectorAll('.accordion-simple .accordion-item');
const noIconAcdBtn=document.querySelectorAll('.accordion-simple .accordion-head');
const noIconAcdBody=document.querySelectorAll('.accordion-simple .accordion-body');

const acdText = document.querySelectorAll('.accordion-text');
const acdBody= document.querySelectorAll('.accordion-body');

acdBody.forEach((item,index) => {
    item.style.height=acdText[index].offsetHeight+'px';
});

window.addEventListener('resize',function(){
    acdBody.forEach((item,index) => {
        item.style.height=acdText[index].offsetHeight+'px';
    });
})
accordionAct(iconAcdBtn, iconAcd, iconAcdBody);
accordionAct(noIconAcdBtn, noIconAcd, noIconAcdBody);

function accordionAct(btn, item, body){
    btn.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            if (item[index].classList.contains('active')) {
                item.forEach(all => {
                    all.classList.remove('active');
                })
                body.forEach(all=>{
                    all.classList.add('none');
                })
            } else {
                item.forEach(all => {
                    all.classList.remove('active');
                })
                item[index].classList.add('active');
                body.forEach(all=>{
                    all.classList.add('none');
                })
                body[index].classList.remove('none');
            }
        })
    })
}