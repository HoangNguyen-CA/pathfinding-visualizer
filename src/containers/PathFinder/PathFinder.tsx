import { useRef } from 'react';
import GridTiles from '../../components/GridTiles/GridTiles';
import Controls from '../../components/Controls/Controls';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';
import Node from '../../types/Node';
import EditMode from '../../types/EditMode';

const SPEED_VISITED = 2;
const SPEED_PATH = 20;
const ROWS = 30;
const COLS = 70;

const PathFinder = () => {
  const gridObjectRef = useRef(new Grid(ROWS, COLS));
  const bfsRef = useRef(new BFS(gridObjectRef.current));
  const editModeRef = useRef(new EditMode());

  const gridObject = gridObjectRef.current;
  const bfs = bfsRef.current;
  const editMode = editModeRef.current;

  const animatePath = (path: Node[]) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        path[i].setPath();
      }, i * SPEED_PATH);
    }
  };

  const runAlgorithm = () => {
    bfs.run();
    for (let i = 0; i < bfs.orderVisited.length; i++) {
      setTimeout(() => {
        console.log(i);
        bfs.orderVisited[i].setVisited();
        if (i === bfs.orderVisited.length - 1) {
          animatePath(bfs.path);
        }
      }, i * SPEED_VISITED);
    }
  };

  const resetGrid = () => {
    gridObject.reset();
  };

  return (
    <div>
      <GridTiles gridObject={gridObject} editMode={editMode} />
      <Controls
        runAlgorithm={runAlgorithm}
        resetGrid={resetGrid}
        editMode={editMode}
      />
    </div>
  );
};

export default PathFinder;
