const router = require("express").Router();
const clientsController = require("../controllers/clientsController.js");
const authClient = require('../middleware/authClient.js');
const admin = require("../middleware/admin.js");

// POST - Create a new client

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

// GET - Find all data of all clients

router.get("/", async(req, res) => {
    try {
        res.json(await clientsController.findAllClients());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


// POST - Client can check his own profile 

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

// PUT - Client can modify some attributes of his profile

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


// DELETE - Client can delete his profile

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