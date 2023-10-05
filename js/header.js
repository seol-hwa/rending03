const head=document.querySelector('.con-wrap__header2');

head.innerHTML=`
<div class="inner">
            <div class="d-flex header2__pc-wrap">
                <h1>
                    <a href="" class="logo">99</a>
                </h1>
                <nav class="nav-style-2">
                    <ul class="main-list">
                        <li>
                            <a href="#" class="main-list__menu">99몬스터</a>
                        </li>
                        <li>
                            <a href="#" class="main-list__menu">프로그램 소개</a>
                        </li>
                        <li>
                            <a href="#" class="main-list__menu">프로그램</a>
                            <ul class="sub-list">
                                <li><a href="" class="sub-list__menu">인스타그램</a></li>
                                <li><a href="" class="sub-list__menu">N사</a></li>
                                <li><a href="" class="sub-list__menu">블로그</a></li>
                                <li><a href="" class="sub-list__menu">T사</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="main-list__menu">업데이트 목록</a>
                        </li>
                        <li>
                            <a href="#" class="main-list__menu">고객센터</a>
                            <ul class="sub-list">
                                <li><a href="" class="sub-list__menu">공지사항</a></li>
                                <li><a href="" class="sub-list__menu">1:1 문의</a></li>
                            </ul>
                        </li>
                    </ul>
                    <button class="mo-nav-open" value="전체메뉴">
                        <i class="xi-bars xi-2x"></i>
                    </button>
                </nav>
                <div class="pc-wrap__right">
                    <a href="" class="pr-15 pl-15 pt-3 pb-3">시작하기</a>
                    <a href="">회원가입</a>
                </div>
            </div>
            <div class="mo-nav-wrap-2">
                <div class="mo-nav-wrap__mo-nav-box">
                    <div class="mo-nav-box__header">
                        <ul class="header__info">
                            <li><a href="">시작하기</a></li>
                            <li><a href="">회원가입</a></li>
                        </ul>
                        <button class="mo-nav-close">
                            <i class="xi-close xi-2x"></i>
                        </button>
                    </div>
                    <ul class="mo-main-list">
                        <li><a href="" class="mo-main-list__menu">99몬스터</a>
                        </li>
                        <li><a href="" class="mo-main-list__menu">프로그램 소개</a>
                        </li>
                        <li><a href="" class="mo-main-list__menu">프로그램<i class="xi-angle-down"></i></a>
                            <ul class="sub-list">
                                <li><a href="" class="sub-list__menu">인스타그램</a></li>
                                <li><a href="" class="sub-list__menu">N사</a></li>
                                <li><a href="" class="sub-list__menu">블로그</a></li>
                                <li><a href="" class="sub-list__menu">T사</a></li>
                            </ul>
                        </li>
                        <li><a href="" class="mo-main-list__menu">업데이트 목록</a>
                        </li>
                        <li><a href="" class="mo-main-list__menu">고객센터<i class="xi-angle-down"></i></a>
                            <ul class="sub-list">
                                <li><a href="" class="sub-list__menu">공지사항</a></li>
                                <li><a href="" class="sub-list__menu">1:1 문의</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
`
//nav_2
const nav2_open=document.querySelector('.nav-style-2 .mo-nav-open');
const nav2_close=document.querySelector('.mo-nav-wrap-2 .mo-nav-close');
const nav2_moWrap=document.querySelector('.mo-nav-wrap-2');
const nav2_subList=document.querySelectorAll('.mo-nav-wrap-2 .sub-list');

nav2_open.addEventListener('click',function(){
    nav2_moWrap.classList.add('active');
})
nav2_close.addEventListener('click',function(){
    nav2_moWrap.classList.remove('active');
})

nav2_subList.forEach(sub=>{
    sub.previousElementSibling.addEventListener('click',function(e){
        e.preventDefault();
        if (!this.classList.contains('active')){
            sub.style.height=(sub.children[0].offsetHeight * sub.children.length)+'px';
            this.classList.add('active');
        }else{
            sub.style.height=0;
            this.classList.remove('active');
        }
        
    })
})