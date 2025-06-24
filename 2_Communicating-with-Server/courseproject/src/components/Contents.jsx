const Contents = ({content}) => {
    return (
        content.map((c, i) => 
            <p key={i}>
                {c.name} {c.exercises}
            </p>
        )
    )
}

export default Contents