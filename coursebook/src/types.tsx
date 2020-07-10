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
