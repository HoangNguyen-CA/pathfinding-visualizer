import React from 'react';
import AlgorithmEnum from '../../types/AlgorithmEnum';
import styles from './Controls.module.css';

const Controls = ({
  runAlgorithm,
  resetGrid,
  resetGridKeepWalls,
  onAlgorithmChange,
  algorithmRef,
}: {
  runAlgorithm: () => void;
  resetGrid: () => void;
  resetGridKeepWalls: () => void;
  onAlgorithmChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  algorithmRef: React.RefObject<HTMLSelectElement>;
}) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={runAlgorithm}>
        Run Algorithm
      </button>
      <button className={styles.btn} onClick={resetGridKeepWalls}>
        Reset
      </button>
      <button className={styles.btn} onClick={resetGrid}>
        Clear Walls
      </button>
      <select
        className={styles.select}
        name='algorithms'
        onChange={onAlgorithmChange}
        ref={algorithmRef}
      >
        <option value={AlgorithmEnum.BFS}>BFS</option>
        <option value={AlgorithmEnum.DFS}>DFS</option>
      </select>
    </div>
  );
};

export default Controls;
