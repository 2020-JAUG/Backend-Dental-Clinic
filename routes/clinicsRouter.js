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

// POST - Creates a new clinic

router.post('/', async(req, res) => {
    try {
        const clinic = req.body;
        res.json(await userController.createClinic(clinic))
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

