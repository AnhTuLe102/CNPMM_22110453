import { Router, Request, Response } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router: Router = Router();

// ROUTE để load CRUD page
router.get("/crud", (req: Request, res: Response) => {
  res.render("users/crud", { user: null });
});

// CRUD routes
router.get("/users", getUsers);
router.post("/api/users", createUser);
router.get("/edit-crud", getUser);
router.post("/update-crud", updateUser);
router.get("/delete-crud", deleteUser);

export default router;


