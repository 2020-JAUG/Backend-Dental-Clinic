const express = require("express");
const app = express();
const router = require('./router');
const port = 3000;
const db = require("./config/mongoose");
const cors = require('cors');

app.use(express.json());
app.use(router);
app.use(cors());

db
.then(() => {
    app.listen(port, () => console.log(`Node server runing on http://localhost:${port}` ));
})
.catch((err) => console.log(err.message));