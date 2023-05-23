import { useCallback, useState } from 'react';

import { tuple } from 'utils';

export const useTrigger = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const onHandler = useCallback(() => setState(() => true), []);

  const offHandler = useCallback(() => setState(() => false), []);

  const togglerHandler = useCallback(() => setState((prev) => !prev), []);

  return tuple(state, {
    onHandler,
    offHandler,
    togglerHandler,
  });
};
