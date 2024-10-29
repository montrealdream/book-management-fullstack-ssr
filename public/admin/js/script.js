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

            // // submit form
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

            // .../delete-soft/id
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

// Đóng các tab con khi nhấn ra ngoài html -- CÁI NÀY NÊN ĐỂ CUỐI CÙNG 
document.addEventListener("click", (event) => {
    // event.target sẽ lấy được element được click vào
    optionIcons.forEach((item, index) => {
        if(item !== event.target) {
            optionTabs[index].classList.add("hidden");
        }
    });
});
// Hết Đóng các tab con khi nhấn ra ngoài html

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

    newAlertItem.setAttribute("class", `alert__item alert--${state}`); 
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
const warningInput = (element, content) => {
    if(element.value === "") {
        element.style.border = "1px solid #B3261E";
        // element.setAttribute("class", "textRed");
        element.placeholder = content + "...";
        return false; // có warning
    }
    return true;
}
// Hết Warning input - Thông báo chưa nhập vào thẻ input

// Warning image - Thông báo chưa nhập vào ít nhất một ảnh
const warningImage = (formElement) => {
    const uploadImgItem = formElement.querySelectorAll(".upload-image__item");
    
    let isUpload = false; // dùng check xem có upload ít nhất 1 ảnh không

    uploadImgItem.forEach(item => {
        const fileInput = item.querySelector(`input[name="thumbnail"]`);
        if(fileInput.value !== "") 
            isUpload = true;    // ít nhất upload một ảnh
    });

    if(!isUpload) {
        // in màu đỏ phần chú ý
        const noticeImage = formCreate.querySelector("[notice-image]");
        noticeImage.style.color = "#B3261E";

        // đường viền màu đỏ cảnh báo nhập ảnh
        uploadImgItem[0].style.border = "1px dashed #B3261E";
        
        // nội dung màu đỏ
        const labelItem = uploadImgItem[0].querySelector("label");
        labelItem.style.color = "#B3261E";

        // icon màu đỏ
        const iconItem = uploadImgItem[0].querySelector("i");
        iconItem.style.color = "#B3261E";

        return false; // có warning
    }
    return true;
}
// Hết Warning image - Thông báo chưa nhập vào ít nhất một ảnh

// Tạo mới sản phẩm / danh mục
const formCreate = document.querySelector("#form-create");
if(formCreate) {
    formCreate.addEventListener("submit", event => {
        event.preventDefault(); // tạm ngăn chặn sự kiện submit của form

        let isValid = true;

        isValid &= warningInput(formCreate.title, "Vui lòng nhập tiêu đề");

        isValid &= warningInput(formCreate.price, "Vui lòng nhập giá");

        isValid &= warningInput(formCreate.stock, "Vui lòng số lượng");

        // check xem có upload hình ảnh nào chưa
        isValid &= warningImage(formCreate);   

        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        formCreate.submit(); // form đầy đủ thông tin

        
    });
}
// Hết Tạo mới sản phẩm / danh mục

// Khi nhấn vào khung thì sẽ open cửa sổ upload file
if(formCreate) {
    const uploadImageItem = document.querySelectorAll(".upload-image__item");
    
    uploadImageItem.forEach(item => {
        const itemGroup = item.querySelector(".upload-image__item-group");
        const imagePreview = item.querySelector("[img-preview]");
        const closeImagePreview = item.querySelector("[close-img-preview]");
        const inputFile = itemGroup.querySelector(`input[name="thumbnail"]`);

        // cần format lại đoạn này cho gọn nha
        const noticeImage = document.querySelector("[notice-image]");
        const labelItem = uploadImageItem[0].querySelector("label");
        const iconItem = uploadImageItem[0].querySelector("i");
        
        // nhấn vào thêm ảnh hoặc thay đổi ảnh
        itemGroup.addEventListener("click", event => {
            inputFile.click(); // mở thẻ input type file lên

            // khi file thay đổi
            inputFile.addEventListener("change", event => {
                const [file] = inputFile.files;
                if(file) {
                    imagePreview.src = URL.createObjectURL(file);
                    imagePreview.classList.remove("hidden");
                    itemGroup.style.display = "none"; // ẩn các khối content hiển thị
                    closeImagePreview.style.display = "inline-flex";
                    item.style.border = "1px solid #fff"; // khi có ảnh thì inner vào đường viền màu trắng 

                    // khi warning ảnh rồi mà upload ảnh khác thì màu chữ trở lại bình thường
                    noticeImage.style.color = "#fff";
                    labelItem.style.color = "#94A3B8";
                    iconItem.style.color = "#94A3B8";
                }

                else {
                    imagePreview.classList.add("hidden");
                    itemGroup.style.display = "flex";
                    closeImagePreview.style.display = "none";
                }
            });
        })

        // nhấn nút close
        closeImagePreview.addEventListener("click", event => {
            inputFile.value = "";
            imagePreview.src = ""
            closeImagePreview.style.display = "none";
            imagePreview.classList.add("hidden");
            itemGroup.style.display = "flex";
            item.style.border = "1px dashed #2166D6"; // khi xóa ảnh không upload thì đường viền trở về bình thường
        });
    })
}
// Hết Khi nhấn vào khung thì sẽ open cửa sổ upload file

// Nếu là ô để nhập số mà điền chữ vào thì sẽ warning
const formatInputNumber = (element, contentNormal, contentWarn) => {
    element.addEventListener("input", event => {
        if(element.value === "") return;

        const isNotDigit = isNaN(parseInt(element.value));
        if(isNotDigit) {
            element.value = "";
            warningInput(element, contentWarn);
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