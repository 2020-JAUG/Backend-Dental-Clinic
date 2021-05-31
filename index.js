const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/mongoose");

app.use(express.json());

db
.then(() => {
    app.listen(port, () => console.log(`Node server runing on http://localhost:${port}` ));
})
.catch((err) => console.log(err.message));