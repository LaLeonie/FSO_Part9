import React, { useState } from "react";
import EntryDetails from "./Entry/EntryDetails";
import AddEntryForm from "./AddEntryModal";
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";

import { Container, Card } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue, setPatient, amendPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, newEntry, Entry } from "../types";
import { Icon, Button } from "semantic-ui-react";

import axios from "axios";

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

  const submitNewEntry = async (values: EntryFormValues) => {
    const entryToSubmit = {
      ...values,
      type,
    };
    console.log("entry to submit", entryToSubmit);
    try {
      const { data: returnedEntry } = await axios.post<newEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entryToSubmit
      );
      const entry: Entry = {
        ...returnedEntry,
        id: "Test id",
      };
      if (patient) {
        dispatch(amendPatient(entry, patient));
        closeModal();
        setShowForm(false);
      }
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient || patient.id !== id) {
    axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then((patient) => {
        console.log("patient", patient);
        dispatch(setPatient(patient.data));
      })
      .catch((error) => {
        console.error(error.response.data);
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
        {patient ? patient.name : null}
        {setGender(patient ? patient.gender : "other")}
      </h2>
      <p>ssn: {patient ? patient.ssn : null} </p>
      <p>occupation: {patient ? patient.occupation : null}</p>
      <h3>entries</h3>
      <Card.Group>
        {!patient
          ? null
          : patient.entries.map((entry) => <EntryDetails entry={entry} />)}
      </Card.Group>
      <AddEntryForm
        error={error}
        onClose={closeModal}
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        setType={setType}
        setShowForm={setShowForm}
        showForm={showForm}
        type={type}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

export default PatientPage;
