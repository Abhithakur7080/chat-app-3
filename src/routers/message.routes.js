import express from "express";
import { receiveMessage, sendMessage } from "../controller/message.controllers.js";

const router = express.Router();

router.post("/", sendMessage);
router.get('/:conservationId', receiveMessage)

export default router;
