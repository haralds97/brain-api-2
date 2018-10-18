const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart5'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
 
const database = {
	users: [
		{
			id: '123',
			name: 'john',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sal',
			email: 'sal@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.json(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
	res.json(database.users[0]);
	} else {
		res.status(400).json('error signing in');
	}
})

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	db('users')
		.returning('*')
		.insert({
			email: email,
			name: name,
			joined: new Date()
		})
	.then(user => res.json(user[0]))
	.catch(err => res.status(400).json('smth went wrong'));
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (id === user.id) {
			found = true;
			res.json(user);
		}
	});
	if (!found) {
		res.status(404).json('no foundee');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			res.json(`${user.entries}`);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3030, () => {
	console.log('app is running on port 3030');
})