import { useRef, useState, useDebugValue } from "react";

export const useStateWithLabel = (initialValue, displayName) => {
  const [value, setValue] = useState(initialValue);

  useDebugValue(displayName);
  return [value, setValue];
};

export const useRefWithLabel = (initialValue, displayName) => {
  const ref = useRef(initialValue);

  useDebugValue(displayName);
  return ref;
};
