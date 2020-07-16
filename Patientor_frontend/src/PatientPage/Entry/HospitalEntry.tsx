import React from "react";
import { Icon } from "semantic-ui-react";
import { HospitalEntry } from "../../types";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <>
      <h2>
        {entry.date}
        <Icon hospital symbol name="hospital" />;
      </h2>
      {entry.description}
      <h3>{entry.discharge}</h3>
      <p>
        {entry.discharge.date}:{entry.discharge.criteria}
      </p>
    </>
  );
};

export default HospitalEntryComponent;

// patient.entries.map((entry) => (
//   <p>
//     {entry.date}:{entry.description}
//     <ul>
//       {entry.diagnosisCodes
//         ? entry.diagnosisCodes.map((code) => <li>{code}</li>)
//         : null}
//     </ul>
//   </p>
// ));
