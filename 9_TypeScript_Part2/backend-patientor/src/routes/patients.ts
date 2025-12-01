import express from 'express';
import toNewPatientEntry from '../utils';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patientInfo = patientsService.getById(req.params.id);

  if (patientInfo) {
    res.send(patientInfo);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry)

     res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;