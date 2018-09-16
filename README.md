# Introduction
A demonstration of Memory game using React.

# Screen shots
## Start a new game
<img src="https://i.imgur.com/a03jHru.png" width="600px">
## Selecting cards
<img src="https://i.imgur.com/7o6hWpi.png" width="600px">
## Pause
<img src="https://i.imgur.com/IB0cSPb.png" width="600px">
## Game Report
<img src="https://i.imgur.com/AOmHah2.png" width="600px">

## Rules
The Rules of the memory game itself:
- The cards should be laid out in a grid
- Click to turn over any two cards.
- If the two cards match, keep them in a revealed state.
- If they don't match, turn them back over. (If in multiplayer mode) Watch and remember during the other player's turn.
- The game is over when all the cards have been matched

## Current Progress
- [x] Multi Player mode

- [x] Tracking Scores

- [ ] Tracking Best Score

- [x] Tracking time

- [x] Adjustable number of cards in the game (difficulty levels)


# Tech stack
React, Lodash, Moment, Styled Components

# Develop
## Install all packages with yarn
```
yarn
```

## Run application
##
```
yarn start
```

## Some thoughts
I decide to handle most events with local component state.
This is because I think the events and interation between components are not complex enough to use redux here.
However, I think I let component `GameBoard` takes too many jobs with local component states.

## Todos:
- Tracking Best Score
- Refactor component `GameBoard` to make the code more readable
- Pixel Perfect this application
