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
  },
});

export const { updateStats } = statsSlice.actions;
export default statsSlice.reducer;
