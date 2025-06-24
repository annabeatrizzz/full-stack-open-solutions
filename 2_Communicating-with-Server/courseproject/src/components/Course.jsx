import Contents from './Contents'

const Course = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
            <Contents content={course.parts}/>
        </div>
    )
}

export default Course