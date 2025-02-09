const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        return conn;
    }catch(error){
        console.log(error);
    }

}

module.exports = dbConnect;