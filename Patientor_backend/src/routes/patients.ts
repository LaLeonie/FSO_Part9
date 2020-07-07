import express from "express";
import patientServices from "../services/patientsServices";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(patientServices.getNonSensitiveData());
});

export default router;
