class Node {
  id: number;
  constructor(row: number, col: number) {
    this.id = row * col + col;
  }
}

export default Node;
