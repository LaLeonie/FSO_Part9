import React from "react";
import { useStateValue } from "../../state";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Textfield, DiagnosisSelection } from "./FormField";
import { HealthCheckEntry } from "../../types";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
