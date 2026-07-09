require("dotenv").config();
const express = require("express");
// const cors = require("cors"); // ini klo kita mau pake front end
const connectDB = require("./src/config/db");
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middlewares/errorHandler");

const app = express();

connectDB();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ── Routes ────────────────────────────────────────────────────────────────
// Anggota 2 — Master Data (sudah aktif)
app.use("/api/stations", require("./src/routes/stationRoutes"));
app.use("/api/trains", require("./src/routes/trainRoutes"));
app.use("/api/bookings", require("./src/routes/bookingRoutes"));
app.use("/api/payments", require("./src/routes/paymentRoutes"));
// Auth & User management
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
// schedules
app.use("/api/schedules", require("./src/routes/scheduleRoutes"));

app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (req, res) => res.send("jalan bang"));

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(` Server berjalan di http://localhost:${PORT}`);
});
