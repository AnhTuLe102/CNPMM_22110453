import { Request, Response } from "express";
import User from "../models/User";

// CREATE (form submit từ crud.ejs)
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/users"); // quay về list sau khi tạo
  } catch (err: any) {
    console.error("Create User Error:", err.message);
    res.status(400).send("Error: " + err.message);
  }
};

// READ ALL (render list user)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.render("users/findAllUser", { datalist: users });
  } catch (err: any) {
    console.error("Get Users Error:", err.message);
    res.status(500).send("Error: " + err.message);
  }
};

// READ ONE (hiện form edit)
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string; // ép kiểu
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.render("users/crud", { user }); // truyền dữ liệu user vào form edit
  } catch (err: any) {
    console.error("Get User Error:", err.message);
    res.status(400).send("Invalid ID");
  }
};

// UPDATE
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string;
    await User.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect("/users");
  } catch (err: any) {
    console.error("Update User Error:", err.message);
    res.status(400).send("Error: " + err.message);
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (err: any) {
    console.error("Delete User Error:", err.message);
    res.status(400).send("Error: " + err.message);
  }
};

