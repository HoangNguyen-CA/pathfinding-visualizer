import React, { useState, useEffect } from 'react';
import GridTiles from '../../components/GridTiles/GridTiles';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';

const ROWS = 20;
const COLS = 30;

const gridObject = new Grid(ROWS, COLS, [10, 5], [10, 10]);
const bfs = new BFS(gridObject);
bfs.run();
console.log(bfs.orderVisited);

const PathFinder = () => {
  const [gridState, setGridState] = useState(gridObject.grid);

  useEffect(() => {
    for (let i = 0; i < bfs.orderVisited.length; i++) {
      setTimeout(() => {
        gridObject.visitNode(bfs.orderVisited[i].coord);
        setGridState(gridObject.grid);
      }, i * 20);
    }
  }, []);

  return (
    <div>
      <GridTiles grid={gridState} />
    </div>
  );
};

export default PathFinder;
