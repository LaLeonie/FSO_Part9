import express from "express";
const router = express.Router();
import diagnosesServices from "../services/diagnosesServices";

router.get("/", (req, res) => {
  res.send(diagnosesServices.getEntries());
});

export default router;
