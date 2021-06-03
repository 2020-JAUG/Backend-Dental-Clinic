const router = require("express").Router();
const clientsController = require("../controllers/clientsController");
const auth = require('../middleware/auth.js');


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

router.get("/", async(req, res) => {
    try {
        res.json(await clientsController.findAllClients());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/profile', async(req, res) => {
    try {
        let id = req.body.id;
        res.json(await clientsController.findById(id));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.put("/", async(req, res) => {
    try {
        const body = req.body;
        res.json(await clientsController.modifyClient(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/", async(req, res) => {
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