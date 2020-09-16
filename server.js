require('dotenv').config()

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'siam',
        title: 'post 1'
    },
    {
        username: 'ahmed',
        title: 'post 2'
    }
]

app.get('/posts', authToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

function authToken(req, res, next) {
    // Bearer TOKEN
    const authHeader = req.headers['authorization'];
    // Token comes from the header
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Token not valid
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(3000);