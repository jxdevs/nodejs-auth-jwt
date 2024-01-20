const express = require("express");
const app = express();
require("./database.js")

app.listen(3000)
app.use(express.json())

app.use('/api',require("./routes/index"))


console.log("Servidor en ", 3000)


//julianricardobs
//XJEDG6nBnCpuIpD9