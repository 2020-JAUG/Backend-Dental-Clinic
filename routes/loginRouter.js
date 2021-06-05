const router = require('express').Router();
const loginController = require('../controllers/loginController');
const clientsController = require('../controllers/clientsController');
const dentistController = require('../controllers/dentistController');
const adminController = require('../controllers/adminController');

// CLIENT ROUTE FOR LOGIN

router.post('/client', async (req, res)=> {
    try {
        const mailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validateClient(mailCheck,passwordCheck);
        let client = await clientsController.findByEmail(mailCheck);
        res.status(200).json({token, client});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})

// DENTIST ROUTE FOR LOGIN

router.post('/dentist', async (req, res)=> {
    try {
        const mailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validateDentist(mailCheck,passwordCheck);
        let dentist = await dentistController.findByEmail(mailCheck);
        res.status(200).json({token, dentist});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})

// LOGIN ROUTE FOR ADMIN

router.post('/admin', async (req, res)=> {
    try {
        const mailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validateAdmin(mailCheck,passwordCheck);
        let admin = await adminController.findByEmail(mailCheck);
        res.status(200).json({token, admin});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})


module.exports = router;