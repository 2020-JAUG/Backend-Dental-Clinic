const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const authClient = require("../middleware/authClient");
const authDentist = require("../middleware/authDentist");
const admin = require("../middleware/admin");



router.post("/", authClient, async(req, res) => {
    try {
        const data = req.body;
        res.json(await appointmentController.createAppointment(data));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", admin, async(req, res) => {
    try {
        res.json(await appointmentController.findAllAppointments());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post("/client", authClient, async(req, res) => {
    try {
        const id = req.body.id;
        res.json(await appointmentController.findByClient(id));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post("/schedule", authDentist, async(req, res) => {
    try {
        const date = req.body.date;
        const dentistId = req.body.dentist;
        res.json(await appointmentController.findByDate(date, dentistId));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put("/", authClient, async(req, res) => {
    try {
        const data = req.body;
        res.json(await appointmentController.modifyAppointment(data));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/", admin, async(req, res) => {
    try {
        const data = req.body;
        res.json(await appointmentController.removeAppointment(data));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;