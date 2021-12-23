import React from 'react';
import Coord from './Coord';
class Node {
  id: number;
  coord: Coord;
  visited: boolean;
  start: boolean;
  end: boolean;
  parent: Node | null;
  ref: React.RefObject<HTMLDivElement>;
  isWall: boolean;

  constructor(
    row: number,
    col: number,
    id: number,
    visited: boolean = false,
    start: boolean = false,
    end: boolean = false
  ) {
    this.id = id;
    this.coord = [row, col];
    this.visited = visited;
    this.start = start;
    this.end = end;
    this.ref = React.createRef<HTMLDivElement>();
    this.parent = null;
    this.isWall = false;
  }

  setVisited() {
    this.visited = true;
    if (this.ref.current) this.ref.current.classList.add('node-visited');
  }

  setNotVisited() {
    this.visited = false;
    if (this.ref.current) this.ref.current.classList.remove('node-visited');
  }

  setPath() {
    if (this.ref.current) this.ref.current.classList.add('node-path');
  }

  setNotPath() {
    if (this.ref.current) this.ref.current.classList.remove('node-path');
  }

  setStart() {
    this.start = true;
    if (this.ref.current) this.ref.current.classList.add('node-start');
  }

  setNotStart() {
    this.start = false;
    if (this.ref.current) this.ref.current.classList.remove('node-start');
  }

  setEnd() {
    this.end = true;
    if (this.ref.current) this.ref.current.classList.add('node-end');
  }

  setNotEnd() {
    this.end = false;
    if (this.ref.current) this.ref.current.classList.remove('node-end');
  }

  setWall() {
    if (this.start || this.end) return;
    this.isWall = true;
    if (this.ref.current) this.ref.current.classList.add('node-wall');
  }

  setNotWall() {
    this.isWall = false;
    if (this.ref.current) this.ref.current.classList.remove('node-wall');
  }

  getNeighbors(grid: Node[][]): Node[] {
    const neighbors: Node[] = [];
    let left, right, up, down;
    if (this.coord[0] > 0) {
      up = grid[this.coord[0] - 1][this.coord[1]];
      neighbors.push(up);
    }
    if (this.coord[1] < grid[0].length - 1) {
      right = grid[this.coord[0]][this.coord[1] + 1];
      neighbors.push(right);
    }
    if (this.coord[0] < grid.length - 1) {
      down = grid[this.coord[0] + 1][this.coord[1]];
      neighbors.push(down);
    }
    if (this.coord[1] > 0) {
      left = grid[this.coord[0]][this.coord[1] - 1];
      neighbors.push(left);
    }

    return neighbors;
  }
}

export default Node;
