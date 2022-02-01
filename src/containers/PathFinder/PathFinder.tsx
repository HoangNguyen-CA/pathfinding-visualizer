import React, { useRef, useEffect } from 'react';
import Algorithm from '../../types/Algorithm';
import AlgorithmEnum from '../../types/AlgorithmEnum';
import GridTiles from '../../components/GridTiles/GridTiles';
import Controls from '../../components/Controls/Controls';
import Grid from '../../types/Grid';
import BFS from '../../algorithms/BFS';
import DFS from '../../algorithms/DFS';
import Node from '../../types/Node';
import UserMode from '../../types/UserMode';

import styles from './PathFinder.module.css';

const SPEED_VISITED = 5;
const SPEED_PATH = 10;
const ROWS = 40;
const COLS = 80;

const PathFinder = () => {
  // OBJECT REFS
  const gridObjectRef = useRef<Grid>(new Grid(ROWS, COLS));
  const algorithmRef = useRef<Algorithm>(new BFS(gridObjectRef.current));
  const userModeRef = useRef<UserMode>(new UserMode());
  const animIdsRef = useRef<number[]>([]);

  // DOM REFS
  const gridTilesRef = useRef<HTMLDivElement>(null);
  const selectAlgorithmRef = useRef<HTMLSelectElement>(null);

  const runAlgorithm = () => {
    resetGridKeepWalls();
    userModeRef.current.setPlaceWall();
    algorithmRef.current.run();

    userModeRef.current.setIsRunning(true); //  program has started running
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
          userModeRef.current.setIsRunning(false); //  program has stopped running
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
    userModeRef.current.setIsRunning(false);
    gridObjectRef.current.resetKeepWalls();
    clearAnimations();
  };

  const resetGrid = () => {
    userModeRef.current.setIsRunning(false);
    gridObjectRef.current.reset();
    clearAnimations();
  };

  useEffect(() => {
    gridObjectRef.current.setStartNode(
      gridObjectRef.current.DEFAULT_START_COORD
    );
    gridObjectRef.current.setEndNode(gridObjectRef.current.DEFAULT_END_CORD);
  }, []);

  const onNodeDown = (node: Node) => {
    if (userModeRef.current.isRunning) return;
    userModeRef.current.mouseHeld = true;
    if (userModeRef.current.placeWall) node.toggleWall();
  };

  const onNodeEnter = (node: Node) => {
    const userMode = userModeRef.current;
    const gridObject = gridObjectRef.current;

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
    const userMode = userModeRef.current;
    const gridObject = gridObjectRef.current;

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
    let algo = selectAlgorithmRef.current?.value as AlgorithmEnum;
    resetGridKeepWalls();
    if (algo === AlgorithmEnum.BFS) {
      algorithmRef.current = new BFS(gridObjectRef.current);
    } else if (algo === AlgorithmEnum.DFS) {
      algorithmRef.current = new DFS(gridObjectRef.current);
    }
  };

  return (
    <div className={styles.container}>
      <Controls
        runAlgorithm={runAlgorithm}
        resetGrid={resetGrid}
        resetGridKeepWalls={resetGridKeepWalls}
        algorithmRef={selectAlgorithmRef}
        onAlgorithmChange={onAlgorithmChange}
      />
      <GridTiles
        grid={gridObjectRef.current.grid}
        onNodeClick={onNodeClick}
        onNodeEnter={onNodeEnter}
        onNodeDown={onNodeDown}
        onGridUp={() => (userModeRef.current.mouseHeld = false)}
        onGridLeave={() => (userModeRef.current.mouseHeld = false)}
        gridTilesRef={gridTilesRef}
      />
    </div>
  );
};

export default PathFinder;
