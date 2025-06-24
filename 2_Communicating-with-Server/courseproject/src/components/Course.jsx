const Contents = ({content}) => {
    return (
        content.map((c, i) => 
            <p key={i}>
                {c.name} {c.exercises}
            </p>
        )
    )
}

const Summary = ({content}) => {
    const exercises = content.map(c => c.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return(
        <p>Total of {total} exercises</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
            <Contents content={course.parts}/>
            <Summary content={course.parts}/>
        </div>
    )
}

export default Course