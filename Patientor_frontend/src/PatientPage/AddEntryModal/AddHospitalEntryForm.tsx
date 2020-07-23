import React from "react";
import { useStateValue } from "../../state";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Textfield, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from "../../types";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export interface HospitalEntryProps {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm: React.FC<HospitalEntryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.discharge) {
          errors.discharge = requiredError;
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
            <Field
              label="Discharge Date"
              placeholder="Discharge Date"
              name="discharge.date"
              component={Textfield}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={Textfield}
            ></Field>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
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
export default AddHospitalEntryForm;
