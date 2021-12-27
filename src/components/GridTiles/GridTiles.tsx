import React from 'react';
import styles from './GridTiles.module.css';
import NodeTile from '../NodeTile/NodeTile';
import UserMode from '../../types/UserMode';
import Grid from '../../types/Grid';

const GridTiles = ({
  gridObject,
  userMode,
}: {
  gridObject: Grid;
  userMode: UserMode;
}) => {
  return (
    <div
      onMouseLeave={() => (userMode.mouseHeld = false)}
      className={styles.container}
    >
      {gridObject.grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.gridRow}>
            {row.map((node) => {
              return (
                <NodeTile
                  key={node.getId()}
                  node={node}
                  userMode={userMode}
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

export default React.memo(GridTiles, () => false); // prevent any re-rendering
