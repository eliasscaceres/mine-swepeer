import React from "react";

const Cell = (props) => {
  const getValue = () => {
    const { value } = props;
    console.log("props", props);
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  };
  const { value, onClick, cMenu } = props;
  let className =
    "cell" +
    (value.isRevealed ? "" : " hidden") +
    (value.isMine ? " is-mine" : "") +
    (value.isFlagged ? " is-flag" : "");

  return (
    // <td className="cell" >
      <div onClick={onClick} className={className} onContextMenu={cMenu}>
        {getValue()}
      </div>
    //  </td>
  );
};

export default Cell;
