import { useRef, type FormEvent } from "react";

interface NewGoalProps {
  onAdd: (text: string, summary: string) => void;
}

function NewGoal({ onAdd }: NewGoalProps) {
  // letting TS know which value we'll be store with these refs since it can't get it from jsx attachment
  const goalRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);

  // course says use FormEvent but docs say FormEvent is deprecated (doesn't actually exist?) and we should use some other event like SubmitEvent InputEvent etc
  // ok I googled and FormEvent + FormEventHandler were deprecated since React 19 (replaced by well SubmitEvent and SubmitEventHandler)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // but for this we're getting an error with onSubmit because it won't usable with SubmitEvent
    // ig should read more docs to understand how to do it properly in React 19, but anyway I'll probably use RHF so...
    // function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const enteredGoal = goalRef.current!.value;
    const enteredSummary = summaryRef.current!.value;

    //...validation
    onAdd(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={goalRef} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" ref={summaryRef} />
      </p>
      <p>
        <button>Add goal</button>
      </p>
    </form>
  );
}

export default NewGoal;
