require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddlleware");
const port = process.env.PORT || 5000;
//connect to database
connectDB();
// setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST",
    allowedHeaders: "Content-Type,Authorization",
  })
);
//setup routes
app.use("/auth", auth);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
