const router = require("express").Router();
const clientsController = require("../controllers/clientsController");

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

router.get("/", async(req, res) =>{
    try {
        res.json(await clientsController.findAllClients());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post("/")

module.exports = router;