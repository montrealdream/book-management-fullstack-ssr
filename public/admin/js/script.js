// Đóng mở sider con - Opent Close Sub-Sider
const siderMenuItems = document.querySelectorAll("[sider__menu-item]");
const SiderSubItems = document.querySelectorAll(".sider__menu-sub");
if(siderMenuItems.length > 0) {
    siderMenuItems.forEach((itemMenu, index) => {
        // lắng nghe sự kiện khi nhấn vào sider cha
        itemMenu.addEventListener("click", (event) => {

            // đóng tất cả các sider con đã mở ra
            SiderSubItems.forEach(item => {
                // đóng các sider khác ngoại trừ sider được nhấn
                if(item !== SiderSubItems[index - 1])
                    item.classList.add("hidden");
            });

            // ----------- CÁCH 1 ----------- //
            // // mở sider con của sider cha đã nhấn vào
            // const isHidden = SiderSubItems[index - 1].getAttribute("class");

            // // nếu đã có class hide thì lần này nhấn sẽ đóng sider lại
            // if(isHidden.includes('hidden') === true )
            //     SiderSubItems[index-1].classList.remove("hidden");
            // else
            //     SiderSubItems[index-1].classList.add("hidden");



            // ----------- CÁCH 2 ----------- //
            // const isHidden = SiderSubItems[index - 1].classList.contains("hidden");
            // if(isHidden)
            //     SiderSubItems[index-1].classList.remove("hidden");
            // else
            //     SiderSubItems[index-1].classList.add("hidden");
            


            // ----------- CÁCH 3 ----------- //
            SiderSubItems[index - 1].classList.toggle("hidden");
        });
    });
    // lưu ý vì sider con của dashboard không có nên mới cần phải -1
    // cách làm này chưa tối ưu lắm
}
// Hết Đóng mở sider con - End Opent Close Sub-Sider

