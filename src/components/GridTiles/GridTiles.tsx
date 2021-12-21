import React from 'react';
import styles from './GridTiles.module.css';
import NodeTile from '../NodeTile/NodeTile';
import Node from '../../types/Node';

const GridTiles = ({ grid }: { grid: Node[][] }) => {
  return (
    <>
      {grid.map((row, indx1) => {
        return (
          <div key={indx1} className={styles.gridRow}>
            {row.map((node) => {
              return <NodeTile key={node.id} forwardedRef={node.ref} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default GridTiles;
