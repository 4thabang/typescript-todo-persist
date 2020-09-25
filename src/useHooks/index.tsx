import * as React from "react";

type Persist = {
  key: string;
  initVal: any;
};

// Persistent State Hook
export const usePersistentState = (
  key: Persist["key"],
  initVal: Persist["initVal"]
) => {
  const [value, setValue] = React.useState(() => {
    const perstVal: string | null = window.localStorage.getItem(key);
    return perstVal !== null ? JSON.parse(perstVal) : initVal;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
