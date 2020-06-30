interface calcResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalcValues {
  valueA: Array<number>;
  valueB: number;
}

// const parsingArguments = (args: Array<string>): CalcValues => {
//   //   if (args.length < 4) throw new Error("not enough argument");
//   //   if (args.length > 4) throw new Error("too many arguments");
//   const arguments = args.slice(2).join();
//   const regex = /\[.*\]/;
//   const array = arguments.match(regex)[0];
//   console.log(Array.from(array));
//   return {
//     valueA: Array.from(args[2]).map((n) => Number(n)),
//     valueB: Number(args[3]),
//   };
// };

const calculateExercises = (
  dailyHours: Array<number>,
  targetAmount: number
): calcResult => {
  console.log(dailyHours, targetAmount);
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h !== 0).length;
  const average = dailyHours.reduce((a, b) => a + b) / periodLength;
  const success = average > targetAmount ? true : false;
  let rating = 3;
  let ratingDescription = "Well done, you made it ";
  if (average < targetAmount - 1) {
    rating = 1;
    ratingDescription = "Oh no, not even close";
  } else if (average < targetAmount) {
    rating = 2;
    ratingDescription = `not too bad but could be better`;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };
};
const valueA = [3, 0, 2, 4.5, 0, 3, 1];
const valueB = 2;

console.log(calculateExercises(valueA, valueB));
