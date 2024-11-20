import { warningInput, warningImage } from "./warning.js";
import { showAlert } from "./alert.js";
import clickOutSide from "./clickOutSide.js";

// Đóng mở option table -  Open Close Option Table - Bảng hành động của Item
const optionTabs = document.querySelectorAll(".table__option-tab");
const optionIcons  = document.querySelectorAll(".table__option-icon");
if(optionIcons.length > 0 && optionTabs.length > 0) {
    optionIcons.forEach((icon, iconIndex) => {
        // lắng nghe sự kiện
        icon.addEventListener("click", (event) => {
            optionTabs.forEach((tab, tabIndex) => {
                if(tabIndex !== iconIndex)
                    tab.classList.add("hidden");
            });

            optionTabs[iconIndex].classList.toggle("hidden");
        });
    });
}
// Hết Đóng mở option table -  End Open Close Option Table - Bảng hành động của Item

// Bộ lọc trạng thái - Filter Button Status
const buttonFilterStatus = document.querySelectorAll("[button-filter-status]");
if(buttonFilterStatus) {
    buttonFilterStatus.forEach(button => {
        // lắng nghe sự kiên nút nhấn
        button.addEventListener("click", (event) => {
            // lấy đường dẫn url - Bom Location
            let url = new URL(window.location.href); // window.location thôi vẫn được

            // lấy trạng thái của nút - Dom Html
            const status = button.getAttribute("button-filter-status");

            // set ?query cho url
            if(status) {
                url.searchParams.set("status", status);
                url.searchParams.set("page", 1); // khi filter cái status sẽ set về đầu trang
            }
                

            else
                url.searchParams.delete("status");

            // chuyển hướng url
            window.location.href = url.href;
        });
    });
}
// Hết Bộ lọc trạng thái - End Filter Button Status

// Form tìm kiếm - Form Search
const formSearch = document.querySelector("[form-search]");
if(formSearch) {
    // lắng nge sự kiện
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault(); // chặn sự kiện mặc định của form

        // lấy đường dẫn url - Bom Location
        let url = new URL(location.href); 

        let tagInput = formSearch.querySelector("input");

        // set ?query cho url
        if(tagInput.value) {
            url.searchParams.set("keyword", tagInput.value);
            url.searchParams.set("page", 1); // khi tìm kiếm thì phải reset page về đầu trang
        }
        
        else
            url.searchParams.delete("keyword");
            
        // chuyển hướng url
        window.location.href = url.href;
    });
}
// Hết Form tìm kiếm - Hết Form Search

// Phân trang - Pagination
const paginationBlock = document.querySelector("[pagination-block]");
if(paginationBlock) {
    // lấy các nút pagination
    const paginationListItem = paginationBlock.querySelectorAll("[pagination-item]");
    paginationListItem.forEach(item => {
        // lắng nghe sự kiện
        item.addEventListener("click", (event) => {
            // lấy đường dẫn url - window location
            let url = new URL(window.location.href);

            let page = item.getAttribute("pagination-item");

            // set ?query
            url.searchParams.set("page", page);

            // chuyển hướng url
            window.location.href = url.href;
        });
    });
}
// Hết Phân trang - End Pagination

// Thay đổi trạng thái item - Change Status Of Item
const formChangeStatus = document.querySelector("#form-change-status");
if(formChangeStatus) {
    const path = formChangeStatus.getAttribute("data-path");
    // lấy danh sách nút nhấn
    const listButtonStatusId = document.querySelectorAll("[button-status-id]");

    listButtonStatusId.forEach(button => {
        //  lắng nghe sự kiện
        button.addEventListener("click", (evnet) => {

            Swal.fire({
                title: "Bạn có chắc muốn thay đổi trạng thái",
                input: "Nếu thay đổi trạng thái tài khoản hãy chú ý tài khoản của bạn",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6", // màu nút xác nhận
                cancelButtonColor: "#d33", // màu nút từ chối
                confirmButtonText: "Vẫn thay đổi!",
                cancelButtonText: "Không thay đổi"
            }).then((result) => {
                if (result.isConfirmed) {
                    const id = button.getAttribute("button-status-id");
                    let status = button.getAttribute("button-status");
        
                    // đảo trạng thái của status
                    status = (status === "active" ? "inactive" : "active");
                    
                    // url: ..../change-status/:id/:status
                    const action = path + `/${id}/${status}/?_method=PATCH` 
        
                    // submit form
                    formChangeStatus.action = action
                    formChangeStatus.submit();
                }
            });
        });
    })
}
// Hết Thay đổi trạng thái item - EndChange Status Of Item

