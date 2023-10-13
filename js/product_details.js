//header setting
const listIndex = 2;
const pageIndex = 1;

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
const modalBtn = document.querySelectorAll('.open-modal');
const background = document.querySelectorAll('.popup__bg');
const closeBtn = document.querySelectorAll('.popup__close-btn');
// const cancleBtn=document.querySelectorAll('.popup__cancle-btn');
const checkBtn = document.querySelectorAll('.popup__check-btn');

modalBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        this.nextElementSibling.classList.add('active');
    })
})

//modal close
background.forEach(bg => {
    bg.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup__bg')) {
            modalBtn.forEach(all => {
                all.nextElementSibling.classList.remove('active');
            })
        }
    })
})
closeBtn.forEach(close => {
    closeModal(close);
})
// cancleBtn.forEach(close=>{
//     closeModal(close);
// })
checkBtn.forEach(check => {
    closeModal(check);
})

function closeModal(close) {
    close.addEventListener('click', function () {
        modalBtn.forEach(all => {
            all.nextElementSibling.classList.remove('active');
        })
    })
}

//pagenation
const pagenation = document.querySelectorAll('.pd-page');
const prevBtn = document.querySelector('.prev-page');
const nextBtn = document.querySelector('.next-page');
const pageList = document.querySelector('.pd-page-list');
const pageItems = document.querySelectorAll('.pd-page-list li');
const pageMove = pageItems[0].clientWidth;
// pageList.style.left=0+'px';

pagenation.forEach(el => {
    el.addEventListener('click', function () {
        pagenation.forEach(all => {
            all.classList.remove('active');
        })
        el.classList.add('active');
    });
});
prevBtn.addEventListener('click', function () {
    let pageLeft=pageList.style.left;

    pageLeft = (pageLeft-pageMove) + 'px';

    console.log(pageList.style.left);
})