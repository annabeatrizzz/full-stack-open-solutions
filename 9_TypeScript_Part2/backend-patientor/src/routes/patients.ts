import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = _req.body;

  const addedEntry = patientsService.addPatient({
    name, 
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedEntry);
  res.json(patientsService.getNonSensitiveEntries());
});

export default router;