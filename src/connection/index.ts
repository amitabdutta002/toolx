import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number 
}

const connection:connectionObject  = {}; 

export async function connectDB() {
    if (connection.isConnected) {
        console.log('Already connected!!');
        return
    }

    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(database.connections[0]);
        connection.isConnected = database.connections[0].readyState

    } catch (error) {
        console.log('MONGODB FAILED\n');
        console.log(error);
        process.exit(1)
    }
}