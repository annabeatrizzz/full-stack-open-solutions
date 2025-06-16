import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = ({onClick, title}) => {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

const Result = ({title, value}) => {
  return (
    <p>{title}: {value}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const sumOfAll = good + neutral + bad
  const average = (good*1) + (bad*-1)
  const pctOfPositive = (good*100)/sumOfAll

  return (
    <div>
      <Title title="Give Feedback" />
      <Button onClick={handleGoodClick} title="Good" />
      <Button onClick={handleNeutralClick} title="Neutral" />
      <Button onClick={handleBadClick} title="Bad" />

     <Title title="Statistics" />
      <Result title='Good' value={good} />
      <Result title='Neutral' value={neutral} />
      <Result title='Bad' value={bad} />
      <Result title='All' value={sumOfAll} />
      <Result title='Average' value={average} />
      <Result title='Positive Percentage' value={pctOfPositive} />

    </div>
  )
}

export default App