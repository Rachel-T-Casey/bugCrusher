const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users/users');
app.use(cors());    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/users', userRouter);



app.post('/' , (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
