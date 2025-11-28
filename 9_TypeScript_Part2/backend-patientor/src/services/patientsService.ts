import { v1 as uuid } from 'uuid'
import patientsData from '../../data/patients';
import { NonSensitivePatientsEntry, PatientsEntry, NewPatientEntry } from '../types';

const patients: PatientsEntry[] = patientsData as PatientsEntry[];

const getEntries = (): PatientsEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (
    entry: NewPatientEntry
  ): PatientsEntry => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};