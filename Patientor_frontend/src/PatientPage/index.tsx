import React from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

import axios from "axios";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  if (!patient || patient.id !== id) {
    console.log(patient);
    axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then((patient) =>
        dispatch({ type: "SET_PATIENT", payload: patient.data })
      )
      .catch((error) => console.error(error.response.data));
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
    </Container>
  );
};

export default PatientPage;