// Nút reset tất cả bộ lọc và tìm kiếm - Button Reset All
const buttonResetAll = document.querySelector("[button-reset-all]");
if(buttonResetAll) {
    // lắng nghe sự kiện
    buttonResetAll.addEventListener("click", (event) => {
        // lấy url
        let url = new URL(window.location.href); // window location

        // xóa hết các ?query
        url.searchParams.delete("status");
        url.searchParams.delete("keyword");
        url.searchParams.delete("page");
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        // chuyển hướng url
        window.location.href = url.href;
    });
}
// Hết Nút reset tất cả bộ lọc và tìm kiếm - End Button Reset All

// Xóa mềm sản phẩm - Delete Soft
const listButtonDelete = document.querySelectorAll("[button-delete-soft]");
const formDeleteSoft = document.querySelector("#form-delete-soft");
if(listButtonDelete.length > 0) {
    const path = formDeleteSoft.getAttribute("data-path");
    listButtonDelete.forEach(button => {
        // lắng nge sự kiện
        button.addEventListener("click", (event) => {
            const id = button.getAttribute("button-delete-soft");

            /**
             * url: .../delete-soft/id
             * /?method=PATCH ghi đè phương thức npm method override
             */
            Swal.fire({
                title: "Bạn có chắc muốn xóa",
                input: "Sau khi xóa sẽ không khôi phục lại được",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6", // màu nút xác nhận
                cancelButtonColor: "#d33", // màu nút từ chối
                confirmButtonText: "Vẫn xóa!",
                cancelButtonText: "Không xóa"
            }).then((result) => {
                if (result.isConfirmed) {
                    let action = path + `/${id}` + '/?_method=PATCH';

                    // submit form
                    formDeleteSoft.action = action;
                    formDeleteSoft.submit();
                }
            });


        });
    });
}
// Hết Xóa mềm sản phẩm - End Delete Soft

// Sắp xếp theo nhiều tiêu chí - Sort 
const selectSort = document.querySelector("[select-sort]");
if(selectSort) {
    // lắng nghe sự kiện thay đổi 
    selectSort.addEventListener("change", (event) => {
        // lấy url
        let url = new URL(window.location.href);

        let option = selectSort.value;
        // nếu có chọn option
        if(option) {
            option = option.split("-");
            const name = option[0];
            const type = option[1];

            // ...?sortKey=name&sortValue=type
            url.searchParams.set("sortKey", name);
            url.searchParams.set("sortValue", type);
        }
        else {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
        }

        // chuyển hướng url
        window.location.href = url.href;
    });

    // sau khi chuyển hướng url thì cập nhật lại cái option đang chọn
    let url = new URL(window.location.href);
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey !== null && sortValue !== null) {
        const optionQuery = [sortKey, sortValue].join("-"); // nối chuỗi
        
        const findOptionSelected = selectSort.querySelector(`option[value=${optionQuery}]`);

        findOptionSelected.selected = true;
    }    
}
// Hết Sắp xếp theo nhiều tiêu chí - End Sort 

// Checkbox all và checkbox single
const checkBoxAll = document.querySelector("[check-box-all]");
const checkBoxSingles = document.querySelectorAll("[check-box-single]");
if(checkBoxAll && checkBoxSingles.length > 0) {
    // nếu tíck vào check box all 
    checkBoxAll.addEventListener("click", (event) => {
        
        // nếu tích vào mà là true thì tích vào toàn bộ check box single
        const isChecked = checkBoxAll.checked;

        checkBoxSingles.forEach(box => {
            box.checked = isChecked; 
        }); 

        // có thể dùng if else nhưng dùng cách này sẽ rút gọn lại
    }); 

    // tích vào check box single
    checkBoxSingles.forEach(box => {
        box.addEventListener("click", (event) => {
            // nếu số lượng box === số lượng box được tích => tích all
            const quantityChecKed = document.querySelectorAll("[check-box-single]:checked").length;
            
            const isCheckedAll = quantityChecKed === checkBoxSingles.length
            checkBoxAll.checked = isCheckedAll
        });
    });
}
// Hết Checkbox all và checkbox single

