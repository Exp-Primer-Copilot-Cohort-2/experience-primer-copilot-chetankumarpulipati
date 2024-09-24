//create web server
const express = require('express');
const app = express();
//create server
const http = require('http').Server(app);
//create socket
const io = require('socket.io')(http);
//create port
const port = 3000;
//create path
const path = require('path');
//create body-parser
const bodyParser = require('body-parser');
//create mongoose
const mongoose = require('mongoose');
//connect mongoose
mongoose.connect('mongodb://localhost/comment');
//create schema
const Schema = mongoose.Schema;
//create schema
const CommentSchema = new Schema({
    comment: String
});
//create model
const Comment = mongoose.model('Comment', CommentSchema);
//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//use path
app.use(express.static(path.join(__dirname, 'public')));
//get all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.send(comments);
    });
});
//post comment
app.post('/comments', (req, res) => {
    let comment = new Comment(req.body);
    comment.save((err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            io.emit('comment', req.body);
            res.sendStatus(200);
        }
    });
});
//create connection
io.on('connection', (socket) => {
    console.log('A user connected');
});
//create server
http.listen(port, () => {
    console.log('Server is running on port ' + port);
});