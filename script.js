const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json()); 
const database = {
    users: [
        {
            id: '123',
            name: 'Jon',
            email: 'jon@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working')
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password == database.users[0].password) {
        res.json('it worked!')
    } else {
        res.status(400).json('login error');
    }
    
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})


/*
Endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> updated user count

*/
