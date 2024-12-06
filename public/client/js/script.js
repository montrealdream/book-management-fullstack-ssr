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

// tăng số lượng sách mua ở trang chi tiết
const productDetailQuantity = document.querySelector(".product-detail__quantity");
if(productDetailQuantity) {
  const inputQuantity = productDetailQuantity.querySelector("input");
  const buttonMinus = productDetailQuantity.querySelector("[button-minus]");
  const buttonPlus = productDetailQuantity.querySelector("[button-plus]");
  const stockProduct = productDetailQuantity.getAttribute("stock");
  
  buttonMinus.addEventListener("click", event => {
    let quantity = parseInt(inputQuantity.value);
    if(quantity > 1) 
      inputQuantity.value = quantity - 1;
  });

  buttonPlus.addEventListener("click", event => {
    let quantity = parseInt(inputQuantity.value);
    if(quantity + 1 <= stockProduct)
      inputQuantity.value = quantity + 1;
  });
}
// hết tăng số lượng sách mua ở trang chi tiết

// gợi ý tìm kiếm
const formSearchAPIWrap = document.querySelector(".form-wrap");
if(formSearchAPIWrap) {
  const formSearchAPI = formSearchAPIWrap.querySelector("[form-search]");
  const suggestElement =  document.createElement('div');

  // lấy gợi ý từ khi gõ vào
  const inputSearch = formSearchAPI.querySelector("input");
  inputSearch.addEventListener('keyup', event => {
    const keyword = event.target.value;
    
    fetch(`/search/suggest?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {

        if(data.records.length > 0) {
          console.log('1:::');
          
          suggestElement.classList.add('suggest-search');

          let htmls = ``;
          for(const item of data.records) {
            const thumb = item.thumbnail[0];
            const title = item.title;
            const slug = item.slug;
            
            htmls += `
              <a class="suggest-search__item" href='/products/detail/${slug}'>
                <div class="suggest-search__item-image">
                    <img src=${thumb} alt=${title} />
                </div>

                <div class="suggest-search__item-main">
                    <h3 class="suggest-search__item-title"> ${title} </h3>
                    <div class="suggest-search__item-item">
                      <b>Tác giả: </b> Keigo Higashino
                    </div>
                    <div class="suggest-search__item-item">
                      <b>Danh mục: </b> Trinh Thám
                    </div>
                    <div class="suggest-search__item-item">
                      150.000 VNĐ
                    </div>
                </div>
            `
          };

          suggestElement.innerHTML = htmls;
          formSearchAPIWrap.appendChild(suggestElement);
        }

        else {
          formSearchAPIWrap.removeChild(suggestElement);
        }
      })
  });

  // bấm tìm luôn
  formSearchAPI.addEventListener("submit", event => {
    event.preventDefault();
    let url = new URL(window.location.href);

    const keyword = formSearchAPI.keyword.value;

    let action = formSearchAPI.action;
    action = action + `?keyword=${keyword}`;

    formSearchAPI.action = action;
    formSearchAPI.submit();
  });
}
// hết gợi ý tìm kiếm
