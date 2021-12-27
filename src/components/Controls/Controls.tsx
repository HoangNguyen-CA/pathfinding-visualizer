const Controls = ({
  runAlgorithm,
  resetGrid,
  resetGridKeepWalls,
}: {
  runAlgorithm: () => void;
  resetGrid: () => void;
  resetGridKeepWalls: () => void;
}) => {
  return (
    <div>
      <button onClick={runAlgorithm}>Run Algorithm</button>
      <button onClick={resetGridKeepWalls}>Reset</button>
      <button onClick={resetGrid}>Clear Walls</button>
    </div>
  );
};

export default Controls;
