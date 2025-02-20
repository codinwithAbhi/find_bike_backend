import mongoose from'mongoose';

function connectDB() {
    console.log(`connectDB is running`); //<-! Debug log

    try {
        const conn = mongoose.connect(process.env.MONGODB_SERVER);

        console.log(`MongoDB Connected Successfully`); //<-! Debug log
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`); //<-! Debug log
        process.exit(1); //<-! Exit if connection fails
    }
}

export default connectDB;
