import { useEffect, useState } from "react";

interface Props<Value> {
  key: string;
  defaultValue: Value;
}

export default function useLocalStorage<Value>({
  key,
  defaultValue,
}: Props<Value>) {
  const [value, setValue] = useState<Value>(defaultValue);

  useEffect(() => {
    function handleChange(event: StorageEvent) {
      if (event.key === key) {
        setValue(event.newValue as Value);
      }
    }
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem;
  }, [value]);
}
