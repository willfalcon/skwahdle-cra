import store from '../store';
import { copyStats } from '../components/Stats/statsSlice';
import { migrateState } from '../components/lettersSlice';
import isEqual from 'lodash/isEqual';

export default function checkIsNewBuild() {
  const migrated = localStorage.getItem('migrated') === 'true';
  if (!migrated) {
    console.log(`some harfoots left behind`);
    // Most important: copy stats
    const oldStats = localStorage.getItem('stats');
    if (oldStats) {
      const parsedStats = JSON.parse(oldStats);
      if (parsedStats.hasOwnProperty('guesses') && parsedStats.hasOwnProperty('currentStreak')) {
        store.dispatch(copyStats(parsedStats));

        if (isEqual(store.getState().stats, parsedStats)) {
          localStorage.setItem('migrated', true);
        } else {
          localStorage.setItem('migrated', false);
        }

        // copy board state
        const workingBox = parseInt(localStorage.getItem('workingBox'));
        const workingRow = parseInt(localStorage.getItem('workingRow'));
        const letters = JSON.parse(localStorage.getItem('letters'));
        const rowLocks = JSON.parse(localStorage.getItem('rowLocks'));
        const attempts = JSON.parse(localStorage.getItem('attempts'));

        const todaysGuesses = localStorage.getItem('todaysGuesses');
        const solved = localStorage.getItem('solved');
        const failed = localStorage.getItem('failed');

        store.dispatch(migrateState({ letters, workingBox, workingRow, rowLocks, attempts, todaysGuesses, solved, failed }));

        return parsedStats;
      }
    }
  }
  return false;
}
