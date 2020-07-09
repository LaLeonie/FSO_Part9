import express from "express";
import patientServices from "../services/patientsServices";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(patientServices.getNonSensitiveData());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientServices.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default router;
