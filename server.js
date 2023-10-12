// express server
const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/profile', (req, res) => {
    fetch('https://api.hypixel.net/player?name=' + req.body.name,
        {
            headers: {
                'Accept': 'application/json',
                'API-Key': process.env.TOKEN,
            },
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
})

app.get('/uuid', (req, res) => {
    fetch('https://api.hypixel.net/player?uuid=' + req.body.uuid,
        {
            headers: {
                'Accept': 'application/json',
                'API-Key': process.env.TOKEN,
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})