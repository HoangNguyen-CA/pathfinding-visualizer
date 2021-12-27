import { useRef, useEffect } from 'react';
import GridTiles from '../../components/GridTiles/GridTiles';
import Controls from '../../components/Controls/Controls';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';
import Node from '../../types/Node';
import UserMode from '../../types/UserMode';

const SPEED_VISITED = 2;
const SPEED_PATH = 20;
const ROWS = 30;
const COLS = 70;

const PathFinder = () => {
  const gridObjectRef = useRef(new Grid(ROWS, COLS));
  const bfsRef = useRef(new BFS(gridObjectRef.current));
  const userModeRef = useRef(new UserMode());
  const animIdsRef = useRef([] as number[]);

  const runAlgorithm = () => {
    resetGridKeepWalls();
    userModeRef.current.setDisabled();
    bfsRef.current.run();
    for (let i = 0; i < bfsRef.current.orderVisited.length; i++) {
      let animId = window.setTimeout(() => {
        bfsRef.current.orderVisited[i].setVisited(true);
        if (i === bfsRef.current.orderVisited.length - 1) {
          animatePath(bfsRef.current.path);
        }
      }, i * SPEED_VISITED);
      animIdsRef.current.push(animId);
    }
  };

  const animatePath = (path: Node[]) => {
    for (let i = 0; i < path.length; i++) {
      let animId = window.setTimeout(() => {
        path[i].setIsPath(true);
        if (i === path.length - 1) {
          userModeRef.current.setPlaceWall();
        }
      }, i * SPEED_PATH);
      animIdsRef.current.push(animId);
    }
  };

  const clearAnimations = () => {
    for (let id of animIdsRef.current) {
      window.clearTimeout(id);
    }
    animIdsRef.current = [];
  };

  const resetGridKeepWalls = () => {
    userModeRef.current.setPlaceWall();
    gridObjectRef.current.resetKeepWalls();
    clearAnimations();
  };

  const resetGrid = () => {
    userModeRef.current.setPlaceWall();
    gridObjectRef.current.reset();
    clearAnimations();
  };

  useEffect(() => {
    gridObjectRef.current.setStartNode(
      gridObjectRef.current.DEFAULT_START_COORD
    );
    gridObjectRef.current.setEndNode(gridObjectRef.current.DEFAULT_END_CORD);
  }, []);

  return (
    <div>
      <GridTiles
        gridObject={gridObjectRef.current}
        userMode={userModeRef.current}
      />
      <Controls
        runAlgorithm={runAlgorithm}
        resetGrid={resetGrid}
        resetGridKeepWalls={resetGridKeepWalls}
      />
    </div>
  );
};

export default PathFinder;
