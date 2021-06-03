const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');
const clientsRouter = require("./routes/clientsRouter");
const dentistRouter = require('./routes/dentistRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const loginRouter = require('./routes/loginRouter');


router.use('/clinics', clinicsRouter);
router.use("/clients", clientsRouter);
router.use('/dentists', dentistRouter);
router.use('/appointment', appointmentRouter);
router.use('/login', loginRouter);

module.exports = router ;