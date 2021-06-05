const router = require('express').Router();
const clinicsController = require('../controllers/clinicsController');
const admin = require('../middleware/admin');

// GET - Returns all clinics

router.get('/', async(req, res) => {
    try {
        res.json(await clinicsController.findAllClinics())
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// POST - Creates a new clinic

router.post('/', admin, async(req, res) => {
    try {
        const clinic = req.body;
        res.json(await clinicsController.createClinic(clinic))
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// PUT - Updates the information about a clinic 

router.put('/', admin, async (req,res) => {
    try{
        const bodyData = req.body;
        res.json(await clinicsController.updateClinic(bodyData)); 
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})

// DELETE - Deletes a clinic
router.delete('/', admin, async (req, res) => {
    try {
        const bodyData = req.body;
        res.json(await clinicsController.deleteClinic(bodyData))
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})


module.exports = router;

