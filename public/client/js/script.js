AOS.init(); // aos js animation

// swiperjs cho chính sách (trang chủ dưới section 1)
const swiperPolicy = new Swiper(".swiper__policy", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,

    // responsive swiperjs
    breakpoints: {
        // min-width: 1198, max-width: ...
        1198.98: {
          slidesPerView: 4,
          spaceBetween: 20
        },

        991.98: {
            slidesPerView: 3,
            spaceBetween: 20
          },

        // min-width: 768.98, max-wdith: 1240
        768.98: {
            slidesPerView: 2,
            centeredSlides: false
        },

        // min-width: 900px, max-wdith: 900px
        350: {
            slidesPerView: 1
        }
    }
});
// hết swiperjs cho chính sách (trang chủ dưới section 1)

// // // swiperjs cho sản phẩm (trang chủ)
// const swiperProduct = new Swiper(".swiper__product", {
//     slidesPerView: 2,
//     spaceBetween: 20,
//     loop: true,
//     grabCursor: true,
//     centeredSlides: true,

//     // responsive swiperjs
//     breakpoints: {
//         // min-width: 1198, max-width: ...
//         1198.98: {
//           slidesPerView: 4,
//           spaceBetween: 20
//         },

//         991.98: {
//             slidesPerView: 3,
//             spaceBetween: 20
//           },

//         // min-width: 768.98, max-wdith: 1240
//         768.98: {
//             slidesPerView: 2,
//             centeredSlides: false
//         },

//         // min-width: 900px, max-wdith: 900px
//         350: {
//             slidesPerView: 1
//         }
//     }
// });
// // // hết swiperjs cho sản phẩm (trang chủ)

// swiper cho section 4 (trang chủ best author)
const swiperSection4 = new Swiper(".swiper__section-4", {
    slidesPerView: 2,
    loop: true,
    grabCursor: true,
    pagination: {
    clickable: true,
      el: ".swiper-pagination",
    },

    // responsive swiperjs
    breakpoints: {
        991.98: {
            slidesPerView: 2,
            spaceBetween: 20
            },
    }
});
// hết swiper cho section 4 (trang chủ best author)

// swiperjs cho article (trang chủ)
const swiperArticle = new Swiper(".swiper__article", {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    centeredSlides: true,

    // pagination: {
    //     clickable: true,
    //       el: ".swiper-pagination",
    // },
    
    // responsive swiperjs
    breakpoints: {
        // min-width: 1198, max-width: ...
        1198.98: {
          slidesPerView: 4,
          spaceBetween: 20
        },

        991.98: {
            slidesPerView: 3,
            spaceBetween: 20
          },

        // min-width: 768.98, max-wdith: 1240
        768.98: {
            slidesPerView: 2,
            centeredSlides: false
        },

        // min-width: 900px, max-wdith: 900px
        350: {
            slidesPerView: 1
        }
    }
});
// hết swiperjs cho article (trang chủ)


// trang chi tiết ảnh
const swiperSub = new Swiper(".swiper-sub", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});

const swiperMain = new Swiper(".swiper-main", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperSub, // swiper sub sẽ đi theo swiperMan
    },
});
// hết trang chi tiết ảnh

// mở hình ảnh bự lên
const viewerJsImage = document.querySelector("#viewerjs-image");
if(viewerJsImage) {
    const viewer = new Viewer(viewerJsImage, {});
}
// hết mở hình ảnh bự lên