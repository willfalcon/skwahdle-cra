import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import useKeyboardHandlers from '../KeyboardHandlers';

import LetterBox from './LetterBox';

const WordRow = ({ row }) => {
  const { notAWord } = useKeyboardHandlers();
  const rowLocked = useSelector(state => state.letters.locks[row]);
  const workingRow = useSelector(state => state.letters.workingRow);

  const thisRowNotAWord = notAWord && row === workingRow;

  return (
    <Row doWiggle={thisRowNotAWord}>
      <LetterBox row={row} box={0} locked={rowLocked} />
      <LetterBox row={row} box={1} locked={rowLocked} />
      <LetterBox row={row} box={2} locked={rowLocked} />
      <LetterBox row={row} box={3} locked={rowLocked} />
      <LetterBox row={row} box={4} locked={rowLocked} />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  animation: ${({ doWiggle }) => (doWiggle ? wiggle : 'none')} 0.3s ease-in-out;
`;

const wiggle = keyframes`
  0% {
    transform: translateX(0px);
  }
  15% {
    transform: translateX(8px);
  }
  36% {
    transform: translateX(-6px);
  }
  64% {
    transform: translateX(6px);
  }
  86% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0px);
  }
`;

export { Row };
export default WordRow;
