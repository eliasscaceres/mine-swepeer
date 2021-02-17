import React, { Component } from "react";
import { render } from "react-dom";
import Board from "./components/Board";
import "./styles/styles.scss";

export const init = (selector) => {
  const state = {
    height: 6,
    width: 6,
    mines: 10,
  };
  render(
    <div className="game">
      <Board height={state.height} width={state.width} mines={state.mines} />
    </div>,
    document.getElementById(selector)
  );
};
