const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
});

app.get('/contact', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'))
});

app.get('/blog', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'))
});

app.get('/api/posts', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading blog posts');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:$(PORT)`);
});