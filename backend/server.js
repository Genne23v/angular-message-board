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

let api = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
});

api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body)
});

app.use('/api', api);

app.listen(63145);