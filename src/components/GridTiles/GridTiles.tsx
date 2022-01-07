import React from 'react';
import styles from './GridTiles.module.css';
import NodeTile from '../NodeTile/NodeTile';
import Node from '../../types/Node';

const GridTiles = ({
  grid,
  onNodeClick,
  onNodeEnter,
  onGridUp,
  onNodeDown,
  onGridLeave,
  gridTilesRef,
}: {
  grid: Node[][];
  onNodeClick: (arg: Node) => void;
  onNodeEnter: (arg: Node) => void;
  onNodeDown: (arg: Node) => void;
  onGridLeave: () => void;
  onGridUp: () => void;
  gridTilesRef: React.RefObject<HTMLDivElement>;
}) => {
  const handleGridLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onGridLeave();
  };
  const handleGridUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onGridUp();
  };
  return (
    <div className={styles.wrapper}>
      <div
        onMouseLeave={handleGridLeave}
        onMouseUp={handleGridUp}
        className={styles.container}
        ref={gridTilesRef}
      >
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={styles.gridRow}>
              {row.map((node) => {
                return (
                  <NodeTile
                    key={node.getId()}
                    forwardedRef={node.getRef()}
                    onNodeClick={() => onNodeClick(node)}
                    onNodeEnter={() => onNodeEnter(node)}
                    onNodeDown={() => onNodeDown(node)}
                  ></NodeTile>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(GridTiles, () => false); // prevent any re-rendering
