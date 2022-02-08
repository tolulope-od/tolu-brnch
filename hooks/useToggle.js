import React from "react";

function useToggle(initialState = false) {
  const [state, setState] = React.useState(initialState);
  const handlers = {
    on: () => {
      setState(true);
    },
    off: () => {
      setState(false);
    },
    toggle: () => {
      setState((s) => !s);
    },
    reset: () => {
      setState(initialState);
    },
  };

  return [state, handlers];
}

export default useToggle;