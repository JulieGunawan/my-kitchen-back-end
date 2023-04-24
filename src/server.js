import express from 'express';
import path from 'path';
import {voteDb, connectDB} from './dbConnect.js';//this is used to connect to DB
import 'dotenv/config';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
This is inserted into mongoDB react-blog-vote
let articlesInfo = [{
        name:'first-blog',
        upvotes:0,
        comments:[],
    },{
        name:'second-blog',
        upvotes:0,
        comments:[],
    },{
        name:'third-blog',
        upvotes:0,
        comments:[],
}]
*/

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/,(req, res) => {
    res.sendFile(path.join(__dirname,'../build/index.html'));
})

app.get('/api/articles/:name', async(req,res) =>{
    const { name } = req.params;
    
    const article=await voteDb.collection('articles').findOne({name});

    res.json(article);
});
/*
app.post('/hello',(req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name}`);
});

app.get('/hello/:name',(req,res) =>{
    const name = req.params.name;
    res.send(`Hello ${name}!!`);

})*/

app.put('/api/articles/:name/upvote', async(req,res)=>{
    const { name }=req.params;
    //const article = articlesInfo.find(a => a.name === name);
   
    await voteDb.collection('articles').updateOne({name}, {
        $inc: { upvotes: 1},
    });

    const article = await voteDb.collection('articles').findOne({name});

    if (article) {
        res.json(article);
       // article.upvotes +=1;
        //res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('That article doesn\'t exist' );
    }
    
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    //const article = articlesInfo.find(a => a.name === name);
    
    await voteDb.collection('articles').updateOne({name},{
        $push:{ comments: {postedBy, text} }
    });
    const article = await db.collection('articles').findOne({name});

    if (article) {
       // article.comments.push({postedBy, text});
        res.send(article.comments);
    } else {
        res.send('Article does not exist!');
    }
});

const PORT=process.env.PORT || 8000;

connectDB(() => {

    console.log('Succesfully connected to vote DB');
    app.listen(PORT, ()=>{
        console.log('Server is listening on port ' + PORT);
    });

});



