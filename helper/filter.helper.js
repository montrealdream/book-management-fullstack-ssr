/**
 * @description Filter Helper
 * @author GIANG TRƯỜNG
*/

// Bộ lọc trạng thái
module.exports.filterStatus = (query) => {
    const filterStatusArray = [
        {
            title: "Tất cả",
            class: "filter__item--active",
            status: "",
        },
        {
            title: "Hoạt động",
            class: "",
            status: "active",
        },
        {
            title: "Dừng hoạt động",
            class: "",
            status: "inactive",
        }
        // khi tìm thấy trạng thái nó sẽ thêm class vào để active
    ];

    if(query.status) {
        const status = query.status;

        // tìm index của status để bật class lên
        const index = filterStatusArray.findIndex(item => item.status === status);

        filterStatusArray[index].class = "filter__item--active";
        filterStatusArray[0].class = "";
    }

    return filterStatusArray;
}