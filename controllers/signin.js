const handleSignin = (req, res, db, bcrypt) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			if(data.length) {
				console.log(req.body.password, data[0].hash)
				bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
					if(result){
						db.select('*').from('users')
						.where('email', '=', req.body.email)
						.then(user => {
							res.json(user[0])
						})
						
					} else {
						res.status(400).json('Wrong email or Password')
					}

				})
			} else {
				res.status(400).json('Wrong email or Password');
			}
		})
		.catch(err => res.status(400).json('err login in'))
}

module.exports = {
	handleSignin: handleSignin
}