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

  const userMode = userModeRef.current;
  const gridObject = gridObjectRef.current;

  const runAlgorithm = () => {
    resetGridKeepWalls();
    bfsRef.current.run();
    userMode.setIsRunning(true); //  program has started running
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
          userMode.setIsRunning(false); //  program has stopped running
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
    userMode.setIsRunning(false);
    gridObject.resetKeepWalls();
    clearAnimations();
  };

  const resetGrid = () => {
    userMode.setIsRunning(false);
    gridObject.reset();
    clearAnimations();
  };

  useEffect(() => {
    gridObjectRef.current.setStartNode(
      gridObjectRef.current.DEFAULT_START_COORD
    );
    gridObjectRef.current.setEndNode(gridObjectRef.current.DEFAULT_END_CORD);
  }, []);

  const toggleWall = (node: Node) => {
    if (node.getIsWall()) node.setIsWall(false);
    else node.setIsWall(true);
  };

  const onNodeDown = (node: Node) => {
    userMode.mouseHeld = true;
    if (userMode.placeWall && !userMode.isRunning) toggleWall(node);
  };

  const onNodeEnter = (node: Node) => {
    if (userMode.mouseHeld && userMode.placeWall && !userMode.isRunning)
      toggleWall(node);
  };

  const onNodeClick = (node: Node) => {
    if (userMode.isRunning) return;
    if (node.getIsStart() && userMode.placeWall) {
      gridObject.setStartNode(null);
      userMode.setPlaceStart();
    } else if (node.getIsEnd() && userMode.placeWall) {
      gridObject.setEndNode(null);
      userMode.setPlaceEnd();
    } else if (userMode.placeStart && !node.getIsStart() && !node.getIsEnd()) {
      gridObject.setStartNode(node.getCoord());
      userMode.setPlaceWall();
    } else if (userMode.placeEnd && !node.getIsStart() && !node.getIsEnd()) {
      gridObject.setEndNode(node.getCoord());
      userMode.setPlaceWall();
    }
  };

  return (
    <div>
      <GridTiles
        grid={gridObject.grid}
        onNodeClick={onNodeClick}
        onNodeEnter={onNodeEnter}
        onNodeDown={onNodeDown}
        onGridUp={() => (userMode.mouseHeld = false)}
        onGridLeave={() => (userMode.mouseHeld = false)}
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
