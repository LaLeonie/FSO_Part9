import React from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <h3>Name: </h3>
      <p>id: {id}</p>
      <p>ssn: </p>
      <p>occupation: </p>
    </Container>
  );
};

export default PatientPage;
