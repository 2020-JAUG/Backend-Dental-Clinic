const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');
const clientsRouter = require("./routes/clientsRouter");
const appointmentRouter = require('./routes/appointmentRouter');

router.use('/clinics', clinicsRouter);
router.use("/clients", clientsRouter);
router.use('/appointment', appointmentRouter);

module.exports = router ;