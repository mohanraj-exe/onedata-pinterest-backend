const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB Connection Success`)
    }
    catch (err) {
        console.log({ error: err })
    }
}