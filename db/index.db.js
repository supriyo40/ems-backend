import mongoose from "mongoose";
import ErrorHandler from "../utils/ErrorHandler.utils.js";

const connectDB = async () => {
    try{
        const {MONGODB_URI, DB_NAME} = process.env;
        if(!MONGODB_URI || !DB_NAME){
            ErrorHandler("missing MONGODB_URI or DB_NAME", 404);
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MONGODB connection error ", error);
        process.exit(1);
    }
}

export default connectDB;