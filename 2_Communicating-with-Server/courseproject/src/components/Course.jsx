import Contents from './Contents'
import Summary from './Summary'

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