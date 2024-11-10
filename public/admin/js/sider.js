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