const express = require("express");
const app = express();

const port = 8000;

app.get('/', (req, res) => {
    res.write("<h1>This is my Home Page</h1>");
    res.write("<h1>usig HTML tag</h1>");
    res.send();
});

app.get('/about', (req, res) => {
    res.send('This is my About Page');
});

app.get('/contact', (req, res) => {
    res.send('This is my Contact Page');
});

app.get('/temp', (req, res) => {
    res.send({
        id: 45,
        name: 'kk sharma'
    });
});

app.listen(port, () => {
    console.log(`Port listing on: ${port}`);
});