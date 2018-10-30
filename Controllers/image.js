const Clarifai = require('clarifai'); 

const app = new Clarifai.App({ 
 apiKey: '66c26976e675482eaa843e8fc6b634ca'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('error with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('failed to update entries'));
}

module.exports = {
	handleImage,
	handleApiCall
};