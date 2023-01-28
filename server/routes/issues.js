import express from "express";
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueById,
  updateViews,
} from "../controllers/issues.js";
import protectedRoute from "../middlware/protectedRoute.js";

const issueRoutes = express.Router();

issueRoutes.get("/", getIssues);
issueRoutes.get("/:id", getIssueById);
issueRoutes.patch("/:id/views", updateViews);

//user needs to login to access the routes
issueRoutes.post("/", protectedRoute, createIssue);
issueRoutes.patch("/:id", protectedRoute, updateIssue);
issueRoutes.delete("/:id", protectedRoute, deleteIssue);

export default issueRoutes;
