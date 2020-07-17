import React from "react";
import { Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntryComponent: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <>
      <h2>
        {entry.date}
        <Icon heartbeat name="heartbeat" />
      </h2>
      {entry.description}
      <p>name: {entry.employerName}</p>
    </>
  );
};

export default OccupationalHealthcareEntryComponent;
