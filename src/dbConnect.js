import { MongoClient } from "mongodb";

let voteDb;

async function connectDB (cb){
    //const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9toujl0.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    voteDb = client.db('react-blog-vote');
    cb();
}

export {
    voteDb,
    connectDB,
};