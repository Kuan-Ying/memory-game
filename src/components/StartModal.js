import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../shared/Modal';
import Button, { ButtonGroup } from '../shared/Button';
import Text from '../shared/Text';

const MAX_PLAYERS = 6;
const MAX_DIFFICULTY = 3;

export default class extends React.Component {
  state = {
    playerNum: 1,
    difficulty: 1,
  }

  static propTypes = {
    active: PropTypes.bool,
    onStart: PropTypes.func.isRequired,
  }

  static defaultProps = {
    active: false,
  }

  startHanlder = () => {
    const { onStart } = this.props;
    const {
      playerNum,
      difficulty,
    } = this.state;
    onStart({ playerNum, difficulty });
  }

  render() {
    const { active } = this.props;

    const {
      playerNum,
      difficulty,
    } = this.state;

    return (
      <Modal active={active}>
        <ButtonGroup direction="row">
          <Text>Players</Text>
          <Button
            onClick={() => this.setState({ playerNum: Math.max(1, playerNum - 1) })}
          >
            -
          </Button>
          <Text>{playerNum}</Text>
          <Button
            onClick={() => this.setState({ playerNum: Math.min(MAX_PLAYERS, playerNum + 1) })}
          >
            +
          </Button>
        </ButtonGroup>
        <ButtonGroup direction="row">
          <Text>Difficulty</Text>
          <Button
            onClick={() => this.setState({ difficulty: Math.max(1, difficulty - 1) })}
          >
             -
          </Button>
          <Text>{difficulty}</Text>
          <Button
            onClick={() => this.setState({
              difficulty: Math.min(MAX_DIFFICULTY, difficulty + 1),
            })}
          >
            +
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={this.startHanlder}>Start Game</Button>
        </ButtonGroup>
      </Modal>
    );
  }
}
