import Part from './Part';
import type { CoursePart } from '../types';

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
          Course = {part.name} - Exercises: {part.exerciseCount} - <Part part={part}/>
        </p>
      ))}
    </div>
  );
};

export default Content;