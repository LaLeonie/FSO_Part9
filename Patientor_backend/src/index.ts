import express from "express";
const app = express();
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
app.use(express.json());

const PORT = 3001;

app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.json({ hello: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
