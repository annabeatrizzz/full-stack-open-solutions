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

const MostVoted = (props) => {
  const votes = props.votes
  const title = props.title
  const anecdote = props.anecdote


  return (
    <div>
      <Title title={title} />
      <p>{votes} - {anecdote} </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))
  const [mostVoted, setMostVoted] = useState(0)
  const [qtdOfVotes, setQtdOfVotes] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1   
    console.log('selected', selected)
    if(qtdOfVotes < copy[selected]) {
      setQtdOfVotes(copy[selected])
      setMostVoted(selected)
    } 
    setVotes(copy) 
  }

  const generateRandomNumber = () => {
    setSelected(Math.floor(Math.random() * 8))
   
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
      
      <br></br>{anecdotes[selected]}<br></br>
      <p>{votes[selected]}</p>
      <Button onClick={addVote} title="Vote for this Anecdotes" />  
      <Button onClick={generateRandomNumber} title="Next Anecdotes" />  

      {(qtdOfVotes > 0) 
      && <MostVoted title="Most voted anecdotes" votes={qtdOfVotes} anecdote={anecdotes[mostVoted]}/>
      }
      
    </div>
  )
}

export default App