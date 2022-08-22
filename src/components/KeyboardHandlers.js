import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import checkWordExists from '../lib/checkWordExists';
import lettersList from '../lib/lettersList';
import { getCurrentAttempt, logAttempt, backspace, setLetter, setWorkingBox } from './lettersSlice';
import { updateStats } from './Stats/statsSlice';
import useSiteContext from './SiteContext';
import compareWord from '../lib/compareWord';

const KeyboardContext = React.createContext();

const KeyboardHandlers = ({ children }) => {
  const dispatch = useDispatch();
  const currentAttempt = useSelector(state => getCurrentAttempt(state));
  const workingBox = useSelector(state => state.letters.workingBox);
  const workingRow = useSelector(state => state.letters.workingRow);
  const { attempts } = useSelector(state => {
    const attempts = state.letters.attempts;
    return {
      attempts,
    };
  });
  const { word, setAlerts } = useSiteContext();

  const [specialKey, setSpecialKey] = useState(false);
  const [notAWord, setNotAWord] = useState(false);

  const idiotPhrases = [
    `That's def not a word.`,
    `I got 5758 words and that aint one.`,
    `No`,
    `Are you serious?`,
    `Do you need this? www.dictionary.com`,
    `That's not a word.`,
  ];

  const idiot = () => {
    setNotAWord(true);
    setAlerts([idiotPhrases[Math.round(Math.random() * idiotPhrases.length)]]);
    setTimeout(() => {
      setAlerts([]);
    }, 2000);
    setTimeout(() => {
      setNotAWord(false);
    }, 300);
  };

  const specialKeyUpHandler = e => {
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
      setSpecialKey(false);
      window.removeEventListener('keyup', specialKeyUpHandler);
    }
  };

  function moveCursor(key) {
    const lastLetter = currentAttempt[4]
      ? 4
      : currentAttempt[3]
      ? 3
      : currentAttempt[2]
      ? 2
      : currentAttempt[1]
      ? 1
      : currentAttempt[0]
      ? 0
      : false;

    if (key === 'ArrowLeft' && workingBox > 0) {
      dispatch(setWorkingBox(workingBox - 1));
    }
    if (key === 'ArrowRight' && workingBox < 4 && lastLetter > workingBox - 1) {
      dispatch(setWorkingBox(workingBox + 1));
    }
  }

  const navigate = useNavigate();

  async function tryToGuess() {
    if (!currentAttempt.includes('')) {
      const found = await checkWordExists(currentAttempt.join(''));
      if (found) {
        const { solved, result } = compareWord(currentAttempt, word);
        dispatch(logAttempt({ result, solved }));
        const newWorkingRow = workingRow === 6 ? workingRow : workingRow + 1;
        if (solved || newWorkingRow === 6) {
          // update stats
          dispatch(updateStats({ attempts, solved, newWorkingRow }));
          // open stats
          setTimeout(() => {
            navigate('/stats');
          }, 1000);
        }
      } else {
        idiot();
      }
    }
  }

  const keypressHandler = async e => {
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
      setSpecialKey(true);
      window.addEventListener('keyup', specialKeyUpHandler);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      moveCursor(e.key);
    } else if (e.key === 'Backspace') {
      dispatch(backspace());
    } else if (specialKey) {
      return;
    } else if (lettersList.includes(e.key)) {
      dispatch(setLetter(e.key.toLowerCase()));
    } else if (e.key === 'Enter') {
      tryToGuess();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => {
      window.removeEventListener('keydown', keypressHandler);
    };
  });

  return <KeyboardContext.Provider value={{ idiot, notAWord, tryToGuess }}>{children}</KeyboardContext.Provider>;
};

const useKeyboardHandlers = () => useContext(KeyboardContext);
export default useKeyboardHandlers;

export { KeyboardHandlers };