// Khi nhấn vào khung thì sẽ open cửa sổ upload file
const uploadImgEvent = (formElement) => {
    const uploadImgItem = formElement.querySelectorAll(".upload-image__item");
    
    uploadImgItem.forEach(item => {
        const itemGroup = item.querySelector(".upload-image__item-group"); // khung hiển thị khi chưa upload ảnh
        // const inputFile = itemGroup.querySelector(`input[name="thumbnail"]`); // thẻ input type file
        const inputFile = itemGroup.querySelector(`input[type="file"]`); // thẻ input type file
        const imagePreview = item.querySelector("[img-preview]"); // thẻ img chứa image preview
        const closeImagePreview = item.querySelector(".upload-image__close-preview"); // nút gỡ ảnh đã upload

        // khi nhấn vào khung để chọn ảnh hoặc đổi ảnh
        itemGroup.addEventListener("click", (event) => {
            inputFile.click(); // mở thẻ input type file lên

            // khi file thay đổi
            inputFile.addEventListener("change", event => {
                const [file] = inputFile.files;
                if(file) {
                    imagePreview.src = URL.createObjectURL(file);
                    /** khi mà chưa upload ít nhất 1 ảnh mà submit thì sẽ bị warning đỏ. Thả đoạn warning này vào đây để khi có ảnh  */
                    // warningImage(formElement);

                    item.classList.add("preview");
                }
            });
        });

        // sự kiện đóng ảnh preview
        closeImagePreview.addEventListener("click", event => {
            item.classList.remove("preview"); 
            imagePreview.src = ""; // xóa khỏi source preview
            inputFile.value  = ""; // xóa giá trị để tránh bị upload nhầm
        });
    });
}
// Hết Khi nhấn vào khung thì sẽ open cửa sổ upload file

// Nếu là ô để nhập số mà điền chữ vào thì sẽ warning
const formatInputNumber = (element, contentNormal, contentWarn) => {
    element.addEventListener("input", event => {
        if(element.value === "") return;

        // cách này cũng được nhưng mà lỡ có 1 số trong chuỗi thì nó cho đúng luôn nên cũng không được
        // const isNotDigit = isNaN(parseInt(element.value));

        // dùng regex, nếu chuỗi có chữ thì không được 
        const pattern = /^[0-9]+$/;
        const isDigit = pattern.test(element.value);

        if(isDigit === false) {
            element.value = "";
            warningInput(element, contentWarn, '#FFC107');
            return;
        }

        element.style.border = "1px solid #324055";
        element.style.outline = "none";
        element.placeholder = contentNormal;
    });


    element.addEventListener("blur", event => {
        element.style.border = "1px solid #324055";
        element.style.outline = "none";
        element.placeholder = contentNormal;
    });
}
// Hết Nếu là ô để nhập số mà điền chữ vào thì sẽ warning

// Icon hiển thị password và không hiển thị password
const showPasswordEvent = (formElement) => {
    const iconShowPassword = formElement.querySelector(".icon-eye-password");

    const inputPassword = formElement.querySelector('input[type="password"]');
    if(iconShowPassword) {
        iconShowPassword.addEventListener("click", event => {
            const currType = inputPassword.type;

            if(currType === "password") {
                inputPassword.type = "text";
                iconShowPassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            }

            else {
                inputPassword.type = "password";
                iconShowPassword.innerHTML = '<i class="fa-regular fa-eye"></i>';
            }
        });
    }
}
// Hết Icon hiển thị password và không hiển thị password

