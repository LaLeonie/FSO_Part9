import React from "react";
import { Modal, Segment, Button } from "semantic-ui-react";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
// import HealthCheckEntryForm from "./AddHealthCheckEntryForm";
import { Diagnosis } from "../../types";
import { useStateValue, setDiagnoses } from "../../state";
import { apiBaseUrl } from "../../constants";
import { HospitalEntryFormValues } from "./AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";

import axios from "axios";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  setType: (value: string) => void;
  setShowForm: (value: boolean) => void;
  showForm: boolean;
  type: string;
  submitHospitalEntry: (value: HospitalEntryFormValues) => void;
}

const AddEntryForm = ({
  modalOpen,
  onClose,
  error,
  setType,
  setShowForm,
  showForm,
  type,
  submitHospitalEntry,
}: Props) => {
  const onButtonClick = (str: string): any => {
    setType(str);
    setShowForm(true);
  };

  let form = (
    <AddHospitalEntryForm onSubmit={submitHospitalEntry} onCancel={onClose} />
  );

  let content;
  if (showForm) {
    content = form;
  } else {
    content = (
      <div>
        <h2>Select the type of entry</h2>
        <Button onClick={() => onButtonClick("Hospital")}>Hospital</Button>
        <Button onClick={() => onButtonClick("HealthCheck")}>
          Health Check
        </Button>
        <Button onClick={() => onButtonClick("OccupationalHealthcare")}>
          Occupational Healthcare
        </Button>
      </div>
    );
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Enter the details</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {content}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryForm;
