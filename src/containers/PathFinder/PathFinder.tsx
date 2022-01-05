import React, { useRef, useEffect } from 'react';
import Algorithm from '../../types/Algorithm';
import GridTiles from '../../components/GridTiles/GridTiles';
import Controls from '../../components/Controls/Controls';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';
import Node from '../../types/Node';
import UserMode from '../../types/UserMode';

const SPEED_VISITED = 3;
const SPEED_PATH = 20;
const ROWS = 40;
const COLS = 70;

const PathFinder = () => {
  const gridObjectRef = useRef(new Grid(ROWS, COLS));
  const algorithmRef = useRef<Algorithm>(new BFS(gridObjectRef.current));
  const userModeRef = useRef(new UserMode());
  const animIdsRef = useRef([] as number[]);
  const gridTilesRef = useRef<HTMLDivElement>(null);
  const selectAlgorithmRef = useRef<HTMLSelectElement>(null);

  const userMode = userModeRef.current;
  const gridObject = gridObjectRef.current;

  const runAlgorithm = () => {
    resetGridKeepWalls();
    userMode.setPlaceWall();
    algorithmRef.current.run();
    userMode.setIsRunning(true); //  program has started running
    for (let i = 0; i < algorithmRef.current.orderVisited.length; i++) {
      let animId = window.setTimeout(() => {
        algorithmRef.current.orderVisited[i].setVisited(true);
        if (i === algorithmRef.current.orderVisited.length - 1) {
          animatePath(algorithmRef.current.path);
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

  const onNodeDown = (node: Node) => {
    if (userMode.isRunning) return;
    userMode.mouseHeld = true;
    if (userMode.placeWall) node.toggleWall();
  };

  const onNodeEnter = (node: Node) => {
    if (userMode.isRunning) return;
    if (userMode.mouseHeld && userMode.placeWall) node.toggleWall();
    else if (!node.getIsStart() && !node.getIsEnd() && !node.getIsWall()) {
      if (userMode.placeStart) {
        gridObject.startNode.getRef().current?.classList.remove('node-grabbed');
        gridObject.setStartNode(node.getCoord());
        gridObject.startNode.getRef().current?.classList.add('node-grabbed');
      } else if (userMode.placeEnd) {
        gridObject.endNode.getRef().current?.classList.remove('node-grabbed');
        gridObject.setEndNode(node.getCoord());
        gridObject.endNode.getRef().current?.classList.add('node-grabbed');
      }
    }
  };

  const onNodeClick = (node: Node) => {
    if (userMode.isRunning) return;
    if (userMode.placeWall) {
      if (node.getIsStart()) {
        userMode.setPlaceStart();
        gridTilesRef.current?.classList.add('grid-active');
        node.getRef().current?.classList.add('node-grabbed');
      } else if (node.getIsEnd()) {
        userMode.setPlaceEnd();
        gridTilesRef.current?.classList.add('grid-active');
        node.getRef().current?.classList.add('node-grabbed');
      }
    } else if (userMode.placeStart || userMode.placeEnd) {
      userMode.setPlaceWall();
      gridTilesRef.current?.classList.remove('grid-active');
      gridObject.startNode.getRef().current?.classList.remove('node-grabbed');
      gridObject.endNode.getRef().current?.classList.remove('node-grabbed');
    }
  };

  const onAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(selectAlgorithmRef.current?.value);
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
        gridTilesRef={gridTilesRef}
      />
      <Controls
        runAlgorithm={runAlgorithm}
        resetGrid={resetGrid}
        resetGridKeepWalls={resetGridKeepWalls}
        algorithmRef={selectAlgorithmRef}
        onAlgorithmChange={onAlgorithmChange}
      />
    </div>
  );
};

export default PathFinder;
