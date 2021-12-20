import React from 'react';
import styles from './NodeTile.module.css';

const Node = ({
  visited,
  start,
  end,
}: {
  visited: boolean;
  start: boolean;
  end: boolean;
}) => {
  const classes = [styles.container];
  if (visited) classes.push(styles.visited);
  if (start) classes.push(styles.start);
  if (end) classes.push(styles.end);

  return <div className={classes.join(' ')} />;
};

export default Node;
