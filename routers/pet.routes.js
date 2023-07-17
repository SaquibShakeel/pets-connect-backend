const express = require('express');
const router = express.Router();

const { createPet, getAllMyPets, editPet, getPetById, updateLocation } = require('../controllers/petController');
const authMiddleware = require('../middlewares/auth.middleware');
const { update } = require('../models/petSchema');

router.post('/create', authMiddleware, createPet);

router.get('/', authMiddleware, getAllMyPets);

router.patch('/edit', authMiddleware, editPet);

router.patch('/updateLocation', updateLocation);

router.get('/:id', getPetById);

module.exports = router;