// Tạo mới sản phẩm, Chỉnh sửa sản phẩm
const formCreate = document.querySelector("#form-create");
if(formCreate) {
    formCreate.addEventListener("submit", event => {
        event.preventDefault(); // tạm ngăn chặn sự kiện submit của form

        let isValid = true; // nếu thiếu 1 trường nào đó nó sẽ AND với false từ đó kq là false và dùng nó để warning alert

        isValid &= warningInput(formCreate.title, "Vui lòng nhập tiêu đề", '#FFC107');
        isValid &= warningInput(formCreate.price, "Vui lòng nhập giá", '#FFC107');
        isValid &= warningInput(formCreate.stock, "Vui lòng số lượng", '#FFC107');

        // check xem có upload hình ảnh nào chưa
        isValid &= warningImage(formCreate);   

        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }
        formCreate.submit(); // submit form đầy đủ thông tin
    });

    // formmat lại định dạng các ô input nếu nhập sai
    const priceInput = formCreate.querySelector('input[name="price"]');
    formatInputNumber(priceInput, "Nhập giá của sản phẩm", "Vui lòng điền đúng định dạng số");

    const discountInput = formCreate.querySelector('input[name="discountPercentage"]');
    formatInputNumber(discountInput, "Mặc định sẽ là giảm giá 0%", "Vui lòng điền đúng định dạng số");

    const stockInput = formCreate.querySelector('input[name="stock"]');
    formatInputNumber(stockInput, "Nhập số lượng của sản phẩm", "Vui lòng điền đúng định dạng số");

    const positionInput = formCreate.querySelector('input[name="position"]');
    formatInputNumber(positionInput, "Vị trí tự động tăng", "Vui lòng điền đúng định dạng số");
    // hết formmat lại định dạng các ô input nếu nhập sai

    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formCreate);
}
// Hết Tạo mới sản phẩm, Chỉnh sửa sản phẩm

// Tạo mới danh mục, Chỉnh sửa danh mục
const formCreateProductsCategory = document.querySelector("#form-create-products-category");
if(formCreateProductsCategory) {
    // lắng nghe sự kiện submit
    formCreateProductsCategory.addEventListener("submit", event => {
        event.preventDefault();

        let isValid = true;

        isValid &= warningInput(formCreateProductsCategory.title, "Vui lòng nhập tiêu đề", '#FFC107');

        // cảnh báo upload ảnh
        isValid &= warningImage(formCreateProductsCategory);
        
        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        formCreateProductsCategory.submit();
    });
    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formCreateProductsCategory);
}
// Hết Tạo mới danh mục, Chỉnh sửa danh mục

// Tạo mới tài khoản quản trị
const formCreateAccount = document.querySelector("#form-create-account");
if(formCreateAccount) {
    // lắng nghe sự kiện submit
    formCreateAccount.addEventListener("submit", event => {
        event.preventDefault();

        let isValid = true;

        isValid &= warningInput(formCreateAccount.fullName, "Vui lòng họ tên", '#FFC107');

        isValid &= warningInput(formCreateAccount.email, "Vui lòng điền email", '#FFC107');

        isValid &= warningInput(formCreateAccount.tel, "Vui lòng số điện thoại", '#FFC107');

        isValid &= warningInput(formCreateAccount.password, "Vui lòng mật khẩu", '#FFC107');

        // cảnh báo upload ảnh
        isValid &= warningImage(formCreateAccount);
        
        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        formCreateAccount.submit();
    });
    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formCreateAccount);

    // sự kiện hiển thị nhập khẩu hoặc không
    showPasswordEvent(formCreateAccount);
}
// Hết Tạo mới tài khoản quản trị

// Chỉnh sửa tài khoản quản trị
const formEditAccount = document.querySelector("#form-edit-account");
if(formEditAccount) {
    // lắng nghe sự kiện submit
    formEditAccount.addEventListener("submit", event => {
        event.preventDefault();

        let isValid = true;

        isValid &= warningInput(formEditAccount.fullName, "Vui lòng họ tên", '#FFC107');

        isValid &= warningInput(formEditAccount.email, "Vui lòng điền email", '#FFC107');

        isValid &= warningInput(formEditAccount.tel, "Vui lòng số điện thoại", '#FFC107');

        // cảnh báo upload ảnh
        isValid &= warningImage(formEditAccount);
        
        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        formEditAccount.submit();
    });
    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formEditAccount);

    // sự kiện hiển thị nhập khẩu hoặc không
    showPasswordEvent(formEditAccount);
}
// Hết Chỉnh sửa tài khoản quản trị

