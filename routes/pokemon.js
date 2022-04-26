var express = require('express');
var router = express.Router();

var pokemon_controller = require('../controllers/pokemon');

router.get('/', pokemon_controller.getAll);

router.get('/:id', pokemon_controller.getById);

router.post('/', pokemon_controller.create);

router.put('/:id', pokemon_controller.update);

router.delete('/:id', pokemon_controller.delete);

module.exports = router;