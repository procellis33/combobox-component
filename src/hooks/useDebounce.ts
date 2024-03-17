import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, time: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  return debouncedValue;
};

export { useDebounce };
