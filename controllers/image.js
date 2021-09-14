const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '0795ddaed65f4f6c8e8d12fb1421ca1d'
});

const handleApiCall = () => (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Not able to work with API'))
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0])
})
.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleApiCall,
  handleImage
  
}

