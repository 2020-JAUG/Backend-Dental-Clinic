const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/", async(req, res) => {
    try {
        const data = req.body;
        res.json(await appointmentController.createAppointment(data));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async(req, res) => {
    try {
        res.json(await appointmentController.findAllAppointments());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put("/", async(req, res) => {
    try {
        const data = req.body;
        res.json(await appointmentController.modifyAppointment(data));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/", async(req, res) => {
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