import { warningInput, emailValidate } from "./warning.js";

import { showAlert } from "./alert.js";

// sự kiện ẩn hiện password
const showPasswordEvent = (formElement) => {
    const iconEye = formElement.querySelector(".form__login-password-icon");
    // const inputPassword = formElement.querySelector('input[name="password"]');
    const inputPassword = formElement.password;

    iconEye.addEventListener("click", event => {
        const type = (inputPassword.type === "text" ? "password" : "text");
        
        inputPassword.type = type; // đổi type của thẻ input

        if(type === "text") 
            iconEye.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;

        else 
            iconEye.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    });
}
// hết sự kiện ẩn hiện password

// đăng nhập trang quản trị
const FormloginAdmin = document.querySelector("#form-login-admin");
if(FormloginAdmin) {

    FormloginAdmin.addEventListener("submit", (event) => {
        event.preventDefault();

        let isValid = true;

        isValid &= warningInput(FormloginAdmin.email, "Vui lòng nhập email", '#FFC107');

        
        isValid &= warningInput(FormloginAdmin.password, "Vui lòng nhập mật khẩu", '#FFC107');


        if(!isValid) {
            showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
            return;
        }

        FormloginAdmin.submit();
    });

    showPasswordEvent(FormloginAdmin); // sự kiện ẩn hiện password;
}
// hết đăng nhập trang quản trị