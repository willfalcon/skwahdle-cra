import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from 'react-router-dom';

import Wrapper from './components/Wrapper';

import Instructions from './components/Instructions';
import Settings from './components/Settings';
import Statistics from './components/Stats/Statistics';
// here we subscribe to the store changes

function App({ word }) {
  return (
    <Router>
      <Wrapper word={word}>
        <Routes>
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace="true" />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

const Home = () => <></>;

export default App;
