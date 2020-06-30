import express = require("express");
const app = express();
import bmiCalculator from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const result = bmiCalculator(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.json(result);
  }
  res.status(400).json({
    error: "malformatted parameters",
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
