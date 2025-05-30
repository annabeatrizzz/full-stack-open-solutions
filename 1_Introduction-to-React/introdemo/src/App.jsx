const Header = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
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

const Part = ({partInfo}) => {
  return (
    <p>
      {partInfo.name} {partInfo.exercises}
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
  
  const course = 'Half Stack application development'
  
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <Header title={course}/>
      <Content parts={[part1, part2, part3]}/>
      <Total parts={[part1, part2, part3]}/>
    </div>
  )
}

export default App