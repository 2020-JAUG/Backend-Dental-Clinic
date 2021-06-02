const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');
const clientsRouter = require("./routes/clientsRouter");
const dentistRouter = require('./routes/dentistRouter');
const appointmentRouter = require('./routes/appointmentRouter');

router.use('/clinics', clinicsRouter);
router.use("/clients", clientsRouter);
router.use('/dentists', dentistRouter);
router.use('/appointment', appointmentRouter);

module.exports = router ;