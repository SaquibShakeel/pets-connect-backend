const Pet = require('../models/petSchema');
const User = require('../models/userSchema');

const createPet = async (req, res) => {
  try {
    const { name, image, lastLocation, lastSeen } = req.body;
    const pet = new Pet({
      name: name,
      owner: req.user.id,
      image: image || null,
      lastLocation: lastLocation || null,
      lastSeen: lastSeen || null,
    });
    const newPet = await Pet.create(pet);
    res.status(201).json({
      message: "Pet created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllMyPets = async (req, res) => {
    try {
        let pets = await Pet.find({ owner: req.user.id });
        const owner = await User.findById(req.user.id);

        pets = pets.map((pet) => {
          return {
            id: pet._id,
            name: pet.name,
            image: pet.image,
            lastLocation: pet.lastLocation,
            lastSeen: pet.lastSeen,
            createdAt: pet.createdAt,
            owner: {
              name: owner.name,
              email: owner.email,
              contact: owner.contact,
            },
          };
        });
        
        res.status(200).json({
            message: "Pets fetched successfully",
            pets: pets,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const editPet = async (req, res) => {
    try {
        const { id, name, image, lastLocation, lastSeen } = req.body;
        const pet = await Pet.findOne({ _id: id });
        if (!pet) {
            return res.status(400).json({ message: 'Pet not found' });
        }

        if(name) {
            pet.name = name;
        }
        if(image) {
            pet.image = image;
        }
        if(lastLocation) {
            pet.lastLocation = lastLocation;
        }
        if(lastSeen) {
            pet.lastSeen = lastSeen;
        }

        pet.save();
        res.status(200).json({
            message: "Pet updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { id, lastLocation, lastSeen } = req.body;
        const pet = await Pet.findOne({ _id: id });
        if (!pet) {
            return res.status(400).json({ message: 'Pet not found' });
        }

        if(lastLocation) {
            pet.lastLocation = lastLocation;
        }
        if(lastSeen) {
            pet.lastSeen = lastSeen;
        }

        pet.save();
        res.status(200).json({
            message: "Pet updated successfully",
            lastLocation: pet.lastLocation,
            lastSeen: pet.lastSeen,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findOne({ _id: id });
        if (!pet) {
            return res.status(400).json({ message: 'Pet not found' });
        }
        const owner = await User.findById(pet.owner);

        res.status(200).json({
            message: "Pet fetched successfully",
            pet: {
                name: pet.name,
                image: pet.image,
                lastLocation: pet.lastLocation,
                lastSeen: pet.lastSeen,
                createdAt: pet.createdAt,
                owner: {
                    name: owner.name,
                    email: owner.email,
                    contact: owner.contact,
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    createPet,
    getAllMyPets,
    editPet,
    updateLocation,
    getPetById,
};