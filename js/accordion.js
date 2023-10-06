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