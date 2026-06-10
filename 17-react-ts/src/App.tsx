// can add .tsx but not required
import Header from "./components/Header.tsx";
import goalsImg from "./assets/goals.jpg";
import CourseGoals from "./components/CourseGoals.tsx";
import { useState } from "react";
import NewGoal from "./components/NewGoal.tsx";

const GOALS = [
  {
    id: 1,
    title: "Learn ts",
    description: "Learn ts from the scratch",
  },
  { id: 2, title: "Practice TS", description: "Lorem Ipsum" },
];

function App() {
  // useState is a generic type, so we can pass a type into <> to define what type we'll manage with it
  // passing initial state will cause infering type from it
  const [goals, setGoals] = useState(GOALS);

  function handleDelete(goalId: number) {
    setGoals((goals) => goals.filter((goal) => goal.id !== goalId));
  }

  function handleAdd(text: string, summary: string) {
    setGoals((goals) =>
      goals.concat({ id: Math.random(), title: text, description: summary }),
    );
  }

  return (
    <main>
      <Header image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Course goals!</h1>
      </Header>
      <CourseGoals goals={goals} onDelete={handleDelete} />
      <NewGoal onAdd={handleAdd} />
    </main>
  );
}

export default App;
