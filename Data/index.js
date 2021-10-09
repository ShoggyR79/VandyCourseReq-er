const express = require("express");
const { rootRouter } = require("../Data/routers/root.router");

const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use("/api", rootRouter)

const port = 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})