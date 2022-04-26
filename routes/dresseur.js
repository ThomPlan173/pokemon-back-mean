var express = require('express');
var router = express.Router();

var dresseur_controller = require('../controllers/dresseur');

router.get('/', dresseur_controller.getAll);

router.get('/:id', dresseur_controller.getById);

router.post('/', dresseur_controller.create);

router.put('/:id', dresseur_controller.update);

router.delete('/:id', dresseur_controller.delete);

module.exports = router;