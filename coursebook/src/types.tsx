export interface HeaderProps {
  name: string;
}

export interface Course {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  parts: Array<Course>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface ExtendedCoursePartBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends ExtendedCoursePartBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends ExtendedCoursePartBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
