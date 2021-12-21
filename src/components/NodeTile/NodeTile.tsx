import React from 'react';
import styles from './NodeTile.module.css';

const NodeTile = ({
  forwardedRef,
}: {
  forwardedRef: React.RefObject<HTMLDivElement>;
}) => {
  const classes = [styles.container];

  return <div className={classes.join(' ')} ref={forwardedRef} />;
};

export default NodeTile;
