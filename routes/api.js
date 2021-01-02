const router = require('express').Router();

router.delete("api/notes/:id"), (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
  };

  module.exports = router