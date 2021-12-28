import React from 'react';
import styles from './NodeTile.module.css';
import Node from '../../types/Node';
import UserMode from '../../types/UserMode';
import Grid from '../../types/Grid';

const NodeTile = ({
  node,
  userMode,
  gridObject,
}: {
  node: Node;
  userMode: UserMode;
  gridObject: Grid;
}) => {
  const toggleWall = () => {
    if (node.getIsWall()) node.setIsWall(false);
    else node.setIsWall(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    userMode.mouseHeld = true;
    if (userMode.placeWall && !userMode.isRunning) toggleWall();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userMode.mouseHeld && userMode.placeWall && !userMode.isRunning)
      toggleWall();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    userMode.mouseHeld = false;
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    <div
      className={styles.container}
      ref={node.getRef()}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleMouseClick}
    ></div>
  );
};

export default NodeTile;
