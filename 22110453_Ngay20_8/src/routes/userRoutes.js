const express = require("express");
const app = express();
const path = require("path");

// middleware để parse body form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set view engine = ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ROUTE để load CRUD page
app.get("/crud", (req, res) => {
    res.render("users/crud");
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

