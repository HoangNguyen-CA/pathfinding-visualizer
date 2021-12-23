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
    this.gridObject.reset();
    this.orderVisited = [];
    this.path = [];
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
        if (!visited[n.id] && !n.isWall) {
          n.parent = node;
          visited[n.id] = true;
          queue.push(n);
        }
      }
    }

    this.calculatePath(this.gridObject.endNode);
  }

  private calculatePath(endNode: Node) {
    let node: Node | null = endNode;
    while (node !== null) {
      this.path.unshift(node);
      node = node.parent;
    }
  }
}

export default BFS;
