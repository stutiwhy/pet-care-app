// server/models/Pet.js
const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  }
});

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
