import React from "react";
import { useStateValue } from "../../state";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Textfield, DiagnosisSelection } from "./FormField";
import { OccupationalHealtChareFormValues } from "../../types";

export interface OccupationalHealthcareProps {
  onSubmit: (values: OccupationalHealtChareFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareForm: React.FC<OccupationalHealthcareProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h1>Occupational Healthcare Entry</h1>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={Textfield}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={Textfield}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={Textfield}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="YYYY-MM-DD"
              name="employerName"
              component={Textfield}
            />
            <h2>Sick Leave</h2>
            <Field
              label="Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={Textfield}
            />
            <Field
              label="End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={Textfield}
            />
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
export default AddOccupationalHealthcareForm;
