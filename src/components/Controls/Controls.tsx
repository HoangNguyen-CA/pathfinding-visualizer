import { useState } from 'react';
import EditMode from '../../types/EditMode';
import styles from './Controls.module.css';

const Controls = ({
  runAlgorithm,
  resetGrid,

  editMode,
}: {
  runAlgorithm: () => void;
  resetGrid: () => void;
  editMode: EditMode;
}) => {
  const [, setDummy] = useState({}); // dummy state to force re-render

  const handlePlaceStart = () => {
    if (editMode.isStart) editMode.isWall = true;
    else editMode.isStart = true;
    setDummy({});
  };

  const handlePlaceEnd = () => {
    if (editMode.isEnd) editMode.isWall = true;
    else editMode.isEnd = true;
    setDummy({});
  };

  return (
    <div>
      <button onClick={runAlgorithm}>Run Algorithm</button>
      <button onClick={resetGrid}>Reset</button>
      <button
        onClick={handlePlaceStart}
        className={editMode.isStart ? styles.buttonActive : ''}
      >
        Place Start
      </button>
      <button
        onClick={handlePlaceEnd}
        className={editMode.isEnd ? styles.buttonActive : ''}
      >
        Place End
      </button>
    </div>
  );
};

export default Controls;
