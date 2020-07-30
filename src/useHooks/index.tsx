import * as React from "react";

type Persist = {

}

// Persistent State Hook
export const usePersistentState = (key: string, initVal: number) => {
  const [value, setValue] = React.useState(() => {
    const perstVal = window.localStorage.getItem(key);
    return perstVal !== null ? JSON.parse(perstVal) : initVal;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
    return () => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
};
