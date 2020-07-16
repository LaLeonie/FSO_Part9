import React from "react";
import { Entry } from "../../types";
import { Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../../types";

const HealtCheckEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let healthCheckSymbol;

  switch (entry.healthCheckRating) {
    case 0:
      healthCheckSymbol = <Icon color="green" heart name="heart" />;
      break;
    case 1:
      healthCheckSymbol = <Icon color="orange" heart name="heart" />;
      break;
    case 2:
      healthCheckSymbol = <Icon color="yellow" heart name="heart" />;
      break;
    case 3:
      healthCheckSymbol = <Icon color="red" heart name="heart" />;
      break;
    default:
      healthCheckSymbol = <Icon color="black" heart name="heart" />;
  }

  return (
    <>
      <h2>
        {entry.date} <Icon user doctor name="user doctor" />;
      </h2>
      {entry.description}
      {healthCheckSymbol}
    </>
  );
};

export default HealtCheckEntry;
