import styles from './Grid.module.css';
import NodeType from '../../types/Node';
import Node from '../Node/Node';

const Grid = ({ grid }: { grid: NodeType[][] }) => {
  return (
    <>
      {grid.map((row, indx1) => {
        return (
          <div key={indx1} className={styles.gridRow}>
            {row.map((node) => {
              return <Node key={node.id} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Grid;
