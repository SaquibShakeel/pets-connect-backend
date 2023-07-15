const express = require('express');
const router = express.Router();

const { createPet, getAllMyPets, editPet, getPetById } = require('../controllers/petController');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware, createPet);

router.get('/', authMiddleware, getAllMyPets);

router.patch('/edit', authMiddleware, editPet);

router.get('/:id', getPetById);

module.exports = router;