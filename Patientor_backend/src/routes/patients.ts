import express from "express";
import patientServices from "../services/patientsServices";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(patientServices.getNonSensitiveData());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientServices.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatientEntry);
});

export default router;
