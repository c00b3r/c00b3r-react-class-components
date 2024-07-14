import { useEffect, useState } from "react";

const defaultValue = "";

function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    let currentValue: string;

    try {
      currentValue = localStorage.getItem(key) || defaultValue;
    } catch (error) {
      console.log(error);
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
