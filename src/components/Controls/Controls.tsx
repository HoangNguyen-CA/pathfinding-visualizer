import React from 'react';

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
    <div>
      <button onClick={runAlgorithm}>Run Algorithm</button>
      <button onClick={resetGridKeepWalls}>Reset</button>
      <button onClick={resetGrid}>Clear Walls</button>
      <select name='algorithms' onChange={onAlgorithmChange} ref={algorithmRef}>
        <option value='BFS'>BFS</option>
        <option value='DFS'>DFS</option>
      </select>
    </div>
  );
};

export default Controls;
