const User = require("../models/User");

// CREATE (form submit từ crud.ejs)
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.redirect("/users"); // quay về list sau khi tạo
    } catch (err) {
        console.error("Create User Error:", err.message);
        res.status(400).send("Error: " + err.message);
    }
};

// READ ALL (render list user)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render("findAllUser", { datalist: users });
    } catch (err) {
        console.error("Get Users Error:", err.message);
        res.status(500).send("Error: " + err.message);
    }
};

// READ ONE (hiện form edit)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // đổi từ req.query.id sang req.params.id cho RESTful
        if (!user) return res.status(404).send("User not found");
        res.render("crud", { user }); // truyền dữ liệu user vào form edit
    } catch (err) {
        console.error("Get User Error:", err.message);
        res.status(400).send("Invalid ID");
    }
};

// UPDATE
exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/users");
    } catch (err) {
        console.error("Update User Error:", err.message);
        res.status(400).send("Error: " + err.message);
    }
};

// DELETE
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // dùng params thay vì query
        res.redirect("/users");
    } catch (err) {
        console.error("Delete User Error:", err.message);
        res.status(400).send("Error: " + err.message);
    }
};
