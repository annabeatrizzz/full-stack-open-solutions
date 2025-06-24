const Summary = ({content}) => {
    const exercises = content.map(c => c.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return(
        <p>Total of {total} exercises</p>
    )
}

export default Summary