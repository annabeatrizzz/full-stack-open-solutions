import diagnosesData from '../../data/diagnoses.ts';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData as DiagnosesEntry[];

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};