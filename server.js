const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-clean-52806',
      user : 'juicybliss',
      password : '',
      database : 'smart-brain'
    }
  });

  const app = express();

  app.use(cors())
  app.use(bodyParser.json());
  
  app.get('/', (req, res)=> { res.send(`It looks good!`) })
  app.post('/signin', signin.handleSignin(db, bcrypt))
  app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
  app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
  app.put('/image', (req, res) => { image.handleImage(req, res, db)})
  app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
  
  app.listen(process.env.PORT, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
  })

/*
Endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> updated user count

*/
