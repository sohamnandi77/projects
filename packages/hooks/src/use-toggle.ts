import type { Dispatch, SetStateAction } from "react";
import { useCallback, useReducer } from "react";

type ToggleAction = { type: "TOGGLE" } | { type: "SET"; value: boolean };

function toggleReducer(state: boolean, action: ToggleAction) {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    case "SET":
      return action.value;
    default:
      return state;
  }
}

export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [state, dispatch] = useReducer(toggleReducer, !!defaultValue);

  const toggle = useCallback(() => {
    dispatch({ type: "TOGGLE" });
  }, []);

  const setValue: Dispatch<SetStateAction<boolean>> = useCallback(
    (value) => {
      dispatch({
        type: "SET",
        value: typeof value === "function" ? value(state) : value,
      });
    },
    [state],
  );

  return [state, toggle, setValue];
}
