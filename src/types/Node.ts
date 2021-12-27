import React from 'react';
import Coord from './Coord';

class Node {
  private id: number;
  private coord: Coord;
  private visited: boolean = false;
  private isStart: boolean = false;
  private isEnd: boolean = false;
  private parent: Node | null = null;
  private isWall: boolean = false;

  private ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  constructor(row: number, col: number, id: number) {
    this.id = id;
    this.coord = [row, col];
  }

  resetKeepWalls() {
    this.setIsPath(false);
    this.setParent(null);
    this.setVisited(false);
  }

  reset() {
    this.resetKeepWalls();
    this.setIsWall(false);
  }

  hardReset() {
    this.reset();
    this.setIsStart(false);
    this.setIsEnd(false);
  }

  getId() {
    return this.id;
  }

  getCoord() {
    return this.coord;
  }

  getVisited() {
    return this.visited;
  }

  setVisited(bool: boolean) {
    if (bool) {
      this.visited = true;
      if (this.ref.current) this.ref.current.classList.add('node-visited');
    } else {
      this.visited = false;
      if (this.ref.current) this.ref.current.classList.remove('node-visited');
    }
  }

  getIsStart() {
    return this.isStart;
  }

  setIsStart(bool: boolean) {
    if (bool) {
      this.isStart = true;
      if (this.ref.current) this.ref.current.classList.add('node-start');
    } else {
      this.isStart = false;
      if (this.ref.current) this.ref.current.classList.remove('node-start');
    }
  }

  getIsEnd() {
    return this.isEnd;
  }

  setIsEnd(bool: boolean) {
    if (bool) {
      this.isEnd = true;
      if (this.ref.current) this.ref.current.classList.add('node-end');
    } else {
      this.isEnd = false;
      if (this.ref.current) this.ref.current.classList.remove('node-end');
    }
  }

  getParent() {
    return this.parent;
  }

  setParent(parent: Node | null) {
    this.parent = parent;
  }

  getRef() {
    return this.ref;
  }

  getIsWall() {
    return this.isWall;
  }

  setIsWall(bool: boolean) {
    if (this.isStart || this.isEnd) return;

    if (bool) {
      this.isWall = true;
      if (this.ref.current) this.ref.current.classList.add('node-wall');
    } else {
      this.isWall = false;
      if (this.ref.current) this.ref.current.classList.remove('node-wall');
    }
  }

  setIsPath(bool: boolean) {
    if (bool) {
      if (this.ref.current) this.ref.current.classList.add('node-path');
    } else {
      if (this.ref.current) this.ref.current.classList.remove('node-path');
    }
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
