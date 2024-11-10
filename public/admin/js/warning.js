// @description: warning các ô input 
// @author: GIANG TRƯỜNG

// Warning input - Thông báo chưa nhập vào thẻ input
export const warningInput = (element, content, colorWarning) => {
    if(element.value === "") {
        element.style.border = `1px solid ${colorWarning}`;
        element.placeholder = content + "...";
        return false; // có warning
    }
    return true;
} 
// Hết Warning input - Thông báo chưa nhập vào thẻ input

// Warning image - Thông báo chưa nhập vào ít nhất một ảnh
export const warningImage = (formElement) => {
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
        // const fileInput = item.querySelector(`input[name="thumbnail"]`);
        const fileInput = item.querySelector(`input[type="file"]`);

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
    if(noticeImage)
        noticeImage.style.color = stateChosen[state].noticeColor;

    return isUpload; // nếu false là chưa upload ảnh nào
}
// Hết Warning image - Thông báo chưa nhập vào ít nhất một ảnh

// Validate Email 
export const emailValidate = (element, content, colorWarning) => {
    const regex = /[\w\.]+@\w+(\.\w+)+/;
    
    if(!regex.test(element.value)) {
        showAlert("Hãy điền đầy đủ thông tin", "warning", 5000);
    }

    return true;
}
// Hết Validate Email 