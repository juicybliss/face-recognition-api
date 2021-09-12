const handleImage = (req, res, db) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage //can just use handleImage with ES6 but want to be backwards compatible.
}