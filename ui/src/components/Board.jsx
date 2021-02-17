import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import {createGame, createMove} from "../services/api";
const Board = ({ height, width, mines }) => {
  const [boardData, setBoardData] = useState(
    Array.from({ length: height }, (v, i) =>
      Array.from({ length: width }, (v, i) => ({
 
      }))
    )
  );
  const [gameStatus, setGameStatus] = useState("Game in progress");

  const [mineCount, setMineCount] = useState(mines);

  const [isSet, setIsSet] = useState(false);

  /* Helper Functions */
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    console.log("board", boardData);
  }, [boardData]);

  const getMines = (data) => {
    let mineArray = [];
    20;
    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  };

  // get Flags
  const getFlags = (data) => {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  };

  // get Hidden cells
  const getHidden = (data) => {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  };

  // get random number given a dimension
  const getRandomNumber = (dimension) => {
    // return Math.floor(Math.random() * dimension);
    return Math.floor(Math.random() * 1000 + 1) % dimension;
  };

  // Gets initial board data
  const initBoardData =async () => {

    const { board } = await createGame({ name:"intermediate" } );
    console.log(result);
 
    setBoardData(board);
    setIsSet(true);
    console.log(isSet);
    // return data;
  };

 
  // // looks for neighbouring cells and returns them
  // const traverseBoard = (x, y, data) => {
  //   const el = [];

  //   //up
  //   if (x > 0) {
  //     el.push(data[x - 1][y]);
  //   }

  //   //down
  //   if (x < height - 1) {
  //     el.push(data[x + 1][y]);
  //   }

  //   //left
  //   if (y > 0) {
  //     el.push(data[x][y - 1]);
  //   }

  //   //right
  //   if (y < width - 1) {
  //     el.push(data[x][y + 1]);
  //   }

  //   // top left
  //   if (x > 0 && y > 0) {
  //     el.push(data[x - 1][y - 1]);
  //   }

  //   // top right
  //   if (x > 0 && y < width - 1) {
  //     el.push(data[x - 1][y + 1]);
  //   }

  //   // bottom right
  //   if (x < height - 1 && y < width - 1) {
  //     el.push(data[x + 1][y + 1]);
  //   }

  //   // bottom left
  //   if (x < height - 1 && y > 0) {
  //     el.push(data[x + 1][y - 1]);
  //   }

  //   return el;
  // };

  // // reveals the whole board
  // const revealBoard = () => {
  //   let updatedData = boardData;
  //   updatedData.map((datarow) => {
  //     datarow.map((dataitem) => {
  //       dataitem.isRevealed = true;
  //     });
  //   });
  //   setBoardData([...updatedData]);
  // };

  // /* reveal logic for empty cell */
  // const revealEmpty = (x, y, data) => {
  //   c
  //   let area = traverseBoard(x, y, data);
  //   area.map((value) => {
  //     if (
  //       !value.isFlagged &&
  //       !value.isRevealed &&
  //       (value.isEmpty || !value.isMine)
  //     ) {
  //       data[value.x][value.y].isRevealed = true;
  //       if (value.isEmpty) {
  //         revealEmpty(value.x, value.y, data);
  //       }
  //     }
  //   });
  //   return data;
  // };

  // Handle User Events

  const handleCellClick = (x, y) => {
    // check if revealed. return if true.
    if (boardData[x][y].isRevealed || boardData[x][y].isFlagged) return null;

    // check if mine. game over if true
    if (boardData[x][y].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      alert("game over");
    }

    let updatedData = [...boardData];
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData).length === mines) {
      setMineCount(0);
      setGameStatus("You win");
      revealBoard();
      alert("You Win");
    }
    setMineCount(mines - getFlags(updatedData).length);
    setBoardData(updatedData);
  };

  const handleContextMenu = (e, x, y) => {
    e.preventDefault();
    let updatedData = [...boardData];
    let mines = mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const FlagArray = getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
        setMineCount(0);
        setGameStatus("You win");
        revealBoard();
        alert("You Win");
      }
    }
    setMineCount(mines);
    setBoardData(updatedData);
  };

  const renderBoard = (data) => {
    console.log("HEREEE", data);
    return data.map((datarow) => {
      return datarow.map((dataItem) => {
        <tr>
          {/* <div key={dataItem.x * datarow.length + dataItem.y}> */}
          <Cell
            onClick={() => handleCellClick(dataItem.x, dataItem.y)}
            cMenu={(e) => handleContextMenu(e, dataItem.x, dataItem.y)}
            value={dataItem}
          />
          {datarow[datarow.length - 1] === dataItem ? (
            <div className="clear" />
          ) : (
            ""
          )}
          {/* </div> */}
        </tr>;
      });
    });
  };

  return (
    <div className="board">
      <div className="game-info">
        <button onClick={initBoardData}> Start </button>
        <span className="info">Mines remaining: {mineCount}</span>
        <h1 className="info">{gameStatus}</h1>
      </div>
      <table>
        <tbody>
          {isSet &&
            boardData.map((dataRow) => {
              return (
                <tr className="mapRow">
                  {dataRow.map((dataItem) => {
                    return (
                      <td>
                        <Cell
                          onClick={() =>
                            handleCellClick(dataItem.x, dataItem.y)
                          }
                          cMenu={(e) =>
                            handleContextMenu(e, dataItem.x, dataItem.y)
                          }
                          value={dataItem}
                        />
                        {dataRow[dataRow.length - 1] === dataItem ? (
                          <div className="clear" />
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
