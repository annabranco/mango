import { useDebugValue, useRef, useState } from "react";

export const useRefWithLabel = (initialValue, displayName) => {
  const ref = useRef(initialValue);

  useDebugValue(displayName);
  return ref;
};

export const useStateWithLabel = (initialValue, displayName) => {
  const [value, setValue] = useState(initialValue);

  useDebugValue(displayName);
  return [value, setValue];
};
