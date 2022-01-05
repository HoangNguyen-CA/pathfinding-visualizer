import Node from '../types/Node';
import Grid from '../types/Grid';
import Algorithm from '../types/Algorithm';

class BFS implements Algorithm {
  gridObject: Grid;
  orderVisited: Node[];
  path: Node[];

  constructor(gridObject: Grid) {
    this.gridObject = gridObject;
    this.orderVisited = [];
    this.path = [];
  }

  run() {
    this.orderVisited = [];
    this.path = [];
    if (!this.gridObject.startNode || !this.gridObject.endNode) return;
    const queue: Node[] = [];
    const visited: boolean[] = [];
    queue.push(this.gridObject.startNode);
    visited[this.gridObject.startNode.getId()] = true;

    while (queue.length > 0) {
      const node = queue.shift();
      if (!node) {
        break;
      }
      this.orderVisited.push(node);
      if (node.getId() === this.gridObject.endNode.getId()) {
        break;
      }
      const neighbors: Node[] = node.getNeighbors(this.gridObject.grid);

      for (const n of neighbors) {
        if (!visited[n.getId()] && !n.getIsWall()) {
          n.setParent(node);
          visited[n.getId()] = true;
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
      node = node.getParent();
    }
  }
}

export default BFS;
