// Create web server with express
// Run the server with node
// Create a route to get comments
// Create a route to post comments
// Create a route to delete comments
// Create a route to update comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    const comments = fs.readFileSync('./comments.json');
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    comments.push(req.body);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send('Comment added');
});

app.delete('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const id = req.params.id;
    const index = comments.findIndex((comment) => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send('Comment deleted');
});

app.put('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const id = req.params.id;
    const index = comments.findIndex((comment) => comment.id === id);
    comments[index] = req.body;
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send('Comment updated');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
