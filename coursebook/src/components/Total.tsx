import React from "react";
import { ContentProps, Course } from "../types";

const Total: React.FC<ContentProps> = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (carry: number, part: Course) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

export default Total;
