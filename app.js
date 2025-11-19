const express = require('express');
require('./database/connection');
require('dotenv').config();
const app = express();
const cors = require('cors');
const authRoutes=require("./routes/auth/auth.route")
const bookingRoutes=require("./routes/booking/booking.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("",authRoutes);
app.use("", bookingRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
