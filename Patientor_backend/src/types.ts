export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface ErrorNotification {
  message: string;
}

interface DischargeEntry {
  date: string;
  criteria: string;
}

interface SickLeaveEntry {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DischargeEntry;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveEntry;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type ReturnedPatient = PatientEntry | ErrorNotification;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PublicPatient = Omit<PatientEntry, "ssn" | "entries">;
