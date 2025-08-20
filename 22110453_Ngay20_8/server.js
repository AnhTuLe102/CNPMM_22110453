require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./src/config/db"); // file kết nối DB
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để parse body form & json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine = ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Routes
app.use("/", userRoutes);

// Kết nối DB (nếu có) rồi start server
connectDB();
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
