import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Card, { cardStatus } from './Card';
import StatusBar from './StatusBar';
import PauseModal from './PauseModal';
import FinishedModal from './FinishedModal';
import StartModal from './StartModal';

const Container = styled.div`
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 160px;
`;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SCORE_PER_MATCHED_PAIR = 20;

const DIFFICULTY_TO_CARD_NUM = [18, 24, 30]; // NOTE: convert difficulty to card number

const initializeCards = (cardPairNums) => {
  const cards = _.range(1, 2 * cardPairNums + 1)
    .map(num => ({ num: Math.round(num / 2), status: cardStatus.HIDDEN }));
  shuffle(cards);
  return cards;
};

const playStatus = {
  SETTING: 'SETTING',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING',
  TRANSITIONING: 'TRANSITIONING',
  FINISHED: 'FINISHED',
};

const initialState = {
  cardStates: [],
  scores: [],
  currentPlayer: 0,
  gameTime: 0,
  activeCardId: null,
  playState: playStatus.SETTING,
  matchedPairs: 0,
};

// TODO: Refactor the code to make it more readable
export default class GameBoard extends React.Component {
  state = initialState;

  handleCardClick = (id) => {
    const {
      cardStates,
      activeCardId,
    } = this.state;

    // NOTE: no need to handle when the same card is clicked twice consecutively.
    if (activeCardId === id || cardStates[id].status === cardStatus.MATCHED) {
      return;
    }

    // NOTE: if no card is selected, let the newly selected card be active.
    if (activeCardId === null) {
      cardStates[id] = {
        ...cardStates[id],
        status: cardStatus.ACTIVE,
      };
      this.setState({ cardStates, activeCardId: id });
      return;
    }

    // NOTE: if there is a selected card already, need to check if the pairs are matched.
    // NOTE: if matched, change the status of both cards to matched, and increment the matched nums.
    if (cardStates[id].num === cardStates[activeCardId].num) {
      this.matchPairSuccess(id);
      return;
    }

    this.matchPairFailure(id);
  }

  matchPairSuccess = async (id) => {
    const {
      cardStates,
      activeCardId,
      matchedPairs,
      currentPlayer,
      scores,
    } = this.state;
    const nextPlayer = (currentPlayer + 1) % scores.length;
    cardStates[id] = {
      ...cardStates[id],
      status: cardStatus.MATCHED,
    };
    cardStates[activeCardId] = {
      ...cardStates[activeCardId],
      status: cardStatus.MATCHED,
    };
    const nextPlayState = matchedPairs + 1 === cardStates.length / 2
      ? playStatus.FINISHED : playStatus.PLAYING;

    // NOTE: need to clear timer after game is finished
    if (nextPlayState === playStatus.FINISHED) {
      const { interval } = this.state;
      clearInterval(interval);
    }

    scores[currentPlayer] += SCORE_PER_MATCHED_PAIR;
    this.setState({
      cardStates,
      activeCardId: null,
      playState: nextPlayState,
      scores,
      matchedPairs: matchedPairs + 1,
      currentPlayer: nextPlayer,
    });
  }

  matchPairFailure = (id) => {
    const {
      cardStates,
      activeCardId,
      currentPlayer,
      scores,
    } = this.state;

    cardStates[id] = {
      ...cardStates[id],
      status: cardStatus.ACTIVE,
    };
    const nextPlayer = (currentPlayer + 1) % scores.length;

    // NOTE: display the card pair for 1s and then set them to hidden.
    setTimeout(() => {
      cardStates[id] = {
        ...cardStates[id],
        status: cardStatus.HIDDEN,
      };
      cardStates[activeCardId] = {
        ...cardStates[activeCardId],
        status: cardStatus.HIDDEN,
      };
      this.setState({
        cardStates,
        activeCardId: null,
        playState: playStatus.PLAYING,
        currentPlayer: nextPlayer,
      });
    }, 1000);

    this.setState({
      cardStates,
      activeCardId: null,
      playState: playStatus.TRANSITIONING,
    });
  }

  startHandler = ({ playerNum, difficulty }) => {
    const interval = setInterval(this.timer, 1000);
    this.setState({
      cardStates: initializeCards(DIFFICULTY_TO_CARD_NUM[difficulty - 1]),
      scores: _.range(playerNum).fill(0),
      playState: playStatus.PLAYING,
      interval,
    });
  }

  pauseHandler = () => {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({ playState: playStatus.PAUSED });
  }

  continueHandler = () => {
    const interval = setInterval(this.timer, 1000);
    this.setState({
      playState: playStatus.PLAYING,
      interval,
    });
  }

  resetHandler = () => {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState(initialState);
  }

  timer = () => {
    const { gameTime } = this.state;
    this.setState({ gameTime: gameTime + 1 });
  };

  renderCardSection = () => {
    const {
      cardStates,
      playState,
    } = this.state;

    return cardStates.map(({ num, status }, index) => {
      const key = `${num}_${index}`;
      const disabled = playState !== playStatus.PLAYING
        && (cardStates[index].status !== cardStatus.MATCHED);
      return (
        <Card
          key={key}
          type={status}
          content={`${num}`}
          id={index}
          onClick={!disabled ? this.handleCardClick : () => {}}
        />);
    });
  }

  render() {
    const {
      playState,
      scores,
      currentPlayer,
      gameTime,
    } = this.state;

    return (
      <Container>
        <CardSection>
          {this.renderCardSection()}
        </CardSection>
        <StatusBar
          scores={scores}
          currentPlayer={currentPlayer}
          onPause={this.pauseHandler}
          gameTime={gameTime}
        />
        <PauseModal
          active={playState === playStatus.PAUSED}
          onContinue={this.continueHandler}
          onReset={this.resetHandler}
        />
        <FinishedModal
          active={playState === playStatus.FINISHED}
          scores={scores}
          gameTime={gameTime}
          winner={_.isEmpty(scores) ? 0 : scores.findIndex(score => score === _.max(scores)) + 1}
          onReset={this.resetHandler}
        />
        <StartModal
          active={playState === playStatus.SETTING}
          onStart={this.startHandler}
        />
      </Container>
    );
  }
}
