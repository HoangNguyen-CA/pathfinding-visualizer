import React, { useState } from 'react';
import Grid from '../../components/Grid/Grid';

const COLS = 20;
const ROWS = 20;

const genGrid = () => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      row.push(genNode(i, j));
    }
    grid.push(row);
  }
  return grid;
};

const genNode = (row, col) => {
  const node = {};
  node.distance = 100;
  node.id = row * col + col;
  return node;
};

const PathFinder = () => {
  const [grid] = useState(genGrid());
  return (
    <div>
      <Grid grid={grid} />
    </div>
  );
};

export default PathFinder;
