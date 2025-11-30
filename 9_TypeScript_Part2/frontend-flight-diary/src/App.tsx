import axios from 'axios'
import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'

function App() {

  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    }

    console.log(diaryToAdd)
    axios.post<DiaryEntry[]>('http://localhost:3000/api/diaries', diaryToAdd )
      .then(response => {
        setDiaries(diaries.concat(response.data));
    })

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  };

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data);
      setDiaries(response.data)
    })
  }, [])

  return (
    <>
      <h1>Flight Diaries</h1>
      
      <h2>Create a new diary:</h2>
      <form onSubmit={diaryCreation}>
        <div>
          Date <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Weather <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div><div>
          Visibility <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div><div>
          Comment <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>

      <h2>Diaries:</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}><b>{diary.date}</b><br></br>visibility: {diary.visibility} - weather: {diary.weather}</li>
        )}
      </ul>
    </>
  )
}

export default App
