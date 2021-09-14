const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(cors())
app.use(bodyParser.json()); 


app.get('/', (req, res) => {res.send(`It's working!`)})

// app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

// app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// app.get('/profile/:id', (req, res) => { profile.handleProfileGrt(req, res, db)})

// app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', image.handleApiCall())



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env}`);
})


/*
Endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> updated user count

*/
