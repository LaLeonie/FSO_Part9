import {
  NewPatientEntry,
  Gender,
  Entry,
  newEntry,
  EntryType,
  newBaseEntry,
  DischargeEntry,
  HealthCheckRating,
  SickLeaveEntry,
  DiagnoseEntry,
} from "./types";

export const assertNever = (value: any): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (entryArray: any): boolean => {
  const arr = ["OccupationalHealthcare", "HealthCheck", "Hospital"];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const filteredEntries = entryArray.filter((el: any) => arr.includes(el.type));
  return Boolean(filteredEntries);
};

const isArrayOfStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
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

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isEntryType(entries)) {
    throw new Error(`incorrect or missing type`);
  }
  return entries;
};

const parseEntryTypes = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`incorrect or missing type`);
  }
  return type;
};

const parseDischarge = (obj: any): DischargeEntry => {
  if (!obj || !isDate(obj.date) || isString(obj.criteria)) {
    throw new Error(`incorrect or missing type`);
  }
  return {
    date: obj.date,
    criteria: obj.criteria,
  };
};

const parseHealthCheckRating = (healtCheckRating: any): HealthCheckRating => {
  if (!healtCheckRating || !isHealthCheckRating(healtCheckRating)) {
    throw new Error(`incorrect or missing gender: ${healtCheckRating}`);
  }
  return healtCheckRating;
};

const parseSickLeave = (obj: any): SickLeaveEntry => {
  if (!obj || !isString(obj.startDate) || isString(obj.endDate)) {
    throw new Error(`incorrect or missing type`);
  }
  return {
    startDate: obj.startDate,
    endDate: obj.endDate,
  };
};

const parseDiagnosesCodes = (
  diagnosisCodes: any
): Array<DiagnoseEntry["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error(`incorrect or missing type`);
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (obj: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
  };

  return newEntry;
};

const toNewBaseEntry = (obj: any): newBaseEntry => {
  const newBaseEntry: newBaseEntry = {
    description: parseString(obj.description),
    date: parseDate(obj.date),
    specialist: parseString(obj.specialist),
  };
  if (obj.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(obj.diagnosisCodes);
  }
  return newBaseEntry;
};

export const toNewEntry = (obj: any): newEntry => {
  const baseEntry = toNewBaseEntry(obj);
  const type = parseEntryTypes(obj.type);

  switch (type) {
    case EntryType.HealthCheck:
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
    case EntryType.Hospital:
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(obj.discharge),
      };
    case EntryType.OccupationalHealthCare:
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(obj.employerName),
        sickLeave: parseSickLeave(obj.sickLeave),
      };
    default:
      return assertNever(obj);
  }
};
