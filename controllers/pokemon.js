var Pokemon = require("../models/pokemon");
const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("type1")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Type n°1 must be specified."),
  body("type2")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Type n°2 must be specified."),
  body("dresseur")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("dresseur must be specified.")
    .isNumeric()
    .withMessage("dresseur must be a number."),
  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create pokemon object with escaped and trimmed data
    var pokemon = new Pokemon({
      _id: req.body.id,
      name: req.body.name,
      type1: req.body.type1,
      type2: req.body.type2,
      dresseur: req.body.dresseur,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      pokemon.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Pokemon created successfully !");
      });
    }
  },
];
// Read
exports.getAll = function (req, res, next) {
  Pokemon.find()
    .populate("dresseur")
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};
exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Pokemon.findById(req.params.id)
        .populate("dresseur")
        .exec(function (err, result) {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json(result);
        });
    }
  },
];
// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Pokemon.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Pokemon deleted successfully !");
      });
    }
  },
];
// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
    body("type1")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Type n°1 must be specified."),
  body("type2")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Type n°2 must be specified."),
  body("dresseur")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("dresseur must be specified.")
    .isNumeric()
    .withMessage("dresseur must be a number."),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create pokemon object with escaped and trimmed data
    var pokemon = new Pokemon({
      _id: req.params.id,
      name: req.body.name,
      type1: req.body.type1,
      type2: req.body.type2,
      dresseur: req.body.dresseur,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Pokemon.findByIdAndUpdate(req.params.id, pokemon, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Pokemon updated successfully !");
      });
    }
  },
];
