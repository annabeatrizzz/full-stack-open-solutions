interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[] | { [key: string]: CoursePart };
}

const Content = (props: ContentProps) => {
  const partsArray = Array.isArray(props.courseParts)
    ? props.courseParts
    : Object.values(props.courseParts);

  return (
    <div>
      {partsArray.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;