const express = require("express");

const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use("/api", )

const port = 1234;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})