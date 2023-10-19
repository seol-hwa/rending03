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

//pagenation
const navLength = navBtn.length;
const tabBox = document.querySelectorAll('.tab-box');
const pageList = document.querySelectorAll('.pd-page-list');
const pageWrap = document.querySelectorAll('.pd-page-wrap');

//pagenation 목록에 따라 갯수 추가
for (let navNum = 0; navNum < navLength; navNum++) {
    const trLength = Math.ceil(tabBox[navNum].querySelectorAll('.tbody-tr').length / 10);//추가할 li의 갯수

    for (let liNum = 0; liNum < trLength; liNum++) {
        const pageListLi = document.createElement('li');
        const pageButton = document.createElement('button');
        const pageText = document.createTextNode(`${liNum + 1}`);
        pageList[navNum].appendChild(pageListLi);
        pageListLi.appendChild(pageButton);
        pageButton.appendChild(pageText);
        pageButton.classList.add('pd-page');
        pageButton.classList.add('pd-pagenation-btn');

    }
}
const pageItems = document.querySelectorAll('.pd-page-list li');
const pageMove = pageItems[0].clientWidth;//pagenation li 하나의 width값

for (let navNum = 0; navNum < navLength; navNum++) {
    const pageListWidth = (pageList[navNum].childElementCount * pageMove);

    pageWrap[navNum].style.width = pageListWidth - 5 + 'px';//pagenation li 갯수에 따른 width 설정
    pageList[navNum].style.left = 0 + 'px';//pagenation list left 초기값
}

for (let navNum = 0; navNum < navLength; navNum++) {
    const trLength = Math.ceil(tabBox[navNum].querySelectorAll('.tbody-tr').length / 10);//추가할 li의 갯수
    const pagenation = tabBox[navNum].querySelectorAll('.pd-page');
    const tr = tabBox[navNum].querySelectorAll('.tbody-tr');
    const prevBtn = tabBox[navNum].querySelector('.prev-page');
    const nextBtn = tabBox[navNum].querySelector('.next-page');
    let showNum;//보여줄 pagenation의 갯수

    if(window.matchMedia('(max-width:500px)').matches){
        //3개
        showNum=3;
    }else if(window.matchMedia('(max-width:1024px)').matches){
        //5개
        showNum=5;
    }else{
        //10개
        showNum=10;
    }
    
    let listLeft = 0;
    let endPoint=-((pageList[navNum].childElementCount-showNum) * pageMove);

    pageList[navNum].style.left = 0 + 'px';
    pageList[navNum].querySelectorAll('.pd-pagenation-btn')[0].classList.add('active');

    if(pageList[navNum].childElementCount<=showNum){
        //page의 갯수가 사이즈별로 10, 5, 3개 보다 적을때
        nextBtn.style.color = '#BBB';
    }else{
        nextBtn.style.color = '#000';
    }

    nextBtn.addEventListener('click', function () {
        if (parseInt(pageList[navNum].style.left) <= endPoint) {
            listLeft = endPoint;
            if(pageList[navNum].childElementCount<=showNum){
                listLeft = 0;
            }
        } else {
            listLeft -= pageMove;
        }
        pageList[navNum].style.left = listLeft + 'px';

        if(pageList[navNum].childElementCount>showNum){
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
        if (parseInt(pageList[navNum].style.left) >= 0) {
            listLeft = 0;
        } else {
            listLeft += pageMove;
        }
        pageList[navNum].style.left = listLeft + 'px';

        if(pageList[navNum].childElementCount>showNum){
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
            for (let z = liNum * 10; z <= ((liNum + 1) * 10) - 1; z++) {
                tr[z].classList.add('active');
            }
        });
    }
}