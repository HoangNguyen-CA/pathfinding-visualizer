import Node from '../types/Node';
import Grid from '../types/Grid';

class BFS {
  gridObject: Grid;
  orderVisited: Node[];
  path: Node[];
  startNode: Node;
  endNode: Node;
  constructor(grid: Grid) {
    this.gridObject = grid;
    this.orderVisited = [];
    this.path = [];
    this.startNode = grid.getNode(grid.startCoord);
    this.endNode = grid.getNode(grid.endCoord);
  }

  run() {
    const queue: Node[] = [];
    const visited: boolean[] = [];
    queue.push(this.startNode);
    visited[this.startNode.id] = true;

    while (queue.length > 0) {
      const node: Node = queue.shift() as Node;
      this.orderVisited.push(node);
      if (node.id === this.endNode.id) {
        break;
      }

      const neighbors: Node[] = node.getNeighbors(this.gridObject.grid);

      for (const n of neighbors) {
        if (!visited[n.id]) {
          visited[n.id] = true;
          queue.push(n);
        }
      }
    }
  }
}

export default BFS;
