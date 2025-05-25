const Header = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partInfo={props.parts[0]} />
      <Part partInfo={props.parts[1]} />
      <Part partInfo={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.partInfo.part} {props.partInfo.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const parts = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App