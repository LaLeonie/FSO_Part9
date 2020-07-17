import patientsData from "../../data/patients";
import {
  PatientEntry,
  NewPatientEntry,
  PublicPatient,
  newEntry,
  Entry,
} from "../types";
import idGenerator from "../utilities/idGenerator";

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveData = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntryById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: idGenerator(),
    entries: [],
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: newEntry, patient: PatientEntry): Entry => {
  const newEntry = {
    id: idGenerator(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveData,
  getEntryById,
  addPatientEntry,
  addEntry,
};
