interface bmiResult {
  weight: number;
  height: number;
  bmi: string;
}

interface BodyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error("not enough argument");
  if (args.length > 4) throw new Error("too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("provided arguments are not numbers!");
  }
};

export const bmiCalculator = (height: number, weight: number): bmiResult => {
  const bmi = weight / Math.pow(height / 100, 2);
  let verdict;
  if (bmi < 15) {
    verdict = `Very severely underweight`;
  } else if (bmi == 15 || bmi == 16) {
    verdict = `Severely underweight`;
  } else if (16 < bmi && bmi <= 18.5) {
    verdict = `Underweight`;
  } else if (18.5 < bmi && bmi <= 25) {
    verdict = `Normal (healthy weight)`;
  } else if (25 < bmi && bmi <= 30) {
    verdict = `Overweight`;
  } else if (30 < bmi && bmi <= 35) {
    verdict = `Obese Class I (Moderately obese)`;
  } else if (35 < bmi && bmi <= 40) {
    verdict = `Obese Class II (Severely obese)`;
  } else if (bmi < 40) {
    verdict = `Obese Class III (Very severely obese)`;
  } else {
    verdict = "there was an error";
  }
  return {
    weight,
    height,
    bmi: verdict,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export default bmiCalculator;
