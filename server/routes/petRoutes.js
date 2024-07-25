const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// Create or update the single pet
router.post('/', async (req, res) => {
  const petData = req.body;
  try {
    let pet = await Pet.findOne();
    if (pet) {
      pet = await Pet.findByIdAndUpdate(pet._id, petData, { new: true });
    } else {
      pet = new Pet(petData);
      await pet.save();
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the single pet
router.get('/', async (req, res) => {
  try {
    const pet = await Pet.findOne();
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
