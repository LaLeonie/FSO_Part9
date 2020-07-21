import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "AMEND_PATIENT";
      payload: { patient: Patient; entry: Entry };
    };

export const setPatientList = (list: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: list,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const amendPatient = (entry: Entry, patient: Patient): Action => {
  return {
    type: "AMEND_PATIENT",
    payload: { patient, entry },
  };
};

export const setDiagnoses = (list: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: list,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: state.diagnoses.concat(action.payload),
      };
    case "AMEND_PATIENT":
      return {
        ...state,
        patient: {
          ...action.payload.patient,
          entries: action.payload.patient.entries.concat(action.payload.entry),
        },
      };
    default:
      return state;
  }
};
