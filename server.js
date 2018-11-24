const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
  	connectionString: process.env.DATABASE_URL,
  	ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => { res.json('it is working 4') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3030, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})

// glacial-plateau-39670 –--- backend app
// https://glacial-plateau-39670.herokuapp.com –-- backend app full url
// postgresql-closed-71027 ---- the database addon