import { createContext, useContext, useState } from "react";

const GameContext = createContext({
  score: 1,
  setScore: (score) => {}
});

export function Main() {
  let [score, setScore] = useState(1);

  return (
    <GameContext.Provider value={{ score, setScore }}>
      <Game />
    </GameContext.Provider>
  );
}

function Game() {
  const { score } = useContext(GameContext);
  return (
    <div>
      {/* {score} */}
      <h2> Snakes & Ladders</h2>
      <Board />
      <Dice />
    </div>
  );
}

function Board() {
  const height = 4;
  let rows = [];

  for (var i = height; i > -1; i--) {
    rows.push(<Row key={i} row={i} />);
  }

  return (
    <div className="board">
      {rows}
      <Counter />
      <Snake />
      <Ladder />
    </div>
  );
}

function Snake() {
  const start = 14;
  const end = 23;

  const startCoords = getCoords(start);
  const endCoords = getCoords(end);

  return (
    <div
      className="snake"
      style={{
        top: "0", //startCoords.column,
        left: "100px", //startCoords.row,
        height: "150px", //endCoords.column,
        width: "125px", //endCoords.row
        transform: "rotate(240deg)"
      }}
    >
      <img src="https://media3.giphy.com/media/5fwoTYsw2D6yFI5X9x/giphy.gif?cid=ecf05e47uhr8ygc4efpygupmi7ylgr93ccew5t88xc439x1x&amp;rid=giphy.gif&amp;ct=s" />
    </div>
  );
}
function Ladder() {
  const start = 19;
  const end = 8;

  const startCoords = getCoords(start);
  const endCoords = getCoords(end);

  // 75px 75px 75px 125px
  return (
    <div
      className="ladder"
      style={{
        // background: "green",
        top: "50px", //endCoords.column,
        left: "30px", //endCoords.row,
        height: "150px", //startCoords.column,
        width: "150px", //startCoords.row
        transform: "rotate(-25deg)"
      }}
    >
      <img src="https://media2.giphy.com/media/FLLopNUTGFfA1pr3UE/200.webp?cid=ecf05e479xyarxi4vxkl7yxs1noc4xfmvqrqgqtp0edrwz3s&rid=200.webp&ct=s" />
    </div>
  );
}

function getCoords(score) {
  const remainder = score % 5 || 5;

  const row =
    remainder === 5
      ? Math.floor((score - 1) / 5) * 50 + "px"
      : Math.floor(score / 5) * 50 + "px";

  let column;
  const evenRow = Boolean(Math.floor((score - 1) / 5) % 2);

  if (!evenRow) {
    column = (remainder - 1) * 50 + "px";
  } else {
    column = 200 - (remainder - 1) * 50 + "px";
  }

  return { row, column };
}

function Counter() {
  const { score } = useContext(GameContext);
  const coords = getCoords(score);

  return (
    <div
      className="counter"
      style={{ bottom: coords.row, left: coords.column }}
    />
  );
}

function Row({ row }) {
  const width = 5;
  const cells = [];

  for (var i = 0; i < width; i++) {
    cells.push(<Cell key={i} value={row * 5 + i + 1} />);
  }

  return <div className="row">{cells}</div>;
}

function Cell({ value }) {
  return (
    <div className="cell">
      <span>{value}</span>
    </div>
  );
}

function Dice() {
  const { score, setScore } = useContext(GameContext);
  const [value, setValue] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);

  const handleClick = () => {
    if (score === 25) {
      setScore(1);
    } else {
      roll();
    }
  };

  const adjustScore = (score, result) => {
    const newScore = score + result;

    if (newScore > 25) {
      setScore(25);
    } else if (newScore === 8) {
      console.log("LADDER");
      setScore(19);
    } else if (newScore === 23) {
      console.log("SNAKE!!!");
      setScore(14);
    } else {
      setScore(newScore);
    }
  };

  const roll = () => {
    setDiceRolling(true);

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setValue(result);
      setDiceRolling(false);
      adjustScore(score, result);
    }, 1250);
  };

  return (
    <>
      <button onClick={handleClick} className="dice-button">
        <p>{score === 25 ? "Click to play again" : "Click to roll"}</p>
      </button>
      <h3>Dice Value: {diceRolling ? "Rolling Dice...." : value}</h3>
    </>
  );
}
