import mongoose, {mongo} from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://anambra:genesis@cluster0.tquawga.mongodb.net/anambra-marriage?retryWrites=true&w=majority");
        console.log(`Mongo Db Connected : ${conn.Connection}`);
    }catch(error) {
        console.error(`Error: ${error.message}`)
        process.exit(1); 
    }
 
      
}

export default connectDB
