const router = require('express').Router();
const dentistController = require('../controllers/dentistController');

// GET - Returns all dentists

router.get('/', async(req, res) => {
    try {
        res.json(await dentistController.findAllDentists())
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


