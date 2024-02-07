const head = document.querySelector(".con-wrap__header2");

//nav_2
//pc
const nav2_main = document.querySelectorAll(".main-list__menu");
const nav2_mainlist = document.querySelector(".main-list");
const logo = document.querySelector(".logo");
const header_right = document.querySelectorAll(".pc-wrap__right a");
const nav2_open = document.querySelector(".nav-style-2 .mo-nav-open");

nav2_main.forEach((el) => {
  el.addEventListener("focus", function () {
    nav2_mainlist.classList.add("active");
  });
});
logo.addEventListener("focus", function () {
  nav2_mainlist.classList.remove("active");
});
header_right[0].addEventListener("focus", function () {
  nav2_mainlist.classList.remove("active");
});

window.addEventListener("scroll", function () {
  const prevScroll = window.scrollY;
  const visualSecHeight =
    document.querySelector(".visual-con").clientHeight - 50;
  // console.log(visualSecHeight);

  if (prevScroll > 0 && prevScroll <= visualSecHeight) {
    gsap.to(head, {
      duration: 0.3,
      backgroundColor: "rgba(255,255,255,0.8)",
    });
    gsap.to(logo, {
      duration: 0.3,
      color: "#3066E2",
    });
    nav2_main.forEach((el) => {
      gsap.to(el, {
        duration: 0.3,
        color: "#3066E2",
      });
    });
    gsap.to(header_right[0], {
      duration: 0.3,
      backgroundColor: "#3066E2",
      color: "#fff",
    });
    gsap.to(header_right[1], {
      duration: 0.3,
      color: "#3066E2",
    });
    gsap.to(nav2_open, {
      duration: 0.3,
      color: "#3066E2",
    });
  } else if (prevScroll > visualSecHeight) {
    gsap.to(head, {
      duration: 0.3,
      backgroundColor: "#3066E2",
    });
    gsap.to(logo, {
      duration: 0.3,
      color: "#fff",
    });
    nav2_main.forEach((el) => {
      gsap.to(el, {
        duration: 0.3,
        color: "#fff",
      });
    });
    gsap.to(header_right[0], {
      duration: 0.3,
      backgroundColor: "#fff",
      color: "#3066E2",
    });
    gsap.to(header_right[1], {
      duration: 0.3,
      color: "#fff",
    });
    
    gsap.to(nav2_open, {
      duration: 0.3,
      color: "#fff",
    });
  } else {
    gsap.to(head, {
      duration: 0.3,
      backgroundColor: "#fff",
    });
  }
});
//mobile
const nav2_close = document.querySelector(".mo-nav-wrap-2 .mo-nav-close");
const nav2_moWrap = document.querySelector(".mo-nav-wrap-2");
const nav2_subList = document.querySelectorAll(".mo-nav-wrap-2 .sub-list");

nav2_open.addEventListener("click", function () {
  nav2_moWrap.classList.add("active");
  document.querySelector("body").style.overflowY = "hidden";
});
nav2_close.addEventListener("click", function () {
  nav2_moWrap.classList.remove("active");
  document.querySelector("body").style.overflowY = "auto";
});

nav2_subList.forEach((sub) => {
  sub.previousElementSibling.addEventListener("click", function (e) {
    e.preventDefault();
    if (!this.classList.contains("active")) {
      sub.style.height =
        sub.children[0].offsetHeight * sub.children.length + "px";
      this.classList.add("active");
    } else {
      sub.style.height = 0;
      this.classList.remove("active");
    }
  });
});
