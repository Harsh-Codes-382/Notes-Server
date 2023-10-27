const mongoose = require('mongoose');
// const mongooseURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const server = '127.0.0.1:27017';
const database = 'notebook';
mongoose.set("strictQuery", false);
const connectdb = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('MongoDB Connected!!');
    } catch (err) {
        console.log("Failsed to connect", err);
    }
}

//  OUTDATED SYNTAX TO CONNECT MONGODB

// const connectToMongo = () =>{
//     mongoose.connect(mongooseURI,()=>{
//         useNewUrlParser: true,
//         console.log("connected harsh masti mar");
//     }).catch(err=>console.log(err))
// }

module.exports = connectdb;