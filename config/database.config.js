/**
 * @description Database 
 * @author GIANG TRƯỜNG
 */

const mongoose = require('mongoose');

//  Kết nối với MongoDB
module.exports.connect = () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log("Kết nối Database thành công !");
            })
    }
    catch(error){
        console.log("Kết nối Database thất bại");
    }
}