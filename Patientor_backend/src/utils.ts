import { NewPatientEntry, Gender } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseString = (name: any): string => {
  if (!name || !isString(name)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`incorrect or missing name:${name}`);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || isDate(date)) {
    throw new Error(`incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (obj: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
    entries: [],
  };

  return newEntry;
};

export default toNewPatientEntry;
