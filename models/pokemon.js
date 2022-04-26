//https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");

var pokemonSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["EAU", "FEU","PLANTE","ELECTRIK","SOL","VOL","POISON","NORMAL","PSY","FEE","TENEBRES","DRAGON","INSECTE","ROCHE","COMBAT","ACIER","GLACE","SPECTRE"] },
  dresseur: { type: Number, required: true, ref: "dresseur" },
});
pokemonSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
pokemonSchema.virtual("id").get(function () {
  return this._id;
});
// Export model.
module.exports = mongoose.model("pokemon", pokemonSchema);