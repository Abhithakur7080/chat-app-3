import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
        );
        console.log(`\nMONGODB connected!! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`\nMONGODB connection Error: ${error}`);
    }
}
export default connectDB