import axios from 'axios'
import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'

function App() {

  const [newNote, setNewNote] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data);
      setDiaries(response.data)
    })
  }, [])

  return (
    <>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}><b>{diary.date}</b><br></br>visibility: {diary.visibility} - weather: {diary.weather}</li>
        )}
      </ul>
    </>
  )
}

export default App
