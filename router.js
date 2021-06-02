const router = require('express').Router();

const clinicsRouter = require('./routes/clinicsRouter');
const clientsRouter = require("./routes/clientsRouter");

router.use('/clinics', clinicsRouter);
router.use("/clients", clientsRouter);

module.exports = router ;