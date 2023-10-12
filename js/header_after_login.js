const headerSide=document.querySelector('.side-menu__header');

headerSide.innerHTML=`
<div class="header__top pt-18 pb-18 pl-24 pr-24 d-flex">
            <h1>
                <a href="#" class="logo font-24-b">99 performance</a>
            </h1>
            <div class="mobile-menu__btn">
                <button class="btn__open">
                    <i class="xi-bars xi-2x"></i>
                </button>
            </div>
        </div>
        <div class="header__side">
            <div class="profile__info-wrap pt-27 pb-27 pl-15 pr-27 d-flex">
                <div class="info-wrap__left pr-9">
                    <div class="left__img-box"></div>
                </div>
                <div class="info-wrap__right">
                    <div class="right__name-box mb-9">
                        <p class="name-box__my-name font-16-b">99performance</p>
                    </div>
                    <div class="right__point-box">
                        <p class="point-box__total-point font-14-b">
                            ₩ <span>0</span>
                        </p>
                    </div>
                </div>
            </div>
            <nav class="side__gnb-box">
                <ul class="gnb-box__gnb-list">
                    <li class="pt-6 pb-6">
                        <button class="gnb-list__main font-18-b pt-18 pb-18 pl-24 pr-21 d-flex">상품정보
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__sub-list">
                            <li>
                                <a href="regular_order.html" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">상품선택</a>
                            </li>
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">자동상품</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="gnb-list__main font-18-b pt-18 pb-18 pl-24 pr-21 d-flex">솔루션
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__sub-list">
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">프로그램</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="gnb-list__main font-18-b pt-18 pb-18 pl-24 pr-21 d-flex">내역
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__sub-list">
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">상품내역</a>
                            </li>
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">처리결과</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="gnb-list__main font-18-b pt-18 pb-18 pl-24 pr-21 d-flex">마이페이지
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__sub-list">
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">계정등록</a>
                            </li>
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">포인트충전</a>
                            </li>
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">1:1문의</a>
                            </li>
                            <li>
                                <a href="#" class="sub-list__sub font-16 pt-15 pb-15 pl-24 pr-21">FAQ</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header__mobile-side-bg"></div>
        <div class="header__mobile-side">
            <div class="profile__info-wrap pt-18 pb-18 pl-15 pr-27 d-flex">
                <div class="info-wrap__left pr-9">
                    <div class="left__img-box"></div>
                </div>
                <div class="info-wrap__right">
                    <div class="right__name-box mb-9">
                        <p class="name-box__my-name font-16-b">99performance</p>
                    </div>
                    <div class="right__point-box">
                        <p class="point-box__total-point font-14-b">
                            ₩ <span>0</span>
                        </p>
                    </div>
                </div>
                <button class="btn__close pt-6 pb-6">
                    <i class="xi-close"></i>
                </button>
            </div>
            <nav class="mobile-side__gnb-box">
                <ul class="gnb-box__mo-gnb-list">
                    <li class="active pt-6 pb-6">
                        <button class="mo-gnb-list__main font-16-b pt-18 pb-18 pl-24 pr-21 d-flex">상품정보
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__mo-sub-list">
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21 active">상품선택</a>
                            </li>
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">자동상품</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="mo-gnb-list__main font-16-b pt-18 pb-18 pl-24 pr-21 d-flex">솔루션
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__mo-sub-list">
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">프로그램</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="mo-gnb-list__main font-16-b pt-18 pb-18 pl-24 pr-21 d-flex">내역
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__mo-sub-list">
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">상품내역</a>
                            </li>
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">처리결과</a>
                            </li>
                        </ul>
                    </li>
                    <li class="pt-6 pb-6">
                        <button class="mo-gnb-list__main font-16-b pt-18 pb-18 pl-24 pr-21 d-flex">마이페이지
                            <i class="xi-caret-up-min"></i>
                            <i class="xi-caret-down-min"></i>
                        </button>
                        <ul class="gnb-list__mo-sub-list">
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">계정등록</a>
                            </li>
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">포인트충전</a>
                            </li>
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">1:1문의</a>
                            </li>
                            <li>
                                <a href="#" class="mo-sub-list__sub font-14 pt-15 pb-15 pl-24 pr-21">FAQ</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
`

//pc
const main = document.querySelectorAll('.gnb-list__main');
const subList = document.querySelectorAll('.gnb-list__sub-list');
// const subHeight=subList[0].children[0].clientHeight;
const subHeight=46;


main.forEach(el => {
    el.addEventListener('click', function (e) {
        if (el.parentElement.classList.contains('active')) {
            if (el.nextElementSibling.classList.contains('gnb-list__sub-list')) {
                e.preventDefault();

                el.parentElement.classList.remove('active');
                el.nextElementSibling.style.height=0+'px';
            }
        }else{
            if (el.nextElementSibling.classList.contains('gnb-list__sub-list')) {
                e.preventDefault();
                let i=el.nextElementSibling.childElementCount;

                main.forEach(all=>{
                    all.parentElement.classList.remove('active');
                    all.nextElementSibling.style.height=0+'px';
                })
                el.parentElement.classList.add('active');
                el.nextElementSibling.style.height=subHeight*i+'px';
            }
        }
    });
});

//mobile
const body=document.querySelector('body');
const opBtn=document.querySelector('.btn__open');
const clBtn=document.querySelector('.btn__close');
const sideBg=document.querySelector('.header__mobile-side-bg');
const sideMenu=document.querySelector('.header__mobile-side');

const moMain = document.querySelectorAll('.mo-gnb-list__main');
const moSubList = document.querySelectorAll('.gnb-list__mo-sub-list');
// const moSubHeight=moSubList[0].children[0].clientHeight;
const moSubHeight=44;

opBtn.addEventListener('click',function(){
    sideBg.classList.add('active');
    sideMenu.classList.add('active');
    body.style.overflowY='hidden';
});
clBtn.addEventListener('click',function(){
    sideBg.classList.remove('active');
    sideMenu.classList.remove('active');
    body.style.overflowY='auto';
});

moMain.forEach(el => {
    el.addEventListener('click', function (e) {
        if (el.parentElement.classList.contains('active')) {
            if (el.nextElementSibling.classList.contains('gnb-list__mo-sub-list')) {
                e.preventDefault();

                el.parentElement.classList.remove('active');
                el.nextElementSibling.style.height=0+'px';
            }
        }else{
            if (el.nextElementSibling.classList.contains('gnb-list__mo-sub-list')) {
                e.preventDefault();
                let i2=el.nextElementSibling.childElementCount;

                moMain.forEach(all=>{
                    all.parentElement.classList.remove('active');
                    all.nextElementSibling.style.height=0+'px';
                })
                el.parentElement.classList.add('active');
                el.nextElementSibling.style.height=moSubHeight*i2+'px';
            }
        }
    });
    window.addEventListener('resize',function(){

    })
});
