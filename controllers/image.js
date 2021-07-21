const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "395e4cf1b1b84198b7acd91f1a7b07bb"
})

const handleApi = (req, res) => {
	
	app.models.predict(
      "f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
	.then(response => res.json(response))
	.catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	.where('id', '=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json("unable to update entries"));
}

module.exports = {
	handleImage: handleImage,
	handleApi: handleApi
}