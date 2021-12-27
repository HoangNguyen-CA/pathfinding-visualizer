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
    if (userMode.placeWall) toggleWall();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userMode.mouseHeld && !userMode.placeWall) toggleWall();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    userMode.mouseHeld = false;
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (node.getIsStart()) {
      gridObject.setStartNode(null);
      userMode.setPlaceStart();
    } else if (node.getIsEnd()) {
      gridObject.setEndNode(null);
      userMode.setPlaceEnd();
    } else if (userMode.placeStart) {
      gridObject.setStartNode(node.getCoord());
      userMode.setPlaceWall();
    } else if (userMode.placeEnd) {
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
