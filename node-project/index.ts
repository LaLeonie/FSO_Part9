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
  console.log(daily_exercises, target);
  res.json({
    periodLength: 7,
    trainingDays: 4,
    success: false,
    rating: 1,
    ratingDescription: "bad",
    target: 2.5,
    average: 1.2142857142857142,
  });
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
