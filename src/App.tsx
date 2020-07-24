import * as React from "react";
import "./styles.css";
import { Input, Button, Box, Box1 } from "./components";
import { usePersistentState } from "./useHooks";
import { reducer, initialState } from "./reducer";
import { ADD_TODO, TODO_COMPLETE } from "./types";

interface ISubmitTodo {
  message: string | number | string[] | undefined;
}

const App: React.FC<{ message?: ISubmitTodo; emptyMessage?: string }> = ({
  message,
  emptyMessage = ""
}) => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);

  const [text, setText] = usePersistentState("Todo", "");

  // const [text, setText] = React.useState(emptyMessage);

  const handleDispatch = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (text !== emptyMessage) {
      dispatch({ type: ADD_TODO, payload: text });
      setText(emptyMessage);
    }
  };

  const handleComplete = (
    e: React.MouseEvent | React.FormEvent<HTMLElement>
  ): void => {
    e.preventDefault();
    dispatch({ type: TODO_COMPLETE });
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      {/* <h1>Thabang's TypeScript Todo App</h1> */}
      <form onSubmit={handleComplete}>
        <Input
          onChange={handleText}
          placeholder="e.g. Complete Server"
          value={text}
        />
        <Button onClick={handleDispatch}>Add Todo</Button>
      </form>
      <Box1>
        {todos.map((todo: any) => (
          <Box key={todo.id}>
            <p>{todo.todos}</p>
            <Button>Toggle Todo</Button>
          </Box>
        ))}
      </Box1>
    </div>
  );
};

export default App;
