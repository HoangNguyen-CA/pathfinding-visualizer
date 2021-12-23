import React from 'react';
import styles from './NodeTile.module.css';
import Node from '../../types/Node';
import EditMode from '../../types/EditMode';
import Grid from '../../types/Grid';

const NodeTile = ({
  node,
  editMode,
  gridObject,
}: {
  node: Node;
  editMode: EditMode;
  gridObject: Grid;
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!editMode.isWall) return;

    if (node.isWall) node.setNotWall();
    else node.setWall();
    editMode.mouseHeld = true;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!editMode.mouseHeld || !editMode.isWall) return;
    if (node.isWall) node.setNotWall();
    else node.setWall();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    editMode.mouseHeld = false;
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (editMode.isStart) gridObject.setStartNode(node.coord);
    if (editMode.isEnd) gridObject.setEndNode(node.coord);
  };

  return (
    <div
      className={styles.container}
      ref={node.ref}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleMouseClick}
    ></div>
  );
};

export default NodeTile;
