import { createSlice } from '@reduxjs/toolkit';

const emptyLetters = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];
const emptyAttempts = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];
const emptyLocks = [null, null, null, null, null, null];
export const lettersSlice = createSlice({
  name: 'letters',
  initialState: {
    letters: emptyLetters,
    workingRow: 0,
    workingBox: 0,
    attempts: emptyAttempts,
    locks: emptyLocks,
    solved: false,
    failed: false,
    lastWord: '',
  },
  reducers: {
    setLetter(state, action) {
      const { letters, workingRow, workingBox } = state;
      const key = action.payload;
      if (workingBox < 5) {
        letters[workingRow][workingBox] = key;
      }
      if (workingBox !== 5) {
        state.workingBox += 1;
      }
    },
    setWorkingBox(state, action) {
      state.workingBox = action.payload;
    },
    backspace(state) {
      const { letters, workingRow, workingBox } = state;
      if (letters[workingRow][workingBox]) {
        letters[workingRow][workingBox] = '';
      } else if (workingBox > 0) {
        letters[workingRow][workingBox - 1] = '';
        state.workingBox -= 1;
      }
    },
    logAttempt(state, action) {
      const { attempts, workingRow, locks } = state;
      const { result, solved } = action.payload;
      attempts[workingRow] = result;
      locks[workingRow] = true;
      if (solved) {
        state.workingRow = 6;
        state.workingBox = 5;
        state.solved = true;
      } else {
        const newWorkingRow = workingRow === 6 ? workingRow : workingRow + 1;
        state.workingRow = newWorkingRow;
        state.workingBox = 0;
        if (newWorkingRow === 6) {
          state.failed = true;
          state.workingBox = 5;
        }
      }
    },
    resetBoard(state) {
      state.letters = emptyLetters;
      state.attempts = emptyAttempts;
      state.locks = emptyLocks;
      state.workingRow = 0;
      state.workingBox = 0;
      state.solved = false;
      state.failed = false;
    },
    setLastWord(state, action) {
      state.lastWord = action.payload;
    },
    migrateState(state, action) {
      console.log('is this harfoot gonna make it?');
      const { letters, attempts, rowLocks, workingRow, workingBox, solved, failed } = action.payload;
      state.letters = letters;
      state.attempts = attempts;
      state.workingRow = workingRow;
      state.workingBox = workingBox;
      state.solved = solved;
      state.failed = failed;
      state.locks = rowLocks;
    },
  },
});

export const getLetterByLocation = (state, row, box) => {
  return state.letters.letters[row][box];
};

export const getCurrentAttempt = state => {
  return state.letters.letters[state.letters.workingRow];
};

export const { setLetter, backspace, logAttempt, setWorkingBox, resetBoard, setLastWord, migrateState } = lettersSlice.actions;
export default lettersSlice.reducer;
