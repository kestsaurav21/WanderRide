const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes")

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/vehicle", vehicleRoutes)

module.exports = app;
