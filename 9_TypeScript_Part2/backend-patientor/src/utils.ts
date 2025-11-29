import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name');
  }

  return name;
};

const parseBirth = (birth: unknown): string => {
  if (!isString(birth)) {
    throw new Error('Incorrect date of birth');
  }

  return birth;
};


const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect date of occupation');
  }

  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
      throw new Error('Incorrect ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    console.log(object)

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        console.log('here' , newEntry)
        return newEntry;
    }
    
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;