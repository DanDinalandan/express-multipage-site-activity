const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

// Contact form submission endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, subject, message, timestamp: new Date() });
    
    res.json({ success: true, message: 'Message received successfully' });
});

// Blog posts API - using JSONPlaceholder for real blog data
app.get('/api/posts', (req, res) => {
    // Fetch posts from JSONPlaceholder API
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts?_limit=6',
        method: 'GET'
    };
    
    const request = https.request(options, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        response.on('end', () => {
            try {
                const posts = JSON.parse(data);
                // Transform the data to match our expected format
                const transformedPosts = posts.map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.body,
                    userId: post.userId
                }));
                // Read local posts and prepend them to the list
                fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, local) => {
                    let localTransformed = [];
                    if (!err) {
                        try {
                            const localPosts = JSON.parse(local);
                            localTransformed = localPosts.map((post, index) => ({
                                id: index + 1000, // ensure no clash with remote ids
                                title: post.title,
                                content: post.content,
                                userId: 1
                            }));
                        } catch (_) {}
                    }
                    res.json([ ...localTransformed, ...transformedPosts ]);
                });
            } catch (error) {
                console.error('Error parsing blog posts:', error);
                // Fallback to local posts if API fails
                fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, data) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error reading blog posts' });
                    }
                    try {
                        const localPosts = JSON.parse(data);
                        const transformed = localPosts.map((post, index) => ({
                            id: index + 1,
                            title: post.title,
                            content: post.content,
                            userId: 1
                        }));
                        res.json(transformed);
                    } catch (e) {
                        res.status(500).json({ error: 'Invalid local posts format' });
                    }
                });
            }
        });
    });
    
    request.on('error', (error) => {
        console.error('Error fetching blog posts:', error);
        // Fallback to local posts if API fails
        fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading blog posts' });
            }
            try {
                const localPosts = JSON.parse(data);
                const transformed = localPosts.map((post, index) => ({
                    id: index + 1,
                    title: post.title,
                    content: post.content,
                    userId: 1
                }));
                res.json(transformed);
            } catch (e) {
                res.status(500).json({ error: 'Invalid local posts format' });
            }
        });
    });
    
    request.end();
});

// Create a new blog post (saved locally)
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body || {};
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const filePath = path.join(__dirname, 'data', 'posts.json');
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        let posts = [];
        if (readErr && readErr.code === 'ENOENT') {
            posts = [];
        } else if (!readErr && data) {
            try { posts = JSON.parse(data); } catch (e) { console.error('Invalid posts.json; recreating', e); posts = []; }
        } else if (readErr) {
            console.error('Failed to read posts.json', readErr);
            return res.status(500).json({ error: 'Unable to read storage file' });
        }
        const newPost = { title, content };
        posts.push(newPost);
        fs.writeFile(filePath, JSON.stringify(posts, null, 4), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Failed to save post' });
            }
            // Respond with transformed shape used by the UI
            return res.status(201).json({ id: posts.length, title, content, userId: 1 });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
            
