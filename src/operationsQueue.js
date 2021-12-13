class OperationsQueue {
  constructor() {
    this.data = [];
  }

  push(...data) {
    this.data.push(...data);
  }

  pop() {
    return this.data.shift();
  }

  getBatch(size=10) {
    const batch = [];

    for(let i = 0; i < size; i++) {
      const data = this.pop();
      
      if(data) {
        batch.push(data);
      }
    }

    return batch;
  }
}

module.exports = OperationsQueue;