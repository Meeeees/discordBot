// express server
const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.login(process.env.BOTTOKEN)

app.get('/verify', async (req, res) => {
    const { code, guild_id, permissions } = req.query

    try {
        const response = await fetch('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: "1161950080849432596",
                client_secret: "3qJzyQbdxWeshF7uH9beQxneE43KYYT6",
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.REDIRECT_URI,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const accessToken = data.access_token;
            // You now have the access token to make authenticated requests as your bot

            console.log(`Access Token: ${accessToken}`);
        } else {
            console.error('Error exchanging code for token:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error exchanging code for token:', error);
    }
})

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/profile', (req, res) => {
//     fetch('https://api.hypixel.net/player?name=' + req.body.name,
//         {
//             headers: {
//                 'Accept': 'application/json',
//                 'API-Key': process.env.TOKEN,
//             },
//         }).then(res => res.json()).then(data => {
//             console.log(data)
//         })
// })

// app.get('/uuid', (req, res) => {
//     fetch('https://api.hypixel.net/player?uuid=' + req.body.uuid,
//         {
//             headers: {
//                 'Accept': 'application/json',
//                 'API-Key': process.env.TOKEN,
//             },
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })
// })

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// })