import patientsData from "../../data/patients.json";
import {
  PatientEntry,
  NewPatientEntry,
  PublicPatient,
  ReturnedPatient,
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

const getEntryById = (id: string): ReturnedPatient => {
  const patient = patients.filter((patient) => patient.id === id);
  if (patient[0]) {
    return {
      id: patient[0].id,
      name: patient[0].name,
      dateOfBirth: patient[0].dateOfBirth,
      ssn: patient[0].ssn,
      gender: patient[0].gender,
      occupation: patient[0].occupation,
      entries: [],
    };
  }
  return { message: "No patient found with this id" };
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: idGenerator(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveData, getEntryById, addEntry };
