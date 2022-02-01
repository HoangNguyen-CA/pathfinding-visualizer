import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Manual.module.css';
import controlStyles from '../../components/Controls/Controls.module.css';

const Manual = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen(true)} className={controlStyles.btn}>
        Manual
      </button>
      <Modal show={open} close={() => setOpen(false)}>
        <h2 className={styles.header}>Pathfinding Visualizer Quick Start</h2>

        <p className={styles.desc}>
          This is a quick manual to explain how to use the app.
        </p>
        <br />
        <p className={styles.instructions}>
          Click "Run Algorithm" to begin the visualization. The visualizer will
          which tiles are visited. The visualization will start at the green
          (default top left) tile and end at the red tile (default bottom
          right). The algorithm will stop execution when the end tile is visited
          and display the path. If the end tile cannot be reached, the algorithm
          will stop executing.
          <br />
          <br />* note that the visualizer can be laggy on some devices since it
          uses many concurrent css animations.
        </p>

        <br />

        <h3 className={styles.subheader}>Features</h3>
        <ul className={styles.features}>
          <li className={styles.feature}>
            Walls can be created by clicking and dragging on empty (white)
            tiles. The pathfinder will avoid these tiles on their search.
          </li>
          <li className={styles.feature}>
            The start and end tiles can be moved by click on them and moving
            them to a new location
          </li>
          <li className={styles.feature}>
            Different algorithms can be selected from the dropdown menu. Only
            BFS and DFS algorithms are available, but more algorithms will be
            added at a later date.
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default Manual;
