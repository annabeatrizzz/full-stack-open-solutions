import express from 'express';
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const query = _req.query;
    if (!query.height || !query.weight) {
        res.send({
            error: "malformatted parameters"
        });
    }

    const height = Number(query.height);
    const weight = Number(query.weight);
    
    res.send({
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight)
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});