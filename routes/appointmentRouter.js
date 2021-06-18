const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController.js");
const authClient = require("../middleware/authClient.js");
const authDentist = require("../middleware/authDentist.js");
const admin = require("../middleware/admin.js");


// POST - Create a new appointment

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

// GET - Return all appointments history in the database.

router.get("/", admin, async(req, res) => {
    try {
        res.json(await appointmentController.findAllAppointments());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// POST - Find all active appointments by client

router.post("/client", authClient, async(req, res) => {
    try {
        const id = req.body.client;
        res.json(await appointmentController.findByClient(id));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// POST - Find all appointments active to a dentist by date

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

// PUT - Modify an appointment by the client

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

// DELETE - Remove an appointment by the admin

router.delete("/", authClient, async(req, res) => {
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