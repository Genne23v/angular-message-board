const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let messages = [
    { text: 'some text', owner: 'Tim' },
    { text: 'other message', owner: 'Jane' },
];
let users = [];

let api = express.Router();
let auth = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
});

api.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    let result = messages.filter((message) => message.owner == user);
    res.json(result);
});

api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body);
});

auth.post('/register', (req, res) => {
    users.push(req.body)
})

app.use('/api', api);
app.use('/auth', auth);

app.listen(8080);