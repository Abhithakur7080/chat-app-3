import express from "express";
import {
  createConservation,
  findConservation,
} from "../controller/conservation.controllers.js";

const router = express.Router();

router.post("/", createConservation);
router.get("/:userId", findConservation);
export default router;
