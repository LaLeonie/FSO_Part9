import React from "react";
import { Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcare";
import { Container } from "semantic-ui-react";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  let entryContent;

  switch (entry.type) {
    case "Hospital":
      entryContent = <HospitalEntry entry={entry} />;
      break;
    case "HealthCheck":
      entryContent = <HealthCheckEntry entry={entry} />;
      break;
    case "OccupationalHealthcare":
      entryContent = <OccupationalHealthcareEntry entry={entry} />;
      break;
    default:
      return null;
  }

  return <Container>{entryContent}</Container>;
};

export default EntryDetails;
