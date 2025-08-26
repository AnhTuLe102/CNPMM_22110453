import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import path from "path";
import connectDB from "./src/config/db";
import userRoutes from "./src/routes/userRoutes";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Middleware để parse body form & json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine = ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Main route
app.get("/", (req: Request, res: Response) => {
  res.redirect("/users");
});

// Routes
app.use("/", userRoutes);

// Kết nối DB (nếu có) rồi start server
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
