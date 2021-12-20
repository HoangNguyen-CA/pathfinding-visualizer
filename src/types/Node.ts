import Coord from './Coord';
class Node {
  id: number;
  coord: Coord;
  visited: boolean;
  start: boolean;
  end: boolean;

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
  }

  getNeighbors(grid: Node[][]): Node[] {
    const neighbors: Node[] = [];
    if (this.coord[0] > 0) {
      let left = grid[this.coord[0] - 1][this.coord[1]];
      neighbors.push(left); // left
    }
    if (this.coord[0] < grid[0].length - 1) {
      let right = grid[this.coord[0] + 1][this.coord[1]];
      neighbors.push(right); //right
    }
    if (this.coord[1] > 0) {
      let up = grid[this.coord[0]][this.coord[1] - 1];
      neighbors.push(up); //up
    }

    if (this.coord[1] < grid.length - 1) {
      let down = grid[this.coord[0]][this.coord[1] + 1];
      neighbors.push(down); //down
    }
    return neighbors;
  }
}

export default Node;
