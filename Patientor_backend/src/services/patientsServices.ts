import patientsData from "../../data/patients.json";
import { PatientEntry, NewPatientEntry } from "../types";
import idGenerator from "../utilities/idGenerator";

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveData = (): Omit<PatientEntry, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: idGenerator(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveData, addEntry };
