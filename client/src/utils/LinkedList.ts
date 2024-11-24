export class Node {
  page: string;
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: string) {
    this.page = page;
  }
}

export class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;

  addPage(page: string) {
    const newNode = new Node(page);
    if (!this.head) {
      this.head = this.tail = newNode; // initialize with the first node
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  getHistory() {
    const history: string[] = [];
    let current = this.head;
    while (current) {
      history.push(current.page);
      current = current.next;
    }
    return history;
  }
}
