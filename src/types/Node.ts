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
  }

  setVisited() {
    const current = this.ref.current;
    if (current) {
      current.classList.add('node-visited');
    }
  }

  setUnvisited() {
    const current = this.ref.current;
    if (current) {
      current.classList.remove('node-visited');
    }
  }

  setStart() {
    this.start = true;
    const current = this.ref.current;
    if (current) {
      current.classList.add('node-start');
    }
  }

  setNotStart() {
    this.start = false;
    const current = this.ref.current;
    if (current) {
      current.classList.remove('node-start');
    }
  }

  setEnd() {
    this.end = true;
    const current = this.ref.current;
    if (current) {
      current.classList.add('node-end');
    }
  }

  setNotEnd() {
    this.end = false;
    const current = this.ref.current;
    if (current) {
      current.classList.remove('node-end');
    }
  }

  getNeighbors(grid: Node[][]): Node[] {
    const neighbors: Node[] = [];
    let left;
    let right;
    let up;
    let down;
    if (this.coord[0] > 0) {
      up = grid[this.coord[0] - 1][this.coord[1]];
      neighbors.push(up);
    }
    if (this.coord[0] < grid.length - 1) {
      down = grid[this.coord[0] + 1][this.coord[1]];
      neighbors.push(down);
    }
    if (this.coord[1] < grid[0].length - 1) {
      right = grid[this.coord[0]][this.coord[1] + 1];
      neighbors.push(right);
    }
    if (this.coord[1] > 0) {
      left = grid[this.coord[0]][this.coord[1] - 1];
      neighbors.push(left);
    }

    return neighbors;
  }
}

export default Node;
