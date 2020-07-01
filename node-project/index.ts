import express = require("express");
const app = express();
const bodyParser = require("body-parser");
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = bmiCalculator(Number(height), Number(weight));
    res.json(result);
  }
  res.status(400).json({
    error: "malformatted parameters",
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  } else {
    const exArray = JSON.parse(daily_exercises);
    const targetValue = JSON.parse(target);
    if (
      Array.isArray(exArray) &&
      exArray.every((el) => !isNaN(el)) &&
      !isNaN(targetValue)
    ) {
      const {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        average,
      } = exerciseCalculator(exArray, targetValue);
      res.json({
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      });
    } else {
      res.status(400).json({
        error: "malformatted parameters",
      });
    }
  }
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
