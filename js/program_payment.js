//header setting
const listIndex = 1;
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

//modal
const checkBox = document.querySelectorAll('.pg-check-box input');
const popupComplete = document.querySelector('.popup_complete');
const popupAgree = document.querySelector('.popup_agree');
const popupRequest = document.querySelector('.popup_request');
const modalBtn = document.querySelectorAll('.pg-payment-btn');
const background = document.querySelectorAll('.popup__bg');
const cancleBtn = document.querySelectorAll('.popup__cancle-btn');
const checkBtn = document.querySelectorAll('.popup__check-btn');
const popup = document.querySelectorAll('.popup');

const orderNodes = document.querySelectorAll('.pg-total-money span');//결제금액

modalBtn.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        if (checkBox[index].checked) {
            //결제동의 체크 시
            if (parseInt(orderNodes[index].innerText.replace(/,/g, '')) > 0) {
                //총 결제금액이 0 보다 클때
                popupRequest.classList.add('active');
            }else{
                popupComplete.classList.add('active');
            }
        } else {
            popupAgree.classList.add('active');
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