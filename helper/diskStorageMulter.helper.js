/**
 * @description Disk Storage Multer 
    Khi uploads hình ảnh, ban đầu nếu chưa upload lên Cloudinary hoặc một ứng dụng Cloud nào đó thì ta cần upload vào một thư mục. Sau khi upload vào thư mục thì trường dữ liệu chứa ảnh sẽ lưu đường dẫn đến thư mục đó. Nhờ vậy khi render ra giao diện thì nó sẽ trỏ vào thư mục chưa file để lấy ra ảnh

 * @author GIANG TRƯỜNG
 */
const multer  = require('multer');

module.exports = () => {
    const storage = multer.diskStorage({
        // đưa đến thư mục file được lưu
        destination: function (req, file, callback) {
            callback(null, 'public/uploads');
            // có thể trỏ vào bằng cách: ./public/uploads
        },

        // tạo tên file mới 
        filename: function (req, file, callback) {
          const uniqueSuffix = Date.now();
          callback(null, uniqueSuffix + '-' + file.originalname);
        }
    })

    return storage;
}