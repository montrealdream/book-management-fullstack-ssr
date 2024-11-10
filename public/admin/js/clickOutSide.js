// @description: đóng các tab khi click ra bên ngoài phần tử
// @author: GIANG TRƯỜNG

/**
 * 
 * @param {*} element phần tử khi không click vào sẽ đóng
 * @param {*} callback hàm đóng 
 */
const clickOutSide  = (element, callback) => {
    document.addEventListener("click", event => {
        if(event.target === element) {
            callback();
        }
    });
}

export default clickOutSide;