import Node from './Node';
import Coord from './Coord';
class Grid {
  grid: Node[][];
  startNode: Node;
  endNode: Node;
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
    this.startNode = new Node(0, 0, 0);
    this.endNode = new Node(0, 0, 0);
    this.setStartNode([0, 0]);
    this.setEndNode([0, 0]);
  }

  getNode(coord: Coord) {
    return this.grid[coord[0]][coord[1]];
  }

  resetKeepWalls() {
    this.callOnNodes((node) => {
      node.resetKeepWalls();
    });
  }

  reset() {
    this.callOnNodes((node) => node.reset());
  }

  private callOnNodes(fn: (node: Node) => void) {
    for (let row of this.grid) {
      for (let node of row) {
        fn(node);
      }
    }
  }

  setStartNode(coord: Coord) {
    if (this.startNode) this.startNode.setIsStart(false);
    this.startNode = this.getNode(coord);
    this.startNode.setIsStart(true);
  }

  setEndNode(coord: Coord) {
    if (this.endNode) this.endNode.setIsEnd(false);
    this.endNode = this.getNode(coord);
    this.endNode.setIsEnd(true);
  }
}

export default Grid;
