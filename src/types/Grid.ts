import Node from './Node';
import Coord from './Coord';
class Grid {
  grid: Node[][];
  startNode: Node | null = null;
  endNode: Node | null = null;
  DEFAULT_START_COORD: Coord;
  DEFAULT_END_CORD: Coord;

  constructor(rows: number, cols: number) {
    const grid: Node[][] = [];
    for (let i = 0; i < rows; i++) {
      const gridRow: Node[] = [];
      for (let j = 0; j < cols; j++) {
        const node = new Node(i, j, cols * i + j);
        gridRow.push(node);
      }
      grid.push(gridRow);
    }
    this.grid = grid;
    this.DEFAULT_START_COORD = [0, 0];
    this.DEFAULT_END_CORD = [grid.length - 1, grid[0].length - 1];
    this.setStartNode(this.DEFAULT_START_COORD);
    this.setEndNode(this.DEFAULT_END_CORD);
  }

  getNode(coord: Coord): Node {
    return this.grid[coord[0]][coord[1]];
  }

  reset() {
    for (let row of this.grid) {
      for (let node of row) {
        node.setNotPath();
        node.setNotVisited();
        node.parent = null;
      }
    }
  }

  setStartNode(coord: Coord) {
    if (this.startNode) this.startNode.setNotStart();
    this.startNode = this.getNode(coord);
    this.startNode.setStart();
  }

  setEndNode(coord: Coord) {
    if (this.endNode) this.endNode.setNotEnd();
    this.endNode = this.getNode(coord);
    this.endNode.setEnd();
  }
}

export default Grid;
