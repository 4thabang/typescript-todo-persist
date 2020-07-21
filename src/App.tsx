import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

// Persistent State Function
function usePersistentState(key: any, initVal: any) {
  const [value, setValue] = React.useState(() => {
    const perstVal = window.localStorage.getItem(key);
    perstVal !== null ? JSON.parse(perstVal) : initVal;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}

interface PropsA {
  (state: any, action: any): any;
}

enum Types {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO"
}

// These are optional. They make the code cleaner
// Ideally want to import these from another 'Types' folder.
const ADD_TODO = Types.ADD_TODO;
const DELETE_TODO = Types.DELETE_TODO;

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: any };

const initialState = { todos: [] };
type State = { todos: [] };

let reducer: PropsA;
reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { id: uuidv4(), todos: action.payload }]
      };
    case DELETE_TODO:
      return state.todos.filter((todo: any) => todo.id !== state.todos);
    default:
      return state;
  }
};

const App: React.FC<{ message: string }> = ({ message = "" }) => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);

  const [text, setText] = React.useState(message);

  const handleDispatch = (e: any) => {
    e.preventDefault();
    if (text !== "") {
      dispatch({ type: ADD_TODO, payload: text });
      setText(message);
    }
  };

  const handleComplete = (e: any) => {
    e.preventDefault();
    dispatch({ type: DELETE_TODO });
  };

  const handleText = (e: any) => setText(e.target.value);

  return (
    <div className="App">
      <h1>Thabang's TypeScript Todo App</h1>
      <form onSubmit={handleComplete}>
        <input onChange={handleText} value={text} />
        <button onClick={handleDispatch}>Add Todo</button>
      </form>
      {todos.map((todo: any, id: any) => (
        <React.Fragment key={id}>
          <p>{todo.todos}</p>
          <button onClick={handleComplete}>Mark Complete</button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;
