import Node from '../types/Node';
interface Algorithm {
  orderVisited: Node[];
  path: Node[];
  run: () => void;
}

export default Algorithm;
