const router = require("express").Router();
const clientsController = require("../controllers/clientsController");
const authClient = require('../middleware/authClient.js');
const authDentist = require('../middleware/authDentist.js');
const admin = require("../middleware/admin");


router.post("/", async(req, res) => {
    try {
        const client = req.body;
        res.json(await clientsController.createClient(client));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", admin, async(req, res) => {
    try {
        res.json(await clientsController.findAllClients());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/profile', authClient, async(req, res) => {
    try {
        let id = req.body.id;
        res.json(await clientsController.findById(id));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.put("/", authClient, async(req, res) => {
    try {
        const body = req.body;
        res.json(await clientsController.modifyClient(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/", authClient, async(req, res) => {
    try {
        const body = req.body;
        res.json(await clientsController.removeClient(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;