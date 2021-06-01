const router = require('express').Router();
const clinicsController = require('../controllers/clinicsController');

// GET - Returns all clinics

router.get('/', async(req, res) => {
    try {
        res.json(await userController.findAllClinics())
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

