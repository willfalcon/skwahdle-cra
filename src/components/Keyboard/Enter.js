import React from 'react';
import { StyledKey } from './Key';

import useKeyboardHandlers from '../KeyboardHandlers';

const Enter = () => {
  const { tryToGuess } = useKeyboardHandlers();

  return (
    <StyledKey
      style={{ width: 'auto' }}
      onClick={() => {
        tryToGuess();
      }}
    >
      Enter
    </StyledKey>
  );
};

export default Enter;
