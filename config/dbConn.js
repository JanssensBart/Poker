const mongoose =require('mongoose')

const connectDB = async () => {
    try {
        // DATABASE_URI is stored in .env
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser : true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB