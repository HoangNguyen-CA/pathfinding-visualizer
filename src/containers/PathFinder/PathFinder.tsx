import { useEffect } from 'react';
import GridTiles from '../../components/GridTiles/GridTiles';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';

const ROWS = 30;
const COLS = 70;
const gridObject = new Grid(ROWS, COLS);
const bfs = new BFS(gridObject);
console.log(gridObject.startNode, gridObject.endNode);

const PathFinder = () => {
  useEffect(() => {
    gridObject.setStartNode([10, 10]);
    gridObject.setEndNode([10, 60]);
    bfs.run();
    console.log(bfs.orderVisited);
    for (let i = 0; i < bfs.orderVisited.length; i++) {
      setTimeout(() => {
        bfs.orderVisited[i].setVisited();
      }, i * 10);
    }
  }, []);

  return (
    <div>
      <GridTiles grid={gridObject.grid} />
    </div>
  );
};

export default PathFinder;
