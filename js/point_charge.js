//header setting
const listIndex = 3;
const pageIndex = 1;

//pc
const gnbList = document.querySelector('.gnb-box__gnb-list');

gnbList.children[listIndex].classList.add('active');
subList[listIndex].children[pageIndex].children[0].classList.add('active');

const activeSubList = document.querySelector('.gnb-box__gnb-list .active .gnb-list__sub-list');
const j = activeSubList.childElementCount;

activeSubList.style.height = subHeight * j + 'px';

//mobile
const moGnbList=document.querySelector('.gnb-box__mo-gnb-list');

moGnbList.children[listIndex].classList.add('active');
moSubList[listIndex].children[pageIndex].children[0].classList.add('active');

const activeMoSubList=document.querySelector('.gnb-box__mo-gnb-list .active .gnb-list__mo-sub-list');
const j2=activeMoSubList.childElementCount;

activeMoSubList.style.height=moSubHeight*j2+'px';
//header setting end

//main
const outputBtn=document.querySelectorAll('.output-btn');
const inputPoint=document.querySelector('.input-point');
const payment=document.querySelector('.payment-won span');
const vat=document.querySelector('.vat-won span');
const total=document.querySelector('.totalcal__won span');
let ptValue;

outputBtn.forEach(el=>{
    el.addEventListener('click',function(e){
        e.preventDefault();

        ptValue=el.value;
        inputPoint.value=(parseInt(inputPoint.value.replace(/,/g, ''))+parseInt(ptValue)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        let inputPointValue=inputPoint.value;

        payment.innerHTML=parseInt(inputPointValue.replace(/,/g, '')).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        vat.innerHTML=parseInt((inputPointValue).replace(/,/g, '')/10).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        total.innerHTML=(parseInt(inputPointValue.replace(/,/g, ''))+parseInt((inputPointValue).replace(/,/g, '')/10)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
});

const chargeSubmit=document.querySelector('.charge-submit');
const popup=document.querySelector('.popup');

chargeSubmit.addEventListener('click',function(e){
    e.preventDefault();
    popup.classList.add('active');
})

//modal close
const background = document.querySelectorAll('.popup__bg');
const closeBtn = document.querySelectorAll('.popup__close-btn');
const cancleBtn = document.querySelectorAll('.popup__cancle-btn');
const checkBtn = document.querySelectorAll('.popup__check-btn');

background.forEach(bg => {
    bg.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup__bg')) {
            popup.classList.remove('active');
        }
    })
})
closeBtn.forEach(close => {
    closeModal(close);
})
cancleBtn.forEach(close => {
    closeModal(close);
})
checkBtn.forEach(check => {
    closeModal(check);
})

function closeModal(close) {
    close.addEventListener('click', function (e) {
        if (this.classList.contains('return-btn')) {
            e.preventDefault();
        }
        popup.classList.remove('active');
    })
}