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
//20231018추가
const navLength = navBtn.length;
const tabBox = document.querySelectorAll('.tab-box');
const pageList = document.querySelectorAll('.pd-page-list');
const pageWrap = document.querySelectorAll('.pd-page-wrap');

for (let navNum = 0; navNum < navLength; navNum++) {
    const trLength = Math.ceil(tabBox[navNum].querySelectorAll('.tbody-tr').length / 10);

    // pageWrap[navNum].style.width = (pageMove * trLength) - 5 + 'px';

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
const pageMove = pageItems[0].clientWidth;
// console.log(element);
//20231018추가 끝

const prevBtn = document.querySelectorAll('.prev-page');
const nextBtn = document.querySelectorAll('.next-page');
// const pageList = document.querySelectorAll('.pd-page-list');
// const tr = document.querySelectorAll('.tbody-tr');
// const trLength = Math.ceil(tr.length / 10);
// for (let pageChildI = 1; pageChildI <= trLength; pageChildI++) {
//     const pageListLi = document.createElement('li');
//     const pageButton = document.createElement('button');
//     const pageText = document.createTextNode(`${pageChildI}`);
//     pageList[0].appendChild(pageListLi);
//     pageListLi.appendChild(pageButton);
//     pageButton.appendChild(pageText);
//     pageButton.classList.add('pd-page');
//     pageButton.classList.add('pd-pagenation-btn');
// }
const pagenation = document.querySelectorAll('.pd-page');
// const pageItems = document.querySelectorAll('.pd-page-list li');
// const pageMove = pageItems[0].clientWidth;
// const pageWrap = document.querySelectorAll('.pd-page-wrap');

// let pageItemsHidNum;
// if (window.matchMedia('(max-width:500px)').matches) {
//     pageItemsHidNum = trLength - 3;
// } else if (window.matchMedia('(max-width:1024px)').matches) {
//     pageItemsHidNum = trLength - 5;
// } else {
//     pageItemsHidNum = trLength - 10;
// }

// pageWrap[0].style.width = (pageMove * trLength) - 5 + 'px';
// pagenation[0].classList.add('active');
// pageList[0].style.left = 0 + 'px';
// let listLeft = 0;


// pagenation.forEach((el, i) => {
//     el.addEventListener('click', function () {
//         pagenation.forEach(all => {
//             all.classList.remove('active');
//         })
//         el.classList.add('active');

//         tr.forEach(all => {
//             all.classList.remove('active');
//         })
//         for (let z = i * 10; z <= ((i + 1) * 10) - 1; z++) {
//             tr[z].classList.add('active');
//         }
//     });
// });

//20231018수정
nextBtn.forEach((el, i) => {
    el.addEventListener('click', function () {
        if (parseInt(pageList[i].style.left) <= -(pageItemsHidNum * pageMove)) {
            listLeft = -(pageItemsHidNum * pageMove);
        } else {
            listLeft -= pageMove;
        }
        pageList[i].style.left = listLeft + 'px';

        if (listLeft <= -(pageItemsHidNum * pageMove)) {
            el.style.color = '#BBB';
        } else {
            prevBtn[i].style.color = '#000';
            el.style.color = '#000';
        }
    })
})
//20231018수정 끝

// nextBtn.addEventListener('click', function () {
//     if (parseInt(pageList.style.left) <= -(pageItemsHidNum * pageMove)) {
//         listLeft = -(pageItemsHidNum * pageMove);
//     } else {
//         listLeft -= pageMove;
//     }
//     pageList.style.left = listLeft + 'px';

//     if (listLeft <= -(pageItemsHidNum * pageMove)) {
//         nextBtn.style.color = '#BBB';
//     } else {
//         prevBtn.style.color = '#000';
//         nextBtn.style.color = '#000';
//     }
// })

//20231018수정
// prevBtn.forEach((el, i) => {
//     el.addEventListener('click', function () {
//         if (parseInt(pageList[i].style.left) >= 0) {
//             listLeft = 0;
//         } else {
//             listLeft += pageMove;
//         }
//         pageList[i].style.left = listLeft + 'px';

//         if (listLeft >= 0) {
//             el.style.color = '#BBB';
//         } else {
//             el.style.color = '#000';
//             nextBtn[i].style.color = '#000';
//         }
//     })
// })
//20231018수정 끝

// prevBtn.addEventListener('click', function () {
//     if (parseInt(pageList.style.left) >= 0) {
//         listLeft = 0;
//     } else {
//         listLeft += pageMove;
//     }
//     pageList.style.left = listLeft + 'px';

//     if (listLeft >= 0) {
//         prevBtn.style.color = '#BBB';
//     } else {
//         prevBtn.style.color = '#000';
//         nextBtn.style.color = '#000';
//     }
// })