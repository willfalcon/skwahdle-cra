import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    gamesPlayed: 0,
    gamesWon: 0,
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0,
    },
    maxStreak: 0,
    currentStreak: 0,
  },
  reducers: {
    updateStats(state, action) {
      const { solved, newWorkingRow } = action.payload;
      state.gamesPlayed++;

      if (solved) {
        state.guesses[newWorkingRow]++;
        state.gamesWon++;
        state.currentStreak++;

        if (state.currentStreak > state.maxStreak) {
          state.maxStreak = state.currentStreak;
        }
      } else {
        state.guesses.fail++;
        state.currentStreak = 0;
      }
    },
    copyStats(state, action) {
      console.log('are we getting here?');
      console.log(action.payload);
      const { gamesPlayed, gamesWon, guesses, maxStreak, currentStreak } = action.payload;
      state.gamesPlayed = gamesPlayed;
      state.gamesWon = gamesWon;
      state.guesses = guesses;
      state.maxStreak = maxStreak;
      state.currentStreak = currentStreak;
    },
  },
});

export const { updateStats, copyStats } = statsSlice.actions;
export default statsSlice.reducer;
