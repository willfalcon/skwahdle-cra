import React, { useState } from 'react';
import styled from 'styled-components';

import { BsShareFill } from 'react-icons/bs';
import { differenceInDays, setHours, setMinutes, setSeconds } from 'date-fns';

import Modal from '../Modal';
// import DistributionChart from './DistributionChart';
import useSiteContext from '../SiteContext';
import generateCopyText from '../../lib/generateCopyText';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import DistributionChart from './DistributionChart';
import { useNavigate } from 'react-router-dom';
import { resetBoard } from '../lettersSlice';
import { resetStatuses } from '../Keyboard/keyboardSlice';

const Statistics = () => {
  const { word } = useSiteContext();

  const { stats, attempts, solved, failed } = useSelector(({ stats, letters }) => {
    return {
      stats,
      attempts: letters.attempts,
      solved: letters.solved,
      failed: letters.failed,
    };
  });

  // const showAlert = useAlert('Results copied to clipboard.');
  const midnight = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
  const edition = differenceInDays(midnight, new Date('2022-02-05'));

  const [answer, setAnswer] = useState(false);

  async function getAnswer() {
    setAnswer(word);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StatsModal open={true}>
      {solved && <h2>You've solved it.</h2>}
      {failed && (
        <>
          <h2>Oh no! 😭 You Lost.</h2>
          <p>
            <span
              className="underline"
              onClick={() => {
                dispatch(resetBoard());
                dispatch(resetStatuses());
                navigate('/');
              }}
            >
              Reset
            </span>{' '}
            or{' '}
            <span
              className="underline"
              onClick={() => {
                getAnswer();
              }}
            >
              Show the Answer
            </span>
            .
          </p>
          {answer && (
            <p>
              <strong>Answer:</strong> "{answer}"
            </p>
          )}
        </>
      )}
      <h3 className="text-center">Stats</h3>
      <div className="flex">
        <div className="stat">
          <span>{stats.gamesPlayed}</span>
          <span>Played</span>
        </div>
        <div className="stat">
          <span>{Math.round((stats.gamesWon / (stats.gamesPlayed || 1)) * 100)}</span>
          <span>Win %</span>
        </div>
        <div className="stat">
          <span>{stats.currentStreak}</span>
          <span>Current Streak</span>
        </div>
        <div className="stat">
          <span>{stats.maxStreak}</span>
          <span>Max Streak</span>
        </div>
      </div>

      <h3 className="text-center">Guess Distribution</h3>
      <DistributionChart stats={stats} />

      <Button
        className="share"
        color="green"
        onClick={() => {
          const copyText = generateCopyText(attempts);

          if (navigator.share) {
            navigator.share({
              title: `Skwahdle ${edition}`,
              text: copyText,
            });
          } else {
            navigator.clipboard.writeText(copyText);
            // showAlert();
          }
        }}
      >
        Share
        <BsShareFill style={{ marginLeft: '5px' }} />
      </Button>

      <p style={{ opacity: 0.55, fontSize: '14px', margin: '4rem 0 0' }}>
        Stats missing? They're not gone, just hidden.
        <br />
        <a href="mailto: willkhawks@gmail.com">Email me to let me know and I'll try to fix it.</a>
      </p>
    </StatsModal>
  );
};

const StatsModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .flex {
    display: flex;
    justify-content: center;
  }
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    text-align: center;
    span {
      :first-child {
        font-weight: bold;
        font-size: 3rem;
      }
    }
  }
  .underline {
    cursor: pointer;
  }
  .share {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export default Statistics;
