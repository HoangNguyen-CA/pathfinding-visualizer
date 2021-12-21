import Node from '../types/Node';
import Grid from '../types/Grid';

class BFS {
  gridObject: Grid;
  orderVisited: Node[];
  path: Node[];

  constructor(gridObject: Grid) {
    this.gridObject = gridObject;
    this.orderVisited = [];
    this.path = [];
  }

  run() {
    if (!this.gridObject.startNode || !this.gridObject.endNode) return;
    const queue: Node[] = [];
    const visited: boolean[] = [];
    queue.push(this.gridObject.startNode);
    visited[this.gridObject.startNode.id] = true;

    while (queue.length > 0) {
      const node = queue.shift();
      if (!node) {
        break;
      }
      this.orderVisited.push(node);
      if (node.id === this.gridObject.endNode.id) {
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
