import React, { useState } from "react";
import EntryDetails from "./Entry/EntryDetails";
import AddEntryForm from "./AddEntryModal";
import { HospitalEntryFormValues } from "./AddEntryModal/AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from "./AddEntryModal/AddHealthCheckEntryForm";
import { OccupationalHealtChareFormValues } from "./AddEntryModal/AddOccupationalHealthcareForm";
import { Container, Card } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue, setPatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, HospitalEntry } from "../types";
import { Icon, Button } from "semantic-ui-react";

import axios from "axios";

export type EntryFormValues =
  | HospitalEntryFormValues
  | HealthCheckEntryFormValues
  | OccupationalHealtChareFormValues;

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [type, setType] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setShowForm(false);
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: returnedEntry } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (patient) {
        dispatch(addEntry(returnedEntry));
        closeModal();
      }
    } catch (e) {
      console.error(e.response);
      setError(e.response);
    }
  };

  if (!patient || patient.id !== id) {
    axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then((patient) => {
        console.log("patient", patient.data);
        dispatch(setPatient(patient.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const setGender = (gender: string) => {
    switch (gender) {
      case "male":
        return <Icon mars name="male" />;
      case "female":
        return <Icon venus name="female" />;
      default:
        return <Icon neuter />;
    }
  };

  return (
    <Container>
      <h2>
        {patient.name}
        {setGender(patient.gender)}
      </h2>
      <p>ssn: {patient.ssn} </p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <Card.Group>
        {patient.entries.map((entry) => (
          <EntryDetails entry={entry} />
        ))}
      </Card.Group>
      <AddEntryForm
        error={error}
        onClose={closeModal}
        modalOpen={modalOpen}
        setType={setType}
        setShowForm={setShowForm}
        showForm={showForm}
        type={type}
        submitEntry={submitEntry}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

export default PatientPage;
