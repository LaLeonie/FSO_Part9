import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { useStateValue, setDiagnoses } from "../../state";
import { apiBaseUrl } from "../../constants";
import { Diagnosis, EntryType } from "../../types";
import { EntryTypeOption, SelectField } from "./FormField";

// import {TextField, SelectField}

import { Entry } from "../../types";
import { TextField } from "../../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddingEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  if (!diagnoses.length) {
    axios
      .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then((list) => {
        dispatch(setDiagnoses(list.data));
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  return (
    <Formik
      initialValues={{
        date: "",
        type: "Hospital",
        specialist: "",
        description: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is require";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

// export default AddEntryForm;
