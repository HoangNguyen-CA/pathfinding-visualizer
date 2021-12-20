import styles from './GridTiles.module.css';
import Node from '../../types/Node';
import NodeTile from '../NodeTile/NodeTile';

const GridTiles = ({ grid }: { grid: Node[][] }) => {
  return (
    <>
      {grid.map((row, indx1) => {
        return (
          <div key={indx1} className={styles.gridRow}>
            {row.map((node) => {
              return (
                <NodeTile
                  key={node.id}
                  visited={node.visited}
                  start={node.start}
                  end={node.end}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default GridTiles;
