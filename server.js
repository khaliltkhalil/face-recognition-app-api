const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profileGet = require('./controllers/profileGet')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'khcomreal',
    database : 'smart_brain'
  }
});



const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {

	res.json(database);

})

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) =>{
	register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profileGet.handleProfileGet(res, req, db);
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
})

app.post('/imageurl', (req, res) => {
  image.handleApi(req, res);
})

app.listen(3000)