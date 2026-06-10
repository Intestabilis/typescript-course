// import type { FC } from "react";

interface Goal {
  id: number;
  title: string;
  description: string;
}

interface CourseGoalsProps {
  goals: Goal[];
  // type of a prop is a function
  onDelete: (goalId: number) => void;
}

// Older alternative way of defining prop types (may see in some older projects)
// we're assigning type to CourseGoals and that type if FC
// const CourseGoals: FC<CourseGoalsProps> = ({ goals }) => {
// Recommended way of defining props type (well how you should do it now)

function CourseGoals({ goals, onDelete }: CourseGoalsProps) {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <article>
            <div>
              <h2>{goal.title}</h2>
              <p>{goal.description}</p>
            </div>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default CourseGoals;
