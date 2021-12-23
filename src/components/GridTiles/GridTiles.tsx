import React from 'react';
import styles from './GridTiles.module.css';
import NodeTile from '../NodeTile/NodeTile';
import EditMode from '../../types/EditMode';
import Grid from '../../types/Grid';

const GridTiles = ({
  gridObject,
  editMode,
}: {
  gridObject: Grid;
  editMode: EditMode;
}) => {
  return (
    <div
      onMouseLeave={() => (editMode.mouseHeld = false)}
      className={styles.container}
    >
      {gridObject.grid.map((row, indx1) => {
        return (
          <div key={indx1} className={styles.gridRow}>
            {row.map((node) => {
              return (
                <NodeTile
                  key={node.id}
                  node={node}
                  editMode={editMode}
                  gridObject={gridObject}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridTiles;
