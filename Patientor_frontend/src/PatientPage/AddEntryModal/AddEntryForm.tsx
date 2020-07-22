import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { useStateValue, setDiagnoses } from "../../state";
import { apiBaseUrl } from "../../constants";
import { Diagnosis, EntryType } from "../../types";
import { EntryTypeOption, NumberField, DiagnosisSelection } from "./FormField";

// import {TextField, SelectField}

import { Entry } from "../../types";
import { TextField } from "../../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  type: string;
}

const typeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddingEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  type,
}) => {
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

  let extendedForm = (
    <div>
      <h3>Discharge Note</h3>
      <Field
        label="Discharge Date"
        placeholder="Discharge Date"
        name="date"
        component={TextField}
      />
      <Field
        label="Discharge Criteria"
        placeholder="Criteria"
        name="criteria"
        component={TextField}
      />
    </div>
  );
  if (type === "HealthCheck") {
    extendedForm = (
      <div>
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      </div>
    );
  }

  if (type === "OccupationalHealthcare") {
    extendedForm = (
      <div>
        <Field
          label="Employer name"
          placeholder="Employer name"
          name="name"
          component={TextField}
        />
        <h3>Sick Leave Note</h3>
        <Field
          label="Start Date"
          placeholder="Start Date"
          name="start date"
          component={TextField}
        />
        <Field
          label="End Date"
          placeholder="End Date"
          name="end date"
          component={TextField}
        />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        employerName: "",
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
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h1>{type} entry</h1>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <p>{extendedForm}</p>
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
