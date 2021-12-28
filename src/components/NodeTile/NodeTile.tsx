import React from 'react';

const NodeTile = ({
  forwardedRef,
  onNodeClick,
  onNodeEnter,
  onNodeDown,
}: {
  forwardedRef: React.RefObject<HTMLDivElement>;
  onNodeClick: () => void;
  onNodeEnter: () => void;
  onNodeDown: () => void;
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onNodeDown();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onNodeEnter();
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onNodeClick();
  };

  return (
    <div
      className='node'
      ref={forwardedRef}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onClick={handleMouseClick}
    ></div>
  );
};

export default NodeTile;
