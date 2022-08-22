import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { animated, useTransition } from 'react-spring';

import useSiteContext, { SiteContextProvider } from './SiteContext';
import Header from './Header';
import { useLocalStorage } from 'react-use';
import { useWindowSize } from '../lib/hooks';
import Board from './Board/Board';
import Keyboard from './Keyboard/Keyboard';
import { KeyboardHandlers } from './KeyboardHandlers';

const Wrapper = ({ children, word }) => {
  const size = useWindowSize();
  const [siteTheme, setTheme] = useLocalStorage('theme', 'default');
  useEffect(() => {
    document.body.classList = [];
    document.body.classList.add(`${siteTheme}-theme`);
  }, [siteTheme]);

  const [alerts, setAlerts] = useState([]);
  const transition = useTransition(alerts, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <ThemeProvider theme={theme[siteTheme] || theme.default}>
      <SiteContextProvider data={{ siteTheme, setTheme, word, setAlerts }}>
        <KeyboardHandlers>
          <WrapperStyles windowHeight={size.height}>
            <Header />
            <Board />
            <Keyboard />
            {children}
            {transition((styles, item) => item && <StyledAlert style={styles}>{item}</StyledAlert>)}
            <GlobalStyles />
          </WrapperStyles>
        </KeyboardHandlers>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

export const useAlert = (text, timeout = 2000) => {
  const { setAlerts } = useSiteContext();
  console.log('running hook');
  return function () {
    console.log('setting alert', text);
    setAlerts([text]);
    setTimeout(() => {
      setAlerts([]);
    }, timeout);
  };
};

const WrapperStyles = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  width: 600px;
  height: ${({ windowHeight }) => windowHeight}px;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;

  position: relative;
`;

const StyledAlert = styled(animated.div)`
  background: ${({ theme }) => theme.dark};
  /* background: var(--background); */
  color: ${({ theme }) => theme.light};
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 3rem;
  border-radius: 1rem;
`;

export default Wrapper;
