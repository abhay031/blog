const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./post.js')
const ind = require('./theme/');
// console.log('post==============',post)
const app = new express();
 
mongoose.connect('mongodb://localhost:27017/node-blog', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))
 
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));
 
 
app.get('/', (req, res) => {
    res
});
 
// app.post('/posts/store', (req, res) => {
//     Post.create(req.body, (error, post) => {
//         res.redirect('/')
//     })
// });

// app.get('/', async (req, res) => {
//     const posts = await Post.find({})
//     res.render('index', {
//         posts
// })
// }); 



app.post('/posts/store', (req, res) => {
   if(!req.body.tittle || !req.body.description || !req.body.content){
   	res.send({
   		"message" : "Paramitter Missing",
   		'responce code' : '404'
   	})
   }else{
   		var obj = {
   			tittle : req.body.tittle,
   			description : req.body.description,
   			content : req.body.content
   		}
   		var post = new Post(obj);
   		post.save((err,result)=>{
   			if(err) res.send('Error Occure')
   			else if(result){
   				res.send('Successfully saved to database')
   			}
   		})
   }
});






app.listen(4000, () => {
    console.log('App listening on port 4000')
});
