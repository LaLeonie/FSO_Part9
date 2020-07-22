import React, { useState, useEffect } from "react";
import { Modal, Segment, Button } from "semantic-ui-react";
import { AddingEntryForm, EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (value: EntryFormValues) => void;
  error?: string;
  setType: (value: string) => void;
  setShowForm: (value: boolean) => void;
  showForm: boolean;
  type: string;
}

const AddEntryForm = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  setType,
  setShowForm,
  showForm,
  type,
}: Props) => {
  let content;

  const onButtonClick = (str: string): any => {
    setType(str);
    setShowForm(true);
  };

  if (showForm) {
    content = (
      <div>
        <AddingEntryForm onSubmit={onSubmit} onCancel={onClose} type={type} />
      </div>
    );
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
