import express from "express";
import patientServices from "../services/patientsServices";
import { toNewPatientEntry, toNewEntry } from "../utils";
import patients from "../../data/patients";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(patientServices.getNonSensitiveData());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientServices.addPatientEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  res.json(patientServices.getEntryById(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  const patient = patientServices.getEntryById(req.params.ids);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientServices.addEntry(newEntry, patient);
      res.json(addedEntry);
    } catch (e) {
      res.status(404).send(e.message);
    }
  } else {
    res.status(404).send({ error: "Sorry, this patient does not exist" });
  }
});

export default router;
