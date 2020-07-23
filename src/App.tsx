import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

interface Reducer<R> {
  (state: R, action: R): R;
}

type Types = "ADD_TODO" | "TODO_COMPLETE" | "ALL_TODOS";

// These are optional. They make the code cleaner
// Ideally want to import these from another 'Types' folder.
const ADD_TODO: Types = "ADD_TODO";
const TODO_COMPLETE: Types = "TODO_COMPLETE";

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TODO_COMPLETE"; payload: any };

const initialState = { todos: [] };
type State = { todos: [] };

let reducer: Reducer<any>;
reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { id: uuidv4(), todos: action.payload }]
      };
    case TODO_COMPLETE:
      return state.todos.filter((todo: any) => todo.id !== state.todos);
    default:
      return state;
  }
};

interface ISubmitTodo {
  message: string | number | string[] | undefined;
}

// Persistent State Hook
function usePersistentState(key: string, initVal: any) {
  const [value, setValue] = React.useState(() => {
    const perstVal = window.localStorage.getItem(key);
    return perstVal !== null ? JSON.parse(perstVal) : initVal;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const App: React.FC<{ message?: ISubmitTodo; emptyMessage?: string }> = ({
  message,
  emptyMessage = ""
}) => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);

  const [text, setText] = usePersistentState("Todo", emptyMessage);

  // const [text, setText] = React.useState(emptyMessage);

  const handleDispatch = (e: any) => {
    e.preventDefault();
    if (text !== emptyMessage) {
      dispatch({ type: ADD_TODO, payload: text });
      setText(emptyMessage);
    }
  };

  const handleComplete = (e: any) => {
    e.preventDefault();
    dispatch({ type: TODO_COMPLETE });
  };

  const handleText = (e: any) => setText(e.target.value);

  console.log(todos.map((e: any) => e.id));

  return (
    <div className="App">
      <h1>Thabang's TypeScript Todo App</h1>
      <form onSubmit={handleComplete}>
        <input onChange={handleText} value={text} />
        <button onClick={handleDispatch}>Add Todo</button>
      </form>
      {todos.map((todo: any) => (
        <React.Fragment key={todo.id}>
          <input type="checkbox" onClick={handleComplete} />
          <p>{todo.todos}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;
