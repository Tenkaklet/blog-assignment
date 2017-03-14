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
    const fields = ['title', 'content', 'author'];
    for (let i = 0; i < fields.length; i++) {
        const required = fields[i];
        if(!(required in req.body)) {
            const msg = `No ${required} in req.body`;
            console.log(msg);
            return res.status(400).send(msg);
        }
    }
    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(post);
    console.log(`created post ${post}`);
});

blogRouter.delete('/:id', (req,res) => {
   BlogPosts.delete(req.params.id);
   console.log(`Deleted post ${req.params.id}`);
   res.status(204).send(`Deleted post ${req.params.id}`).end();
});

blogRouter.put('/:id', jsonParser, (req,res) => {
    const fields = ['title', 'content', 'author'];
    for (let i = 0; i < fields.length; i++) {
        const required = fields[i];
        if(!(required in req.body)) {
            const msg = `No ${required} in req.body`;
            console.log(msg);
            return res.status(400).send(msg);
        }
    }
    if (req.params.id !== req.body.id) {
        const msg = `The params of response object do not match`;
        console.error(msg);
        res.status(400).send(msg);
    }
    console.log(`Updating post ${req.params.id}`);
    const post = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    res.status(204).json(post);
});
module.exports = blogRouter;