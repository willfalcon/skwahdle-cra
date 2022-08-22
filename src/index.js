import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import { saveState } from './browser-storage';
import debounce from './lib/debounce';
import { resetBoard, setLastWord } from './components/lettersSlice';

store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

function checkIfNewWord(word) {
  const state = store.getState();

  if (!state.letters.lastWord || state.letters.lastWord !== word) {
    console.log('reset board');
    store.dispatch(resetBoard());
    store.dispatch(setLastWord(word));
  }
}

async function getWord() {
  const raw = await fetch(`/.netlify/functions/get-word`);
  const res = await raw.json();
  return res.word;
}

async function initSkwahdle() {
  const word = await getWord();
  checkIfNewWord(word);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App word={word} />
      </Provider>
    </React.StrictMode>
  );
}

initSkwahdle();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
