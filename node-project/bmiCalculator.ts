type Result =
  | `Very severely underweight`
  | `Severely underweight`
  | `Underweight`
  | `Normal (healthy weight)`
  | `Overweight`
  | `Obese Class I (Moderately obese)`
  | `Obese Class II (Severely obese)`
  | `Obese Class III (Very severely obese)`
  | "there was an error";

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

const bmiCalculator = (height: number, weight: number): Result => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 15) {
    return `Very severely underweight`;
  } else if (bmi == 15 || bmi == 16) {
    return `Severely underweight`;
  } else if (16 < bmi && bmi <= 18.5) {
    return `Underweight`;
  } else if (18.5 < bmi && bmi <= 25) {
    return `Normal (healthy weight)`;
  } else if (25 < bmi && bmi <= 30) {
    return `Overweight`;
  } else if (30 < bmi && bmi <= 35) {
    return `Obese Class I (Moderately obese)`;
  } else if (35 < bmi && bmi <= 40) {
    return `Obese Class II (Severely obese)`;
  } else if (bmi < 40) {
    return `Obese Class III (Very severely obese)`;
  } else {
    return "there was an error";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
