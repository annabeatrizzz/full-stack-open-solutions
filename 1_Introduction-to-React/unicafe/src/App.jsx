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

const Statistics = (props) => {

    let good = props.good
    let neutral = props.neutral
    let bad = props.bad
    let title = props.title
    
    let sumOfAll = good + neutral + bad
    let average = (good*1) + (bad*-1)
    let pctOfPositive = (good*100)/sumOfAll
    
    if (isNaN(pctOfPositive)) {
      pctOfPositive = 0
    }

    return (
      <div>
        <Title title={title} />
        <Result title='Good' value={good} />
        <Result title='Neutral' value={neutral} />
        <Result title='Bad' value={bad} />
        <Result title='All' value={sumOfAll} />
        <Result title='Average' value={average} />
        <Result title='Positive Percentage' value={pctOfPositive} />
      </div>
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

  return (
    <div>
      <Title title="Give Feedback" />
      <Button onClick={handleGoodClick} title="Good" />
      <Button onClick={handleNeutralClick} title="Neutral" />
      <Button onClick={handleBadClick} title="Bad" />

      <Statistics title='Statistics' good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App