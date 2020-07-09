import { NewPatientEntry } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseString = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`incorrect or missing name:${name}`);
  }
  return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (obj: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(obj.name),
    dateOfBirth: parseString(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseString(obj.gender),
    occupation: parseString(obj.occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
