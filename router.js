const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');

router.use('/clinics', clinicsRouter);

module.exports = router ;