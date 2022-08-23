import { createSlice } from '@reduxjs/toolkit';

export const keySlice = createSlice({
  name: 'keys',
  initialState: {
    keyStatuses: [],
  },
  reducers: {
    updateKeyStatuses(state, action) {
      const { currentAttempt, result, word } = action.payload;

      const combinedAttempt = currentAttempt.map((key, i) => {
        return {
          key,
          status: result[i],
        };
      });

      // Going through each letter in the attempt
      // (Only go through each letter once)
      const lettersList = currentAttempt.filter((value, index, self) => self.indexOf(value) === index);
      lettersList.forEach(attempt => {
        let newAttempt = { key: attempt, status: 'unused' };
        // How many times is this attempted letter in the word?
        const letterCount = word.split('').filter(key => key === attempt).length;

        if (letterCount === 0) {
          // If this attempted letter is not in the word, it's wrong.
          newAttempt = { key: attempt, status: 'wrong' };
        }
        if (letterCount === 1) {
          // If it's in the word once, return the status for this letter in the board check result.
          // If its in the right spot, it's correct, if not, it's kinda.
          newAttempt = { key: attempt, status: result[currentAttempt.indexOf(attempt)] };
        }

        if (letterCount > 1) {
          // if there are more of this attempted letter in the word, did we get them all?
          if (currentAttempt.filter(att => att === attempt).length < letterCount) {
            newAttempt = { key: attempt, status: 'kinda' };
          } else {
            // If at least one of the attempts for this letter is wrong, we'll go yellow for the key.
            const theseLetters = combinedAttempt.filter(thisOne => thisOne.key === attempt);
            const hasAKinda = theseLetters.some(thisLetter => thisLetter.status === 'kinda');
            if (hasAKinda) {
              newAttempt = { key: attempt, status: 'kinda' };
            } else {
              newAttempt = { key: attempt, status: 'correct' };
            }
          }
        }

        const existingIndex = state.keyStatuses.length
          ? state.keyStatuses.findIndex(status => {
              console.log(status);
              return status.key === attempt;
            })
          : -1;
        if (existingIndex >= 0) {
          state.keyStatuses[existingIndex] = newAttempt;
        } else {
          state.keyStatuses.push(newAttempt);
        }
      });
    },
    resetStatuses(state) {
      state.keyStatuses = [];
    },
  },
});

export const { updateKeyStatuses, resetStatuses } = keySlice.actions;
export default keySlice.reducer;
