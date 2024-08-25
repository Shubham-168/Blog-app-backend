const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://8014shubham:L5jtclOJmLE9LTcv@blog.syw80.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB connected Successfully")})
.catch((err) => {console.log(err)});

// Blog Post Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

// RESTful API Endpoints
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.put('/posts/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
