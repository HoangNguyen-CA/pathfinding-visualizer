import Node from './Node';
import Coord from './Coord';
class Grid {
  grid: Node[][];
  startCoord: Coord;
  endCoord: Coord;
  constructor(rows: number, cols: number, startCoord: Coord, endCoord: Coord) {
    const grid: Node[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Node[] = [];
      for (let j = 0; j < cols; j++) {
        const node = new Node(i, j, cols * i + j);
        if (i === startCoord[0] && j === startCoord[1]) {
          node.start = true;
        } else if (i === endCoord[0] && j === endCoord[1]) {
          node.end = true;
        }
        row.push(node);
      }
      grid.push(row);
    }
    this.grid = grid;
    this.startCoord = startCoord;
    this.endCoord = endCoord;
  }

  getNode(coord: Coord): Node {
    return this.grid[coord[0]][coord[1]];
  }

  visitNode(coord: Coord) {
    let oldNode = this.getNode(coord);

    const grid: Node[][] = [...this.grid];
    grid[coord[0]] = [...grid[coord[0]]];
    grid[coord[0]][coord[1]] = new Node(
      coord[0],
      coord[1],
      oldNode.id,
      true,
      oldNode.start,
      oldNode.end
    );

    this.grid = grid;
  }
}

export default Grid;
