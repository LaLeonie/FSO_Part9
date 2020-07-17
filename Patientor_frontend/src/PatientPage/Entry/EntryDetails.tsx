import React from "react";
import { Entry } from "../../types";
import HospitalEntryComponent from "./HospitalEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcare";
import { Container, Card } from "semantic-ui-react";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const style = {
    padding: "10px",
    backgroundColor: "#F4F4F6",
  };

  let entryContent;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      entryContent = <HospitalEntryComponent entry={entry} />;
      break;
    case "HealthCheck":
      entryContent = <HealthCheckEntryComponent entry={entry} />;
      break;
    case "OccupationalHealthcare":
      entryContent = <OccupationalHealthcareEntryComponent entry={entry} />;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <Card fluid color="black" style={style}>
      {entryContent}
    </Card>
  );
};

export default EntryDetails;
