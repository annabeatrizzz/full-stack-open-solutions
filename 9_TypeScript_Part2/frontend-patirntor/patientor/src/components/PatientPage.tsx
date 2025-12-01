import { useState } from "react"
import type { Patient } from "../types";
import { useParams } from "react-router-dom";

interface Props {
  patients : Patient[]
}

const PatientPage = ({ patients }: Props) => {
    const { id } = useParams<{ id: string }>();    
    const patient = patients.find(p => p.id === id) || null;
  
    return (
        <>
            <h2>Patient Details</h2>
            <p>Name: { patient?.name }</p>
            <p>Gender: { patient?.gender }</p>
            <p>Ssn: { patient?.ssn }</p>
            <p>Occupation: { patient?.occupation }</p><br></br>
            <p>Entries:</p>
            { patient?.entries?.map((entry, i) => (
              <div key={entry.id ?? i}>
                <p>{entry.date}: {entry.description}</p>
                <ul>
                    { entry.diagnosisCodes?.map((code) => (
                        <li key={code}>{code}</li>
                    )) }
                </ul>
              </div>
            ))}
        </>
    )
}

export default PatientPage;