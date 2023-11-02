//header setting
const listIndex = 0;
const pageIndex = 0;

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
const navBtn = document.querySelectorAll('.nav-tabs .nav-link');
const textBox = document.querySelectorAll('.nav-tabs .tab-box');

navBtn.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        navBtn.forEach(all => {
            all.classList.remove('active');
        })
        this.classList.add('active');
        textBox.forEach(all => {
            all.classList.remove('active');
        })
        textBox[index].classList.add('active');
    });
});

const select = document.querySelectorAll('.text-change-select');
const preText = document.querySelectorAll('.pre-box');

select.forEach((el, index) => {
    el.addEventListener('change', function () {
        const val = el.options[el.selectedIndex].value;
        const child = preText[index].children;

        for (let i = 0; i < child.length; i++) {
            child[i].classList.remove('active');
        }
        preText[index].children[val].classList.add('active');
    })
})

const year=new Date().getFullYear();
const month=('0' + (new Date().getMonth() + 1)).slice(-2);
const day=('0' + new Date().getDate()).slice(-2);
const inputDate=document.querySelectorAll('input[type=date]');

inputDate.forEach(el=>{
    el.setAttribute('min',`${year}-${month}-${day}`);
})

//submit btn
const modalBtn = document.querySelectorAll('.open-modal');
const background = document.querySelectorAll('.popup__bg');
// const closeBtn = document.querySelectorAll('.popup__close-btn');
const cancleBtn = document.querySelectorAll('.popup__cancle-btn');
const checkBtn = document.querySelectorAll('.popup__check-btn');
const popup = document.querySelectorAll('.popup');

const possessionNodes = document.querySelectorAll('.point-box__total-point span');
const possessionPoint = parseInt(possessionNodes[0].innerText.replace(/,/g, ''));
const orderNodes = document.querySelectorAll('.order-num');

modalBtn.forEach((btn, index) => {
    btn.addEventListener('click', function () {
    document.querySelector('body').style.overflowY = 'hidden';
    if (possessionPoint < parseInt(orderNodes[index].innerText.replace(/,/g, ''))) {
            //point가 부족할 때
            this.nextElementSibling.classList.add('active');
        } else {
            //point가 부족하지 않을 때
            this.nextElementSibling.nextElementSibling.classList.add('active');
        }
    })
})

//modal close
background.forEach(bg => {
    bg.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup__bg')) {
    document.querySelector('body').style.overflowY = 'auto';
    popup.forEach(all => {
                all.classList.remove('active');
            })
        }
    })
})
// closeBtn.forEach(close => {
//     closeModal(close);
// })
cancleBtn.forEach(close => {
    closeModal(close);
})
checkBtn.forEach(check => {
    closeModal(check);
})

function closeModal(close) {
    close.addEventListener('click', function (e) {
    document.querySelector('body').style.overflowY = 'auto';
    if (this.classList.contains('return-btn')) {
            e.preventDefault();
        }
        popup.forEach(all => {
            all.classList.remove('active');
        })
    })
}