const effect = {
  init: function () {
    this.navigation();
    this.faq();
    this.owlCarousel();
    this.scroll();
    this.slide();
    this.scrollTop();
    this.videoPopup();
    this.wow();
    this.theme();
    this.load();
  },
  load: function () {
    let load = document.querySelector(".loading");
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    window.addEventListener("load", () => {
      setTimeout(() => {
        load.classList.add("loading--off");
        body.style.overflow = "auto";
      }, 3000);
    });
  },
  scroll: function () {
    let nav = document.querySelector(".nav");
    let head = document.querySelector(".head");
    let counter = document.querySelector(".counter");
    window.addEventListener("scroll", () => {
      let currentY = window.pageYOffset;
      if (nav) {
        let navHeight = nav.offsetHeight;
        if (currentY > navHeight) {
          nav.classList.add("nav-fixed");
        } else {
          nav.classList.remove("nav-fixed");
        }
      }
      if (head) {
        let buttonTop = document.querySelector(".scroll-top");
        let headHeight = head.offsetHeight;
        if (currentY > headHeight) {
          buttonTop.classList.add("scroll-top-show");
        } else {
          buttonTop.classList.remove("scroll-top-show");
        }
      }
      if (counter) {
        let counterToTop = counter.offsetTop;
        let heightCounter = counter.offsetHeight;
        if (currentY >= counterToTop - heightCounter * 3) {
          this.count();
        }
      }
    });
  },
  scrollTop: function () {
    let wrapper = document.querySelector(".wrapper");
    let buttonTop = document.querySelector(".scroll-top");
    let head = document.querySelector(".head");
    buttonTop.addEventListener("click", () => {
      wrapper.scrollIntoView({ behavior: "smooth" });
    });
  },
  navigation: function () {
    let navMenu = document.querySelector(".nav-container__menu");
    let bars = document.querySelector(".nav-container__bars");
    let plusChange = document.querySelectorAll(".sub-plus");
    let btnsShowSubMenu = document.querySelectorAll(
      ".nav-container__menu-link"
    );
    bars.addEventListener("click", showMenu);
    function showMenu() {
      navMenu.classList.toggle("show-menu");
      bars.classList.toggle("nav-container__bars--show");
      btnsShowSubMenu.forEach((btn) => {
        btn.addEventListener("click", showSubMenu);
      });
    }
    function showSubMenu() {
      let subMenu = this.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle("show-sub-menu");
      }
    }
    plusChange.forEach((plus) => {
      plus.parentElement.addEventListener("click", () => {
        let screenSize = document.querySelector(".wrapper").offsetWidth;
        if (screenSize < 992) {
          let subMenu = plus.parentElement.nextElementSibling;
          subMenu.addEventListener("transitionend", () => {
            let isMenu = subMenu.className.includes("show");
            if (isMenu) {
              plus.innerText = "-";
            } else {
              plus.innerText = "+";
            }
          });
        }
      });
      plus.parentElement.addEventListener("mousemove", () => {
        let screenSize = document.querySelector(".wrapper").offsetWidth;
        if (screenSize > 991) {
          plus.innerText = "-";
        }
      });
      plus.parentElement.addEventListener("mouseout", () => {
        let screenSize = document.querySelector(".wrapper").offsetWidth;
        if (screenSize > 991) {
          plus.innerText = "+";
        }
      });
    });
  },
  theme: function () {
    let buttonTheme = document.querySelector(".theme-btn");
    let themeTable = document.querySelector(".theme");
    let btnsChangeTheme = document.querySelectorAll(".theme__item");
    let themeTitles = document.querySelectorAll(".text-theme");
    let themeBgs = document.querySelectorAll(".bg-theme");
    let themeBtns = document.querySelectorAll(".button-theme");
    let themeNavigation = document.querySelectorAll(
      ".nav-container__menu-link"
    );
    let hoverColorTextTheme = document.querySelectorAll(".hover-theme-text");
    let hoverColorBgTheme = document.querySelectorAll(".hover-theme-bg");
    let themeLogos = document.querySelectorAll(".theme-logo");
    let featureCards = document.querySelectorAll(".feature__card");
    let featureCardsStyle2 = document.querySelectorAll(
      ".feature__card--style2"
    );
    let animationButton = document.querySelectorAll(".button--style-second");
    let monochromatics = [
      {
        "color-1": "#2575fc",
      },
      {
        "color-2": "#00c9ff",
      },
      {
        "color-3": "#ff512f;",
      },
      {
        "color-4": "#ee1f71",
      },
      {
        "color-5": "#05f8a1",
      },
      {
        "color-6": "#481ea7",
      },
    ];
    let gradients = [
      {
        "color-1": "#2575fc",
      },
      {
        "color-2":
          "linear-gradient(90deg, rgba(0,201,255,1) 0%, rgba(101,220,252,1) 80%)",
      },
      {
        "color-3":
          "linear-gradient(90deg, rgba(255,81,47,1) 0%, rgba(240,152,25,1) 80%)",
      },
      {
        "color-4":
          "linear-gradient(90deg, rgba(238,31,113,1) 0%, rgba(0,219,222,1) 80%);",
      },
      {
        "color-5":
          "linear-gradient(90deg, rgba(5,248,161,1) 0%, rgba(46,199,141,1) 80%);",
      },
      {
        "color-6":
          "linear-gradient(90deg, rgba(72,30,167,1) 0%, rgba(244,77,133,1) 80%);",
      },
    ];
    buttonTheme.addEventListener("click", showThemeTable);
    function showThemeTable() {
      themeTable.classList.toggle("theme-show");
    }
    btnsChangeTheme.forEach((btnChangeTheme, index) => {
      btnChangeTheme.setAttribute("data-style", `color-${index + 1}`);
      btnChangeTheme.setAttribute("data-logo", `${index + 1}`);
      btnChangeTheme.addEventListener("click", theme);
    });
    function theme() {
      let dataStyle = this.dataset.style;
      let dataImage = this.dataset.logo;
      btnsChangeTheme.forEach((btnsChangeTheme) => {
        btnsChangeTheme.classList.remove("selected");
      });
      this.classList.add("selected");
      displayTheme(dataStyle, dataImage);
    }
    function themeDefault() {
      let selected = document.querySelector(".selected");
      let dataStyle = selected.dataset.style;
      let dataImage = selected.dataset.logo;
      displayTheme(dataStyle, dataImage);
    }
    themeDefault();
    function displayTheme(dataStyle, dataImage) {
      monochromatics.forEach((monochromatic) => {
        let styles = Object.keys(monochromatic);
        if (styles[0] === dataStyle) {
          themeTitles.forEach((themeTitle) => {
            themeTitle.style.cssText = `color:${monochromatic[dataStyle]}`;
          });
          themeBgs.forEach((themeBg) => {
            themeBg.style.cssText = `background:${monochromatic[dataStyle]}`;
          });
          themeNavigation.forEach((itemNav) => {
            itemNav.addEventListener("mousemove", () => {
              itemNav.style.cssText = `color:${monochromatic[dataStyle]}`;
            });
            itemNav.addEventListener("mouseout", () => {
              itemNav.style.cssText = `color:#1c1d3e`;
            });
            let isNavItem = itemNav.className.includes("active");
            if (isNavItem === true) {
              itemNav.style.cssText = `color:${monochromatic[dataStyle]}`;
              itemNav.addEventListener("mouseout", () => {
                itemNav.style.cssText = `color:${monochromatic[dataStyle]}`;
              });
            }
          });
          animationButton.forEach((btn) => {
            let arrSpan = btn.childNodes;
            btn.addEventListener("mousemove", () => {
              arrSpan.forEach((span) => {
                span.style.cssText = `color:${monochromatic[dataStyle]}`;
              });
            });
            btn.addEventListener("mouseout", () => {
              arrSpan.forEach((span) => {
                span.style.cssText = ``;
              });
            });
          });
          hoverColorTextTheme.forEach((item) => {
            item.addEventListener("mousemove", () => {
              item.style.cssText = `color:${monochromatic[dataStyle]}; transition:.5s all`;
            });
            item.addEventListener("mouseout", () => {
              item.style.cssText = `transition:.5s all`;
            });
          });
          hoverColorBgTheme.forEach((item) => {
            item.addEventListener("mousemove", () => {
              item.style.cssText = `background:${monochromatic[dataStyle]}; transition:.5s all`;
            });
            item.addEventListener("mouseout", () => {
              item.style.cssText = `transition:.5s all`;
            });
          });
          if (featureCardsStyle2) {
            featureCardsStyle2.forEach((item) => {
              item.addEventListener("mousemove", () => {
                let borderCurrent = item.querySelector(
                  ".icon__border-animation"
                );
                borderCurrent.style.cssText = `border-color: ${monochromatic[dataStyle]}`;
              });
              item.addEventListener("mouseout", () => {
                let borderCurrent = item.querySelector(
                  ".icon__border-animation"
                );
                borderCurrent.style.cssText = ``;
              });
            });
          }
        }
      });
      gradients.forEach((gradient) => {
        let styles = Object.keys(gradient);
        if (styles[0] === dataStyle) {
          themeBtns.forEach((themeBtn) => {
            themeBtn.style.cssText = `background:${gradient[dataStyle]}`;
          });
          if (featureCards) {
            featureCards.forEach((featureCard) => {
              featureCard.addEventListener("mousemove", () => {
                let themeCard = featureCard.querySelector(
                  ".feature__card-theme"
                );
                if (themeCard) {
                  themeCard.style.cssText = `background:${gradient[dataStyle]}; transform:scale(1);`;
                }
              });
              featureCard.addEventListener("mouseout", () => {
                let themeCard = featureCard.querySelector(
                  ".feature__card-theme"
                );
                if (themeCard) {
                  themeCard.style.cssText = `background:${gradient[dataStyle]}; transform:scale(0);`;
                }
              });
            });
          }
        }
      });
      themeLogos.forEach((themeLogo) => {
        themeLogo.setAttribute("src", `./images/logo-theme-${dataImage}.png`);
      });
    }
  },
  slide: function () {
    let testimonial = document.querySelector(".testimonial");
    if (testimonial) {
      let itemSlide = document.querySelectorAll(".testimonial-slide__item");
      let dots = document.querySelectorAll(".testimonial-nav__button");
      let running = "finish";
      dots.forEach((dot, index) => {
        dot.setAttribute("data-testimonial", `${index}`);
        dot.addEventListener("click", dotsClick);
      });
      itemSlide[0].classList.add("testimonial-slide__item--active");
      function autoSlide() {
        if (running != "finish") {
          return;
        }
        running = "not finish";
        let indexActive = 0;
        let itemActive = document.querySelector(
          ".testimonial-slide__item--active"
        );
        for (
          indexActive;
          (itemActive = itemActive.previousElementSibling);
          indexActive++
        ) {}
        if (indexActive < itemSlide.length - 1) {
          itemSlide[indexActive].classList.add("left");
          itemSlide[indexActive].addEventListener("animationend", () => {
            itemSlide[indexActive].classList.remove("left");
            itemSlide[indexActive].classList.remove(
              "testimonial-slide__item--active"
            );
          });
          itemSlide[indexActive].nextElementSibling.classList.add("left");
          itemSlide[indexActive].nextElementSibling.classList.add(
            "testimonial-slide__item--active"
          );
          itemSlide[indexActive].nextElementSibling.addEventListener(
            "animationend",
            () => {
              itemSlide[indexActive].nextElementSibling.classList.remove(
                "left"
              );
              itemSlide[indexActive].nextElementSibling.classList.add(
                "testimonial-slide__item--active"
              );
            }
          );
          dots.forEach((dot) => {
            dot.classList.remove("testimonial-nav__button--active");
          });
          dots[indexActive].nextElementSibling.classList.add(
            "testimonial-nav__button--active"
          );
          running = "finish";
        } else {
          itemSlide[indexActive].classList.add("right");
          itemSlide[indexActive].addEventListener("animationend", () => {
            itemSlide[indexActive].classList.remove("right");
            itemSlide[indexActive].classList.remove(
              "testimonial-slide__item--active"
            );
          });
          dots.forEach((dot) => {
            dot.classList.remove("testimonial-nav__button--active");
          });
          dots[0].classList.add("testimonial-nav__button--active");
          itemSlide[0].classList.add("testimonial-slide__item--active");
          itemSlide[0].classList.add("right");
          itemSlide[0].addEventListener("animationend", () => {
            itemSlide[0].classList.remove("right");
            itemSlide[0].classList.add("testimonial-slide__item--active");
            running = "finish";
          });
        }
      }
      const time = setInterval(autoSlide, 2000);
      function dotsClick() {
        let isdot = this.className.includes("active");
        if (isdot === true) {
          return;
        }
        if (running != "finish") {
          return;
        }
        clearInterval(time);
        running = "not finish";
        let currentActive = document.querySelector(
          ".testimonial-nav__button--active"
        );
        let indexCurrentActive = currentActive.dataset.testimonial;
        dots.forEach((dot) => {
          dot.classList.remove("testimonial-nav__button--active");
        });
        this.classList.add("testimonial-nav__button--active");
        let indexNewActive = this.dataset.testimonial;
        if (indexNewActive > indexCurrentActive) {
          itemSlide[indexCurrentActive].classList.add("left");
          itemSlide[indexCurrentActive].addEventListener("animationend", () => {
            itemSlide[indexCurrentActive].classList.remove(
              "testimonial-slide__item--active"
            );
            itemSlide[indexCurrentActive].classList.remove("left");
          });
          itemSlide[indexNewActive].classList.add("left");
          itemSlide[indexNewActive].classList.add(
            "testimonial-slide__item--active"
          );
          itemSlide[indexNewActive].addEventListener("animationend", () => {
            itemSlide[indexNewActive].classList.add(
              "testimonial-slide__item--active"
            );
            itemSlide[indexNewActive].classList.remove("left");
            running = "finish";
          });
        } else {
          itemSlide[indexCurrentActive].classList.add("right");
          itemSlide[indexCurrentActive].addEventListener("animationend", () => {
            itemSlide[indexCurrentActive].classList.remove(
              "testimonial-slide__item--active"
            );
            itemSlide[indexCurrentActive].classList.remove("right");
          });
          itemSlide[indexNewActive].classList.add("right");
          itemSlide[indexNewActive].classList.add(
            "testimonial-slide__item--active"
          );
          itemSlide[indexNewActive].addEventListener("animationend", () => {
            itemSlide[indexNewActive].classList.add(
              "testimonial-slide__item--active"
            );
            itemSlide[indexNewActive].classList.remove("right");
            running = "finish";
          });
        }
      }
    }
  },
  count: function () {
    const count = document.querySelector(".counter");
    if (count) {
      let numbers = document.querySelectorAll(".count-number");
      let speed = 2000;
      numbers.forEach((number) => {
        const updateCount = () => {
          const target = +number.dataset.number;
          const currentCount = +number.innerText;
          const inc = target / speed;
          if (currentCount < target) {
            number.innerText = Math.ceil(currentCount + inc);
            setTimeout(updateCount, 1);
          } else {
            number.innerHTML = target;
          }
        };
        updateCount();
      });
    }
  },
  videoPopup: function () {
    let videoSection = document.querySelector(".video__box");
    if (videoSection) {
      let video = document.querySelector(".video__iframe");
      let overlay = document.querySelector(".overlay");
      let btnVideo = document.querySelector(".video-button");
      let btnClose = document.querySelector(".iframe-close");
      btnVideo.addEventListener("click", showVideo);
      btnClose.addEventListener("click", hideVideo);
      function showVideo() {
        let dataVideo = this.dataset.video;
        let iframe = document.querySelector(".iframe-video");
        iframe.setAttribute("src", `${dataVideo}`);
        video.classList.add("video__iframe--show");
        overlay.classList.add("overlay--show");
        window.addEventListener("keydown", (e) => {
          if (e.keyCode == 27) {
            hideVideo();
          }
        });
      }
      function hideVideo() {
        let iframe = document.querySelector(".iframe-video");
        iframe.setAttribute("src", "");
        video.classList.remove("video__iframe--show");
        overlay.classList.remove("overlay--show");
      }
    }
  },
  faq: function () {
    let faqSection = document.querySelector(".faq");
    if (faqSection) {
      let headsFAQ = faqSection.querySelectorAll(".faq__card-head");
      headsFAQ.forEach((headFAQ) => {
        headFAQ.addEventListener("click", showFAQ);
      });
      function showFAQ() {
        let isParentActive = this.parentElement.className.includes("active");
        if (isParentActive == true) {
          this.parentElement.classList.remove("faq__card--active");
          this.classList.remove("bg-theme");
          this.querySelector("span").innerText = "+";
        } else {
          let faqCards = document.querySelectorAll(".faq__card");
          faqCards.forEach((card) => {
            card.classList.remove("faq__card--active");
            card.querySelector("span").innerText = "+";
          });
          this.parentElement.classList.toggle("faq__card--active");
          this.querySelector("h6").classList.add(".bg-theme");
          this.querySelector("span").innerText = "-";
        }
      }
    }
  },
  wow: function () {
    new WOW().init();
  },
  owlCarousel: function () {
    function team() {
      let teamSection = document.querySelector(".team");
      if (teamSection) {
        if (teamSection.className.includes("style-1")) {
          $(".team--style-1__slide").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            },
          });
        } else if (teamSection.className.includes("style-2")) {
          $(".team--style-2__slide").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 2,
              },
            },
          });
        } else if (teamSection.className.includes("style-3")) {
          $(".team--style-1__slide").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            },
          });
        } else {
          return;
        }
      }
    }
    function blogCarousel() {
      let blogSection = document.querySelector(".blog--style-3");
      if (blogSection) {
        $(".blog-slide").owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          autoplay: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          },
        });
      }
    }
    blogCarousel();
    team();
  },
};
effect.init();
