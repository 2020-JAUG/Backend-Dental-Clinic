const router = require('express').Router();
const dentistController = require('../controllers/dentistController.js');
const authDentist = require('../middleware/authDentist.js');
const authClient = require('../middleware/authClient.js');
const admin = require("../middleware/admin.js");


// GET - Returns all dentists

router.get('/', admin, async(req, res) => {
    try {
        res.json(await dentistController.findAllDentists());
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// POST - Client can filter dentists by city

router.post('/info', authClient, async(req, res) => {
    try {
        let body = req.body;
        res.json(await dentistController.findDentistInfo(body));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// POST - Dentist can see his own profile

router.post('/profile', authDentist, async(req, res) => {
    try {
        let id = req.body.id;
        res.json(await dentistController.findById(id));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/email', async(req, res) => {
    try {
        let email = req.body.email;
        res.json(await dentistController.findByRole(email));
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

router.put('/', authDentist, async (req,res) => {
    try{
        const bodyData = req.body;
        res.json(await dentistController.updateDentist(bodyData)); 
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// PUT - Dentist can modify password

router.put("/updatepassword", authDentist, async(req, res) => {
    try {
        const body = req.body;
        res.json(await dentistController.modifyPassword(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


// POST - Add speciality to a dentist

router.post('/addspeciality', authDentist, async (req,res) => {
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
router.delete('/', authDentist, async (req, res) => {
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
