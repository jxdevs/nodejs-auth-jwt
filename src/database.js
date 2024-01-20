
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://julianricardobs:XJEDG6nBnCpuIpD9@mymongodb.oskqqxv.mongodb.net/?retryWrites=true&w=majority",{
}).then(db => console.log ("DB conectada"))
.catch(err=>console.log(err))