import { configureStore } from '@reduxjs/toolkit';
import lettersReducer from './components/lettersSlice';
import statsReducer from './components/Stats/statsSlice';
import { loadState } from './browser-storage';
import keysReducer from './components/Keyboard/keyboardSlice';

export default configureStore({
  reducer: {
    letters: lettersReducer,
    stats: statsReducer,
    keys: keysReducer,
  },
  preloadedState: loadState(),
});
