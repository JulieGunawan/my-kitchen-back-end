import { MongoClient } from "mongodb";

let voteDb;

async function connectDB (cb){
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    voteDb = client.db('react-blog-vote');
    cb();
}

export {
    voteDb,
    connectDB,
};