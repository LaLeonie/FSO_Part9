import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<{ part: CoursePart }> = ({ parts }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          <h2>{part.name}</h2>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group projects: {part.groupProjectCount}</p>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <a href={part.exerciseSubmissionLink}>Submit exercises here</a>
        </>
      );
    default:
      return null;
  }
};

export default Part;
