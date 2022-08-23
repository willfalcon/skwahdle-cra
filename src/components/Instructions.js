import React, { useState, useLayoutEffect, useRef } from 'react';

import styled from 'styled-components';
import { darken, rgba } from 'polished';

import Modal from './Modal';

import { Row } from './Board/WordRow';
import LetterBox from './Board/LetterBox';
import { KeyRow } from './Keyboard/Keyboard';

import Key from './Keyboard/Key';

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

      <div className="tabs">
        <button onClick={() => setAdvanced(false)}>Examples</button>
        <button onClick={() => setAdvanced(true)}>Advanced Examples</button>
      </div>
      <div className="examples" ref={ref}>
        {!advanced ? (
          <div className="panel">
            <Row example={true} row={0} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={true} example="w" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={false} example="e" row={0} box={1} />
              <LetterBox locked={false} example="a" row={0} box={2} />
              <LetterBox locked={false} example="r" row={0} box={3} />
              <LetterBox locked={false} example="y" row={0} box={4} />
            </Row>

            <p>
              The letter <strong>W</strong> is in the word and in the correct spot.
            </p>

            <Row example={true} row={1} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={false} example="p" row={1} box={0} />
              <LetterBox locked={true} example="i" row={1} box={1} exampleStatus="kinda" />
              <LetterBox locked={false} example="l" row={1} box={2} />
              <LetterBox locked={false} example="l" row={1} box={3} />
              <LetterBox locked={false} example="s" row={1} box={4} />
            </Row>

            <p>
              The letter <strong>I</strong> is in the word but in the wrong spot.
            </p>

            <Row example={true} row={2} className="example" style={{ justifyContent: 'flex-start' }}>
              <LetterBox locked={false} example="v" row={2} box={0} />
              <LetterBox locked={false} example="a" row={2} box={1} />
              <LetterBox locked={false} example="g" row={2} box={2} />
              <LetterBox locked={true} example="u" row={2} box={3} exampleStatus="wrong" />
              <LetterBox locked={false} example="e" row={2} box={4} />
            </Row>

            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        ) : (
          <div className="panel">
            <Row example={true} row={0} className="example">
              <LetterBox locked={true} example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={true} example="n" row={0} box={1} exampleStatus="wrong" />
              <LetterBox locked={true} example="t" row={0} box={2} exampleStatus="correct" />
              <LetterBox locked={true} example="e" row={0} box={3} exampleStatus="kinda" />
              <LetterBox locked={true} example="r" row={0} box={4} exampleStatus="wrong" />
            </Row>

            <p>
              The first letter <strong>E</strong> is in the word and in the correct spot.
              <br />
              The second letter <strong>E</strong> is in the word, but this one is in the wrong spot.
            </p>

            <KeyRow>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                q
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                w
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="kinda">
                e
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="wrong">
                r
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="correct">
                t
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                y
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                u
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                i
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                o
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                p
              </Key>
            </KeyRow>
            <p>Generally, colors on the keyboard match colors on the board.</p>
            <hr />

            <Row example={true} row={0} className="example">
              <LetterBox locked={true} example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox locked={true} example="b" row={0} box={1} exampleStatus="wrong" />
              <LetterBox locked={true} example="o" row={0} box={2} exampleStatus="wrong" />
              <LetterBox locked={true} example="n" row={0} box={3} exampleStatus="kinda" />
              <LetterBox locked={true} example="y" row={0} box={4} exampleStatus="correct" />
            </Row>
            <KeyRow>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                q
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                w
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="kinda">
                e
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                r
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                t
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="correct">
                y
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                u
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                i
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="wrong">
                o
              </Key>
              <Key style={{ padding: 0 }} exampleStatus="unused">
                p
              </Key>
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
  /* hr {
    margin-bottom: 0;
    display: none;
  } */
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
