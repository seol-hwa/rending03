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
const moGnbList=document.querySelector('.gnb-box__mo-gnb-list');

moGnbList.children[listIndex].classList.add('active');
moSubList[listIndex].children[pageIndex].children[0].classList.add('active');

const activeMoSubList=document.querySelector('.gnb-box__mo-gnb-list .active .gnb-list__mo-sub-list');
const j2=activeMoSubList.childElementCount;

activeMoSubList.style.height=moSubHeight*j2+'px';
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

//pagenation
const prevBtn = document.querySelector('.prev-page');
const nextBtn = document.querySelector('.next-page');
const pageList = document.querySelector('.pg-page-list');
const tr = document.querySelectorAll('.tbody-tr');
const trLength = Math.ceil(tr.length / 10);
for (let pageChildI = 1; pageChildI <= trLength; pageChildI++) {
    const pageListLi = document.createElement('li');
    const pageButton = document.createElement('button');
    const pageText = document.createTextNode(`${pageChildI}`);
    pageList.appendChild(pageListLi);
    pageListLi.appendChild(pageButton);
    pageButton.appendChild(pageText);
    pageButton.classList.add('pg-page');
    pageButton.classList.add('pg-pagenation-btn');
}
const pagenation = document.querySelectorAll('.pg-page');
const pageItems = document.querySelectorAll('.pg-page-list li');
const pageMove = pageItems[0].clientWidth;
const pageWrap = document.querySelector('.pg-page-wrap');

let pageItemsHidNum;
if (window.matchMedia('(max-width:500px)').matches) {
    pageItemsHidNum = trLength - 3;
} else if (window.matchMedia('(max-width:1024px)').matches) {
    pageItemsHidNum = trLength - 5;
} else {
    pageItemsHidNum = trLength - 10;
}

pageWrap.style.width = (pageMove * trLength) - 5 + 'px';
pagenation[0].classList.add('active');
pageList.style.left = 0 + 'px';
let listLeft = 0;


pagenation.forEach((el, i) => {
    el.addEventListener('click', function () {
        pagenation.forEach(all => {
            all.classList.remove('active');
        })
        el.classList.add('active');

        tr.forEach(all => {
            all.classList.remove('active');
        })
        for (let z = i * 10; z <= ((i + 1) * 10) - 1; z++) {
            tr[z].classList.add('active');
        }
    });
});
nextBtn.addEventListener('click', function () {
    if (parseInt(pageList.style.left) <= -(pageItemsHidNum * pageMove)) {
        listLeft = -(pageItemsHidNum * pageMove);
    } else {
        listLeft -= pageMove;
    }
    pageList.style.left = listLeft + 'px';

    if (listLeft <= -(pageItemsHidNum * pageMove)) {
        nextBtn.style.color = '#BBB';
    } else {
        prevBtn.style.color = '#000';
        nextBtn.style.color = '#000';
    }
})
prevBtn.addEventListener('click', function () {
    if (parseInt(pageList.style.left) >= 0) {
        listLeft = 0;
    } else {
        listLeft += pageMove;
    }
    pageList.style.left = listLeft + 'px';

    if (listLeft >= 0) {
        prevBtn.style.color = '#BBB';
    } else {
        prevBtn.style.color = '#000';
        nextBtn.style.color = '#000';
    }
})