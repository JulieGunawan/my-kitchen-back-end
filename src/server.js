import express from 'express';

let articlesInfo = [{
        name:'first-blog',
        upvotes:0,
    },{
        name:'second-blog',
        upvotes:0,
    },{
        name:'third-blog',
        upvotes:0,
}]

const app = express();
app.use(express.json());

/*
app.post('/hello',(req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name}`);
});

app.get('/hello/:name',(req,res) =>{
    const name = req.params.name;
    res.send(`Hello ${name}!!`);

})*/

app.put('/api/articles/:name/upvote', (req,res)=>{
    const { name }=req.params;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.upvotes +=1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('That article doesn\'t exist' );
    }
    
});

app.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
});
