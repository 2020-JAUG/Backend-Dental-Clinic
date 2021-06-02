const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');
const clientsRouter = require("./routes/clientsRouter");
const dentistRouter = require('./routes/dentistRouter')

router.use('/clinics', clinicsRouter);
router.use("/clients", clientsRouter);
router.use('/dentists', dentistRouter);

module.exports = router ;