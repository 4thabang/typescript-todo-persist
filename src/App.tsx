import * as React from "react";
import "./styles.css";
import { Input, Button, Box, Box1 } from "./components";
import { usePersistentState } from "./useHooks";
import { reducer, initialState } from "./reducer";
import { ADD_TODO, TODO_COMPLETE } from "./types";

const App = () => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);

  const [text, setText] = usePersistentState("Todos", "");

  const handleDispatch = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (text !== "") {
      dispatch({ type: ADD_TODO, payload: text });
      setText("");
    }
  };

  const handleComplete = (
    e: React.MouseEvent | React.FormEvent<HTMLElement>
  ): void => {
    e.preventDefault();
    dispatch({ type: TODO_COMPLETE });
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const [data, setData] = React.useState<any>("");
  React.useEffect(() => {
    const url = "http://86.150.218.137:8080/";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((todo) => {
        return setData(todo);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(data);

  return (
    <div className="App">
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
