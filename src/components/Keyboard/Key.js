import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import useSiteContext from '../SiteContext';
import { useDispatch, useSelector } from 'react-redux';

import { setLetter } from '../lettersSlice';

const Key = ({ children, exampleStatus = false, style }) => {
  // const { setNextLetter } = useContext(KeyboardContext);
  const { disabled } = useSiteContext();

  const dispatch = useDispatch();

  const [keyStatus, setStatus] = useState('unused');

  const keyStatuses = useSelector(state => state.keys.keyStatuses);

  useEffect(() => {
    if (keyStatuses.length) {
      const keys = keyStatuses.filter(status => status.key === children);
      if (keys.length && keys[0].status !== keyStatus) {
        setStatus(keys[0].status);
      }
    } else {
      setStatus('unused');
    }
  }, [keyStatuses, children, keyStatus]);

  const className = exampleStatus ? exampleStatus : keyStatus;
  return (
    <StyledKey
      onClick={e => {
        dispatch(setLetter(e.target.dataset.key));
      }}
      data-key={children}
      status={exampleStatus || keyStatus}
      className={classNames('key', className)}
      aria-disabled={disabled}
      disabled={disabled}
      style={style}
    >
      {children}
    </StyledKey>
  );
};

const StyledKey = styled.button`
  height: 53px;
  font-weight: bold;
  margin-right: 6px;
  border-radius: 4px;
  background: var(--light);
  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
  transition: 0.25s;
  transition-delay: 0.75s;
  background: var(--light);
  color: var(--dark);
  &.wrong {
    background: var(--wrong);
    color: var(--white);
  }
  &.kinda {
    background: var(--yellow);
    color: var(--white);
  }
  &.correct {
    background: var(--green);
    color: var(--white);
  }

  border-width: 0;
  text-transform: uppercase;
  font-size: 1.1rem;
  width: 22px;
  padding: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 360px) {
    padding: 1rem;
    font-size: 1.4rem;
    width: 35px;
  }
  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1.8rem;
    height: 58px;
  }
  cursor: pointer;
`;

export { StyledKey };
export default Key;
