import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  getAdminDashboard,
  enrollUserInCourse,
} from "../controllers/adminController.js";
import { getAllPayments } from "../controllers/paymentController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const adminRouter = express.Router();

// All routes require authentication and admin role
adminRouter.use(authenticate);
adminRouter.use(authorize("admin"));

adminRouter.route("/users").get(getAllUsers);

adminRouter
  .route("/users/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

adminRouter.post("/users/:id/role", changeUserRole);
adminRouter.post("/enroll-user", enrollUserInCourse);
adminRouter.get("/dashboard", getAdminDashboard);
adminRouter.get("/payments", getAllPayments);

export default adminRouter;
