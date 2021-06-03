const router = require('express').Router();
const loginController = require('../controllers/loginController');
const clientsController = require('../controllers/clientsController');
const dentistController = require('../controllers/dentistController');


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

module.exports = router;