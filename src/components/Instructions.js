import React, { useState, useLayoutEffect, useRef } from 'react';

import styled from 'styled-components';
import { darken, rgba } from 'polished';

import Modal from './Modal';

import { Row } from './Board/WordRow';
import LetterBox from './Board/LetterBox';
import { KeyRow } from './Keyboard/Keyboard';
import ExampleKey from './Keyboard/ExampleKey';

const Instructions = () => {
  const [advanced, setAdvanced] = useState(false);

  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  return (
    <InstructionModal open={true} advanced={advanced} exampleHeight={height}>
      <h3 className="text-center">How to Play</h3>
      <p>Guess the Word in 6 tries.</p>
      <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      <hr />
      <div className="tabs">
        <button onClick={() => setAdvanced(false)}>Examples</button>
        <button onClick={() => setAdvanced(true)}>Advanced Examples</button>
      </div>
      <div className="examples" ref={ref}>
        {!advanced ? (
          <div className="panel">
            <Row example={true} row={0} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={true} example="w" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={true} example="e" row={0} box={1} />
              <LetterBox locked={true} example="a" row={0} box={2} />
              <LetterBox locked={true} example="r" row={0} box={3} />
              <LetterBox locked={true} example="y" row={0} box={4} />
            </Row>

            <p>
              The letter <strong>W</strong> is in the word and in the correct spot.
            </p>

            <Row example={true} row={1} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={true} example="p" row={1} box={0} />
              <LetterBox locked={true} example="i" row={1} box={1} exampleStatus="kinda" />
              <LetterBox locked={true} example="l" row={1} box={2} />
              <LetterBox locked={true} example="l" row={1} box={3} />
              <LetterBox locked={true} example="s" row={1} box={4} />
            </Row>

            <p>
              The letter <strong>I</strong> is in the word but in the wrong spot.
            </p>

            <Row example={true} row={2} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={true} example="v" row={2} box={0} />
              <LetterBox locked={true} example="a" row={2} box={1} />
              <LetterBox locked={true} example="g" row={2} box={2} />
              <LetterBox locked={true} example="u" row={2} box={3} exampleStatus="wrong" />
              <LetterBox locked={true} example="e" row={2} box={4} />
            </Row>

            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        ) : (
          <div className="panel">
            <Row example={true} row={0} className="example">
              <LetterBox locked={true} example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={true} example="n" row={0} box={1} />
              <LetterBox locked={true} example="t" row={0} box={2} />
              <LetterBox locked={true} example="e" row={0} box={3} exampleStatus="kinda" />
              <LetterBox locked={true} example="r" row={0} box={4} />
            </Row>

            <p>
              The first letter <strong>E</strong> is in the word and in the correct spot.
            </p>
            <p>
              The second letter <strong>E</strong> is in the word, but this one is in the wrong spot.
            </p>

            <KeyRow>
              <ExampleKey>q</ExampleKey>
              <ExampleKey exampleStatus="correct">w</ExampleKey>
              <ExampleKey>e</ExampleKey>
              <ExampleKey>r</ExampleKey>
              <ExampleKey exampleStatus="correct">t</ExampleKey>
              <ExampleKey>y</ExampleKey>
              <ExampleKey>u</ExampleKey>
              <ExampleKey exampleStatus="kinda">i</ExampleKey>
              <ExampleKey>o</ExampleKey>
              <ExampleKey exampleStatus="wrong">p</ExampleKey>
            </KeyRow>
            <p>Generally, colors on the keyboard match colors on the board.</p>

            <Row example={true} row={0} className="example">
              <LetterBox locked={true} example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={true} example="b" row={0} box={1} />
              <LetterBox locked={true} example="o" row={0} box={2} />
              <LetterBox locked={true} example="n" row={0} box={3} exampleStatus="kinda" />
              <LetterBox locked={true} example="y" row={0} box={4} exampleStatus="correct" />
            </Row>
            <KeyRow>
              <ExampleKey>q</ExampleKey>
              <ExampleKey>w</ExampleKey>
              <ExampleKey exampleStatus="kinda">e</ExampleKey>
              <ExampleKey>r</ExampleKey>
              <ExampleKey>t</ExampleKey>
              <ExampleKey exampleStatus="correct">y</ExampleKey>
              <ExampleKey>u</ExampleKey>
              <ExampleKey>i</ExampleKey>
              <ExampleKey exampleStatus="wrong">o</ExampleKey>
              <ExampleKey>p</ExampleKey>
            </KeyRow>

            <p>
              The letter <strong>E</strong> on the board is correct. However, the <strong>E</strong> is yellow on the keyboard. This means
              there is another <strong>E</strong> in the word!
            </p>
          </div>
        )}
      </div>
      <hr />
      <p>
        <strong>A new Skwahdle will be available every day!</strong>
      </p>
    </InstructionModal>
  );
};

const InstructionModal = styled(Modal)`
  padding: 1rem;
  overflow-y: scroll;
  max-height: 80%;
  h3 {
    margin-top: 0;
  }
  hr {
    margin-bottom: 0;
    display: none;
  }
  .tabs {
    background: ${({ theme }) => darken(0.05, theme.background)};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${({ theme }) => rgba(theme.dark, 0.5)};
    border-width: 1px 1px 0px;
    display: flex;
    button {
      color: ${({ theme }) => theme.textColor};
      background: transparent;
      /* margin-right: 5px; */
      padding: 1rem;
      cursor: pointer;
      transition: 0.15s;
      outline: none;
      border: 1px solid ${({ theme }) => rgba(theme.dark, 0.5)};
      border-width: 0px 1px 0px 0px;
      &:hover {
        background: ${({ theme }) => rgba(theme.light, 0.5)};
      }
      &:first-child {
        border-bottom: ${({ advanced, theme }) => (advanced ? `1px solid ${rgba(theme.dark, 0.5)}` : '0px')};
        background: ${({ advanced, theme }) => (advanced ? 'transparent' : theme.background)};
      }
      &:last-child {
        border-bottom: ${({ advanced, theme }) => (!advanced ? `1px solid ${rgba(theme.dark, 0.5)}` : '0px')};
        background: ${({ advanced, theme }) => (!advanced ? 'transparent' : theme.background)};
      }
    }
    &::after {
      content: '';
      display: block;
      flex-grow: 1;
      border-bottom: 1px solid ${({ theme }) => rgba(theme.dark, 0.5)};
    }
  }
  .panel {
    background: ${({ theme }) => theme.background};
    padding: 1rem;
    border: 1px solid ${({ theme }) => rgba(theme.dark, 0.5)};
    border-width: 0px 1px 1px;
  }

  .examples {
    /* height: ${({ exampleHeight }) => (exampleHeight ? `${exampleHeight}px` : 'auto')}; */
  }
`;

export default Instructions;
