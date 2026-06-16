import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) {
        return initialValue;
      }

      try {
        return JSON.parse(storedValue);
      } catch (error) {
        return typeof initialValue === "string" ? storedValue : initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }, [key, value]);

  return [value, setValue];
}
