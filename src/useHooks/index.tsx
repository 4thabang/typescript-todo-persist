import * as React from "react";

// Declare Reract hooks
const { useState, useEffect } = React;

type Persist = {
  key: string;
  initVal: any;
};

// Persistent State Hook
const usePersistentState = (
  key: Persist["key"],
  initVal: Persist["initVal"]
) => {
  const persistentState = () => {
    const valueKey: string | null = window.localStorage.getItem(key);
    return valueKey != null ? JSON.parse(valueKey) : initVal;
  };
  
  const [value, setValue] = useState<any>(persistentState);
  
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
};

export { usePersistentState }
