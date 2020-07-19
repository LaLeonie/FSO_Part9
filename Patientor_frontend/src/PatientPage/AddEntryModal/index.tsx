import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { AddingEntryForm, EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (value: EntryFormValues) => void;
  error?: string;
}

const AddEntryForm = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddingEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
