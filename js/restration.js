//header setting
const listIndex = 3;
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

//pagenation
const pageList = document.querySelector('.pd-page-list');
const pageWrap = document.querySelector('.pd-page-wrap');

//pagenation 목록에 따라 갯수 추가
const trLength = Math.ceil(document.querySelectorAll('.tbody-tr').length / 5);//추가할 li의 갯수

for (let liNum = 0; liNum < trLength; liNum++) {
    const pageListLi = document.createElement('li');
    const pageButton = document.createElement('button');
    const pageText = document.createTextNode(`${liNum + 1}`);
    pageList.appendChild(pageListLi);
    pageListLi.appendChild(pageButton);
    pageButton.appendChild(pageText);
    pageButton.classList.add('pd-page');
    pageButton.classList.add('pd-pagenation-btn');
}

const pageItems = document.querySelectorAll('.pd-page-list li');
const pageMove = pageItems[0].clientWidth;//pagenation li 하나의 width값

const pageListWidth = (pageList.childElementCount * pageMove);

pageWrap.style.width = pageListWidth - 5 + 'px';//pagenation li 갯수에 따른 width 설정
pageList.style.left = 0 + 'px';//pagenation list left 초기값

const pagenation = document.querySelectorAll('.pd-page');
const tr = document.querySelectorAll('.tbody-tr');
const prevBtn = document.querySelector('.prev-page');
const nextBtn = document.querySelector('.next-page');
let showNum;//보여줄 pagenation의 갯수

if (window.matchMedia('(max-width:500px)').matches) {
    //3개
    showNum = 3;
} else if (window.matchMedia('(max-width:1024px)').matches) {
    //5개
    showNum = 5;
} else {
    //10개
    showNum = 10;
}

let listLeft = 0;
let endPoint = -((pageList.childElementCount - showNum) * pageMove);

pageList.style.left = 0 + 'px';
pageList.querySelectorAll('.pd-pagenation-btn')[0].classList.add('active');

if (pageList.childElementCount <= showNum) {
    //page의 갯수가 사이즈별로 10, 5, 3개 보다 적을때
    nextBtn.style.color = '#BBB';
} else {
    nextBtn.style.color = '#000';
}

nextBtn.addEventListener('click', function () {
    if (parseInt(pageList.style.left) <= endPoint) {
        listLeft = endPoint;
        if (pageList.childElementCount <= showNum) {
            listLeft = 0;
        }
    } else {
        listLeft -= pageMove;
    }
    pageList.style.left = listLeft + 'px';

    if (pageList.childElementCount > showNum) {
        prevBtn.style.color = '#000';
        if (listLeft <= endPoint) {
            //pagelist의 끝번호가 보일때
            nextBtn.style.color = '#BBB';
        } else {
            nextBtn.style.color = '#000';
        }
    }

});
prevBtn.addEventListener('click', function () {
    if (parseInt(pageList.style.left) >= 0) {
        listLeft = 0;
    } else {
        listLeft += pageMove;
    }
    pageList.style.left = listLeft + 'px';

    if (pageList.childElementCount > showNum) {
        nextBtn.style.color = '#000';
        if (listLeft >= 0) {
            //pagelist의 첫번호가 보일때
            prevBtn.style.color = '#BBB';
        } else {
            prevBtn.style.color = '#000';
        }
    }
});

for (let liNum = 0; liNum < trLength; liNum++) {

    pagenation[liNum].addEventListener('click', function () {
        pagenation.forEach(all => {
            all.classList.remove('active');
        })
        pagenation[liNum].classList.add('active');

        tr.forEach(all => {
            all.classList.remove('active');
        })
        for (let z = liNum * 5; z <= ((liNum + 1) * 5) - 1; z++) {
            tr[z].classList.add('active');
        }
    });
}

//modal
const addBtn = document.querySelector('.add-acc-btn');
const editBtn = document.querySelectorAll('.acc-edit-btn');
const addPop = document.querySelector('.pop-add-acc');
const editPop = document.querySelectorAll('.pop-edit-acc');
const closeBtn = document.querySelectorAll('.popup__close-btn');
const checkBtn = document.querySelectorAll('.popup__check-btn');
const cancleBtn = document.querySelectorAll('.popup__cancle-btn');
const background = document.querySelectorAll('.popup__bg');

addBtn.addEventListener('click', function () {
    document.querySelector('body').style.overflowY = 'hidden';
    addPop.classList.add('active');
});
editBtn.forEach((el,index)=>{
    el.addEventListener('click',function(){
        editPop[index].classList.add('active');
    });
});
//modal close
background.forEach(bg => {
    bg.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup__bg')) {
            document.querySelector('body').style.overflowY = 'auto';

            addPop.classList.remove('active');
            editPop.forEach(el=>{
                el.classList.remove('active');
            });
        }
    });
});
closeBtn.forEach(close => {
    closeModal(close);
});
cancleBtn.forEach(close => {
    closeModal(close);
});
checkBtn.forEach(check => {
    closeModal(check);
});

function closeModal(close) {
    close.addEventListener('click', function () {
        document.querySelector('body').style.overflowY = 'auto';
        addPop.classList.remove('active');
        editPop.forEach(el=>{
            el.classList.remove('active');
        });
    });
}