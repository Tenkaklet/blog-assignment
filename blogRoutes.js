const express = require('express');
const blogRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');

BlogPosts.create('My blog post', 'lorem ipsum is the shit', 'Max Carlquist');

blogRouter.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

blogRouter.post('/', jsonParser,  (req, res) => {
   if (!req.body) {
       const msg = `No body ${req.body}`;
       console.log(msg);
       res.status(400).send(msg);
   } else {
       const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
       res.status(200).json(post);
       console.log(`created post ${post}`);
   }

});

blogRouter.put('/:id', (req,res) => {

});
module.exports = blogRouter;