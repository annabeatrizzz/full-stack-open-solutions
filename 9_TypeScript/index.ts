import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json()); 

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

app.post('/exercises', (_req, res) => {  
    const { hours, target } = _req.body;  

    if (!hours || !target) {
      return res.status(400).json({ error: "parameters missing" });
    }

    if (!Array.isArray(hours) || isNaN(Number(target))) {
      return res.status(400).json({ error: "malformatted parameters" });
    }

    const result = calculateExercises(
      hours.map(Number),
      Number(target)
    );
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});