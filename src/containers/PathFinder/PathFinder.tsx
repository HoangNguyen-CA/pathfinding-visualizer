import React, { useState } from 'react';
import NodeType from '../../types/Node';
import Grid from '../../components/Grid/Grid';

const COLS = 20;
const ROWS = 20;

const genGrid = () => {
  const grid: NodeType[][] = [];
  for (let i = 0; i < ROWS; i++) {
    const row: NodeType[] = [];
    for (let j = 0; j < COLS; j++) {
      row.push(new NodeType(i, j));
    }
    grid.push(row);
  }
  return grid;
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
