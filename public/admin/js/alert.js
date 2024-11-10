// @description: thông báo alert
// đọc thêm tại: https://github.com/montrealdream/package-alert
// @author: GIANG TRƯỜNG

// Thông báo alert bình thường
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
// Hết thông báo alert bình thường

// Thông báo alert đẩy
const alertPush = document.querySelector(".alert");
export const showAlert = (content = null, state, time) => {

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