import React, { useEffect } from 'react';

import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

import Letter from './Letter';
import { media } from '../theme';

import { useSelector } from 'react-redux';
import { getLetterByLocation } from '../lettersSlice';

const LetterBox = ({ row, box, locked, example = false, exampleStatus = false }) => {
  const letter = useSelector(state => getLetterByLocation(state, row, box));
  const status = useSelector(state => state.letters.attempts[row][box]);

  const [wrapperStyles, wrapperApi] = useSpring(() => ({ transform: 'scale(1)', config: config.stiff }));

  useEffect(() => {
    if (letter) {
      wrapperApi.start({
        from: { transform: 'scale(0.8)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
      });
    }
  }, [letter, wrapperApi]);

  return (
    <BoxWrapper style={wrapperStyles}>
      <Letter
        letter={letter}
        status={!example ? status : null}
        exampleStatus={exampleStatus}
        example={example}
        locked={locked}
        box={box}
        row={row}
      />
    </BoxWrapper>
  );
};

const BoxWrapper = styled(animated.div)`
  width: 16vw;
  height: 16vw;

  display: block;
  perspective: 500px;
  position: relative;
  @media (min-width: 375px) {
    width: 14vw;
    height: 14vw;
  }
  ${media.break`
    width: 62px;
    height: 62px;
  `}
`;

export default LetterBox;
