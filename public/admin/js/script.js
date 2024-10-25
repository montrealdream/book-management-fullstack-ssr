// ĐÓNG MỞ SIDER CON - Opent Close Sub-Sider
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
// HẾT ĐÓNG MỞ SIDER CON - End Opent Close Sub-Sider

// ĐÓNG MỞ OPTION TABLE -  Open Close Option Table
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
// HẾT ĐÓNG MỞ OPTION TABLE -  End Open Close Option Table

// BỘ LỌC TRẠNG THÁI - Filter Button Status
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
// HẾT BỘ LỌC TRẠNG THÁI - End Filter Button Status

// FORM TÌM KIẾM - Form Search
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
// END FORM TÌM KIẾM - Hết Form Search

// PHÂN TRANG - Pagination
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
// HẾT PHÂN TRANG - End Pagination

// THAY ĐỔI TRẠNG THÁI ITEM - Change Status Of Item
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
// END THAY ĐỔI TRẠNG THÁI ITEM - EndChange Status Of Item

// NÚT RESET TẤT CẢ BỘ LỌC VÀ TÌM KIẾM - Button Reset All
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
// HẾT NÚT RESET TẤT CẢ BỘ LỌC VÀ TÌM KIẾM - End Button Reset All

// XÓA MỀM SẢN PHẨM - Delete Soft
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
// HẾT XÓA MỀM SẢN PHẨM - End Delete Soft

// SẮP XẾP THEO NHIỀU TIÊU CHÍ - Sort 
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
// HẾT SẮP XẾP THEO NHIỀU TIÊU CHÍ - End Sort 

// CHECK BOX ALL VÀ SINGLE
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
// END CHECK BOX ALL VÀ SINGLE

// TẮT CÁC TAB CON KHI NHẤN RA NGOÀI HTML -- CÁI NÀY NÊN ĐỂ CUỐI CÙNG 
document.addEventListener("click", (event) => {
    // event.target sẽ lấy được element được click vào
    optionIcons.forEach((item, index) => {
        if(item !== event.target) {
            optionTabs[index].classList.add("hidden");
        }
    });
});
// HẾT TẮT CÁC TAB CON KHI NHẤN RA NGOÀI HTML

// Thông báo alert 
const alert = document.querySelector(".alert");
if(alert) {
    const alertItem = alert.querySelector(".alert__item");

    // khi nhấn vào nút close alert thì sẽ tắt alert đó
    const closeAlertItem = alertItem.querySelector("[close-alert");
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
    alert.appendChild(newAlertItem);

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