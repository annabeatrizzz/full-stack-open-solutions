import type { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
        return <span>Description = {part.description}</span>

    case 'group':
        return <span>Group projects: {part.groupProjectCount}</span>
    
    case 'background':
        return <span>Description = {part.description} - Background material: {part.backgroundMaterial}</span>
      
    case 'special':
        return <span>Description = {part.description} - Requirements: {part.requirements.join(', ')}</span>

    default:
        return assertNever(part);
  }
};

export default Part;