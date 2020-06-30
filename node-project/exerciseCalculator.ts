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

const parsingArguments = (args: Array<string>): CalcValues => {
  const allArgsNumbers = args
    .slice(2)
    .map((el) => Number(el))
    .every((el) => !isNaN(el));
  if (allArgsNumbers) {
    const daysArray = args.slice(3).map((el) => Number(el));
    return {
      valueA: daysArray,
      valueB: Number(args[2]),
    };
  } else {
    throw new Error("provided arguments are not numbers!");
  }
};

const calculateExercises = (
  dailyHours: Array<number>,
  targetAmount: number
): calcResult => {
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

try {
  const { valueA, valueB } = parsingArguments(process.argv);
  console.log(calculateExercises(valueA, valueB));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
