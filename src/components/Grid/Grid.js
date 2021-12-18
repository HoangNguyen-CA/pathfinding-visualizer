import React from 'react';
import styles from './Grid.module.css';
import Node from '../Node/Node';

const Grid = ({ grid }) => {
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