// Đóng mở option table -  Open Close Option Table
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
// Hết Đóng mở option table -  End Open Close Option Table

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
    paginationListItem = paginationBlock.querySelectorAll("[pagination-item]");

    paginationListItem.forEach(item => {
        // lắng nghe sự kiện
        item.addEventListener("click", (event) => {
            // lấy đường dẫn url - window location
            let url = new URL(window.location.href);

            let page = item.getAttribute("pagination-item");
            console.log(page);
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
            const id = button.getAttribute("button-status-id");
            let status = button.getAttribute("button-status");

            // đảo trạng thái của status
            status = (status === "active" ? "inactive" : "active");
            
            // url: ..../change-status/:id/:status
            const action = path + `/${id}/${status}/?_method=PATCH` 

            // submit form
            formChangeStatus.action = action
            formChangeStatus.submit();
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
            let action = path + `/${id}` + '/?_method=PATCH';

            // submit form
            formDeleteSoft.action = action;
            formDeleteSoft.submit();
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

// Thông báo alert 
const alert = document.querySelector("[alert-normal]");
if(alert) {
    const alertItem = alert.querySelector(".alert__item");

    // khi nhấn vào nút close alert thì sẽ tắt alert đó
    const closeAlertItem = alertItem.querySelector("[close-alert]");
    closeAlertItem.addEventListener("click", (event) => {
        alertItem.style.display = "none";
    });

    // sau TIME giây nếu không nhấn vào close alert thì nó sẽ tự tắt
    setTimeout(() => {
        // newAlertItem.style.display = "none";
        alertItem.classList.add("hideAlert");
    }, 5000);
}
// Hết thông báo alert

// Thông báo alert đẩy
const alertPush = document.querySelector(".alert");
const showAlert = (content = null, state, time) => {

    if(content === null) return; // nếu không có nội dung thì return luôn

    const newAlertItem = document.createElement("div");

    newAlertItem.setAttribute("class", `alert__item alert__item--${state}`); 
    newAlertItem.innerHTML = `
        <span> ${content} ! </span>
        <span close-alert>
        <i class="fa-solid fa-xmark"></i>
        </span>
    `;
    alertPush.appendChild(newAlertItem);

    // khi nhấn vào nút close alert thì sẽ tắt alert đó
    const closeAlertItem = newAlertItem.querySelector("[close-alert");
    closeAlertItem.addEventListener("click", (event) => {
        newAlertItem.style.display = "none";
    });

    // sau TIME giây nếu không nhấn vào close alert thì nó sẽ tự tắt
    setTimeout(() => {
        // newAlertItem.style.display = "none";
        newAlertItem.classList.add("hideAlert");
    }, time);
    // return;
}
// Hết Thông báo alert đẩy

// Warning input - Thông báo chưa nhập vào thẻ input
const warningInput = (element, content, colorWarning) => {
    if(element.value === "") {
        element.style.border = `1px solid ${colorWarning}`;
        element.placeholder = content + "...";
        return false; // có warning
    }
    return true;
}
// Hết Warning input - Thông báo chưa nhập vào thẻ input

// Warning image - Thông báo chưa nhập vào ít nhất một ảnh
const warningImage = (formElement) => {
    const uploadImgItem = formElement.querySelectorAll(".upload-image__item");
    const noticeImage = formElement.querySelector("[notice-image]");
    
    let state =  "unwarning";
    const stateChosen = {
        "warning": {
            noticeColor: '#FFC107',
            borderColor: '#FFC107',
            labelColor:  '#FFC107',
            iconColor:   '#FFC107',
        },

        "unwarning": {
            noticeColor: '#fff',     // màu của nội dung thông báo bên dưới
            borderColor: '#2166D6',  // color của khung upload ảnh 
            labelColor: '#94A3B8',  // nội dung bên trong khung upload ảnh
            iconColor:  '#94A3B8'   // icon bên trong khung upload ảnh
        }
    }
    
    let isUpload = false; // dùng check xem có upload ít nhất 1 ảnh không

    // check xem đã upload ít nhất 1 ảnh chưa
    uploadImgItem.forEach((item, index) => {
        const fileInput = item.querySelector(`input[name="thumbnail"]`);

        if(item.classList.contains("preview"))
            isUpload = true;

        // if(fileInput.value !== "") 
        //     isUpload = true;    // ít nhất upload một ảnh
    });

    if(!isUpload) state = "warning"; // nếu chưa có ảnh nào upload thì warning lên

    // khung ảnh
    uploadImgItem.forEach(item => {
        const inputFile = item.querySelector(`input[name="thumbnail"]`);

        // đường viền khung ảnh
        item.style.border = `1px dashed ${stateChosen[state].borderColor}`; 

        // nội dung trong khung ảnh
        const labelItem = item.querySelector("label"); 
        labelItem.style.color = stateChosen[state].labelColor;

        // icon trong khung ảnh
        const iconItem = item.querySelector("i");
        iconItem.style.color = stateChosen[state].iconColor;
    });

    // nội dung bên dưới toàn bộ khung ảnh
    noticeImage.style.color = stateChosen[state].noticeColor;

    return isUpload; // nếu false là chưa upload ảnh nào
}
// Hết Warning image - Thông báo chưa nhập vào ít nhất một ảnh

// Khi nhấn vào khung thì sẽ open cửa sổ upload file
const uploadImgEvent = (formElement) => {
    const uploadImgItem = formElement.querySelectorAll(".upload-image__item");
    
    uploadImgItem.forEach(item => {
        const itemGroup = item.querySelector(".upload-image__item-group"); // khung hiển thị khi chưa upload ảnh
        const inputFile = itemGroup.querySelector(`input[name="thumbnail"]`); // thẻ input type file
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

// Tạo mới sản phẩm
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

    // sự kiện upload ảnh khi nhấn vào
    uploadImgEvent(formCreate);
}
// Hết Tạo mới sản phẩm / danh mục

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

if(formCreate) {
    const priceInput = formCreate.querySelector('input[name="price"]');
    formatInputNumber(priceInput, "Nhập giá của sản phẩm", "Vui lòng điền đúng định dạng số");

    const discountInput = formCreate.querySelector('input[name="discountPercentage"]');
    formatInputNumber(discountInput, "Mặc định sẽ là giảm giá 0%", "Vui lòng điền đúng định dạng số");

    const stockInput = formCreate.querySelector('input[name="stock"]');
    formatInputNumber(stockInput, "Nhập số lượng của sản phẩm", "Vui lòng điền đúng định dạng số");

    const positionInput = formCreate.querySelector('input[name="position"]');
    formatInputNumber(positionInput, "Vị trí tự động tăng", "Vui lòng điền đúng định dạng số");
}
// Hết Nếu là ô để nhập số mà điền chữ vào thì sẽ warning

// Đóng các tab con khi nhấn ra ngoài html -- cái này nên để cuối cùng
document.addEventListener("click", (event) => {
    // event.target sẽ lấy được element được click vào
    optionIcons.forEach((item, index) => {
        if(item !== event.target) {
            optionTabs[index].classList.add("hidden");
        }
    });
});
// Hết Đóng các tab con khi nhấn ra ngoài html