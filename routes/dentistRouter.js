const router = require('express').Router();
const dentistController = require('../controllers/dentistController');
const auth = require('../middleware/auth.js');


// GET - Returns all dentists

router.get('/', async(req, res) => {
    try {
        res.json(await dentistController.findAllDentists());
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/profile', async(req, res) => {
    try {
        let id = req.body.id;
        res.json(await dentistController.findById(id));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// POST - Creates a new dentist

router.post('/', async(req, res) => {
    try {
        const dentist = req.body;
        res.json(await dentistController.createDentist(dentist));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// PUT - Updates the information about a dentist

router.put('/', async (req,res) => {
    try{
        const bodyData = req.body;
        res.json(await dentistController.updateDentist(bodyData)); 
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// POST - Add speciality to a dentist

router.post('/addspeciality', async (req,res) => {
    try{
        const bodyData = req.body;
        res.json(await dentistController.addSpeciality(bodyData)); 
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// DELETE - Deletes a dentist
router.delete('/', async (req, res) => {
    try {
        const bodyData = req.body;
        res.json(await dentistController.deleteDentist(bodyData));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;
