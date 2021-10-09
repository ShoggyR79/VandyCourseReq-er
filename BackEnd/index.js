const express = require("express");

const app = express()
const cors = require('cors');
const { rootRouter } = require("./routers/root.router");

app.use(cors());
app.use(express.json())

app.use("/api", rootRouter)

const port = 1234;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})