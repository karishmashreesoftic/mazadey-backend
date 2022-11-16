const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);


const connectToMongo = async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
    // const { db } = mongoose.connection;

    // gfs = new mongoose.mongo.GridFSBucket(db, {
    //     bucketName: "uploads"
    // });
    console.log("Connected Successfully...");
}

module.exports = {connectToMongo, AutoIncrement};