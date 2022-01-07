import Node from '../types/Node';
import Grid from '../types/Grid';
import Algorithm from '../types/Algorithm';

class DFS implements Algorithm {
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
    const stack: Node[] = [];
    const visited: boolean[] = [];

    if (!this.gridObject.startNode || !this.gridObject.endNode) return;

    stack.push(this.gridObject.startNode);

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node) break;

      if (!visited[node.getId()]) {
        visited[node.getId()] = true;
        this.orderVisited.push(node);
      }

      if (node.getId() === this.gridObject.endNode.getId()) break;

      for (const n of node.getNeighbors(this.gridObject.grid)) {
        if (!visited[n.getId()] && !n.getIsWall()) {
          n.setParent(node);
          stack.push(n);
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

export default DFS;
