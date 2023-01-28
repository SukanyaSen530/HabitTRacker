import express from "express";

import issueRoutes from "./issues.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/issues", issueRoutes);
router.use("/users", userRoutes);

export default router;
