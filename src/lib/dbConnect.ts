import mongoose, { mongo } from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to DB");
        return
    }

    try {
      const db = await  mongoose.connect(process.env.MONGO_URI
        || '',{})
        
        console.log("DB connected successfully!")
    } catch (error) {
        console.log("DB connection failed!",error);
        process.exit
    }
}

export default dbConnect;

