import { ADD_TODO, TODO_COMPLETE, ALL_TODOS } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Reducer<R> {
  (state: R, action: R): R;
}

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TODO_COMPLETE"; payload: any };

type State = { todos: [] };

export let reducer: Reducer<any>;
reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { id: uuidv4(), todos: action.payload }],
      };
    case TODO_COMPLETE:
      return state.todos.filter((todo: any) => todo.id !== state.todos);
    case ALL_TODOS:
      return;
    default:
      return state;
  }
};

export let initialState: State = { todos: [] };
