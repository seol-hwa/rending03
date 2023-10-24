//header setting
const listIndex = 3;
const pageIndex = 3;

//pc
const gnbList = document.querySelector('.gnb-box__gnb-list');

gnbList.children[listIndex].classList.add('active');
subList[listIndex].children[pageIndex].children[0].classList.add('active');

const activeSubList = document.querySelector('.gnb-box__gnb-list .active .gnb-list__sub-list');
const j = activeSubList.childElementCount;

activeSubList.style.height = subHeight * j + 'px';

//mobile
const moGnbList = document.querySelector('.gnb-box__mo-gnb-list');

moGnbList.children[listIndex].classList.add('active');
moSubList[listIndex].children[pageIndex].children[0].classList.add('active');

const activeMoSubList = document.querySelector('.gnb-box__mo-gnb-list .active .gnb-list__mo-sub-list');
const j2 = activeMoSubList.childElementCount;

activeMoSubList.style.height = moSubHeight * j2 + 'px';
//header setting end

//main

//tabs
const navBtn=document.querySelectorAll('.nav-tabs .nav-link');
const textBox=document.querySelectorAll('.nav-tabs .tab-box');
const navBtn2=document.querySelectorAll('.nav-fill .nav-link');
const textBox2=document.querySelectorAll('.nav-fill .tab-box');

navBtn.forEach((btn, index)=>{
    btn.addEventListener('click',function(){
        navBtn.forEach(all=>{
            all.classList.remove('active');
        });
        this.classList.add('active');
        textBox.forEach(all=>{
            all.classList.remove('active');
        });
        textBox[index].classList.add('active');
    });
});

navBtn2.forEach((btn, index)=>{
    btn.addEventListener('click',function(){
        navBtn2.forEach(all=>{
            all.classList.remove('active');
        });
        this.classList.add('active');
        textBox2.forEach(all=>{
            all.classList.remove('active');
        });
        textBox2[index].classList.add('active');
    });
});

//accodion
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