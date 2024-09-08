import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://argha:argha@clustercrs.aeb0l.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRS';

const connectMongo = async () => {
    if (mongoose.connections[0].readyState)
        return;

    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongo.")
}

export default connectMongo;