// Tạo mới quyền
const formCreateRole = document.querySelector("#form-create-role");
if(formCreateRole) {
    formCreateRole.addEventListener("submit", event => {
        event.preventDefault();

        let isValid = true; // nếu thiếu 1 trường nào đó nó sẽ AND với false từ đó kq là false và dùng nó để warning alert

        isValid &= warningInput(formCreateRole.title, "Vui lòng nhập tiêu đề", '#FFC107');

        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        formCreateRole.submit();
    });
}
// Hết Tạo mới quyền

// xử lý phân quyền
const tablePermission = document.querySelector("[table-permission]");
const buttonUpdatePermission = document.querySelector("[button-update-permission]");
if(tablePermission && buttonUpdatePermission) {
    const permission = [
        // {
        //     id: "", // id của nhóm quyền
        //     permissions: [], // array chứa danh sách các quyền được truy cập
        // } 
        // lưu ý không được khởi tạo trước nếu không nó sẽ bị dư
    ]

    // lấy các hàng có thuộc tính [data-name] chứa các ID của quyền và Tên Quyền
    const rows = tablePermission.querySelectorAll("[data-name]");
    
    // cập nhật phân quyền
    buttonUpdatePermission.addEventListener("click", event => {
        rows.forEach((row, index) => {
            const name = row.getAttribute("data-name");
            
            // nếu là data-name là id => lấy danh sách id của nhóm quyền
            if(name === "id") {
                // lấy ID của quyền
                const inputs = row.querySelectorAll("input");
                
                inputs.forEach(input => {
                    const id = input.value;
                        permission.push({
                            id: id,
                            permissions: []
                        });
                });
            }
    
            // lấy các quyền đưa vào 
            else {
                const inputs = row.querySelectorAll("input");
                
                inputs.forEach((input, index) => {
                    const checked = input.checked;
    
                    if(checked) {
                        permission[index].permissions.push(name);
                    }
                });
            }
        });
        
        // Lấy form permission
        const formPermission = document.querySelector("#form-permission");
        if(formPermission) {
            const input = formPermission.querySelector("input");

            const permissionJson = JSON.stringify(permission);
            input.value = permissionJson;

            formPermission.submit();
        }
    });   
    // hết cập nhật phân quyền

    // render đánh dấu nếu quyền đó được phân
    const dataRolesJSON = tablePermission.getAttribute("table-permission");

    const dataRolesJS = JSON.parse(dataRolesJSON); // khi gán vào thuộc tính html nó tự chuyển sang JSON nên cần phải chuyển sang JS
    dataRolesJS.forEach((role, index) => {
        const permissions = role.permissions;
        
        permissions.forEach(permission => {
            const row = tablePermission.querySelector(`[data-name="${permission}"]`);
            
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        });
    });

    // hết render đánh dấu nếu quyền đó được phân
}
// hết xử lý phân quyền

// Cài đặt chung 
const formSettingGeneral = document.querySelector("#form-setting-general");
if(formSettingGeneral) {
    // formSettingGeneral.addEventListener("submit", event => {
    //     event.preventDefault();
    //     console.log(formSettingGeneral.websiteName.value);
    // });
    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formSettingGeneral);
}
// Hết Cài đặt chung 

// Đóng các tab con khi nhấn ra ngoài html -- cái này nên để cuối cùng
// clickOutSide()
document.addEventListener("click", (event) => {
    // event.target sẽ lấy được element được click vào
    optionIcons.forEach((item, index) => {
        if(item !== event.target) {
            optionTabs[index].classList.add("hidden");
        }
    });
});
// Hết Đóng các tab con khi nhấn ra ngoài html

// mở thông tin account đã đăng nhập
const headerAccount = document.querySelector(".header__user");
if(headerAccount) {
    headerAccount.addEventListener("click", event => {
        
        const headerUserList = headerAccount.querySelector(".header__user-list");

        headerUserList.classList.toggle('hidden');
    });
}
// hết mở thông tin account đã đăng nhập

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