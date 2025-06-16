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

const StatisticLine = ({title, value}) => {
  return (
    <tr>
      <td>{title}</td> 
      <td>{value}</td>
    </tr>
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
        <table>
          <tbody>
            <StatisticLine title='Good' value={good} />
            <StatisticLine title='Neutral' value={neutral} />
            <StatisticLine title='Bad' value={bad} />
            <StatisticLine title='All' value={sumOfAll} />
            <StatisticLine title='Average' value={average} />
            <StatisticLine title='Positive Percentage' value={pctOfPositive} />
          </tbody>
        </table>
        
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

      
      {(good > 0 || bad > 0 || neutral > 0) 
      ? <Statistics title='Statistics' good={good} neutral={neutral} bad={bad} />
      : <Title title="No Feedback Given" />}
      

    </div>
  )
}

export default App