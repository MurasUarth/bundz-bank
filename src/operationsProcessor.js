const sleep = require('../utils/sleep');

class OperationsProcessor {
  constructor(queue, accounts) {
    this.queue = queue;
    this.accounts = accounts;
  }

  async start(interval=1000) {
  
    while(true) {
      const operations = this.queue.getBatch();
      this.processOperations(operations);
      await sleep(interval);
    }
  }

  processOperations(operations) {
    console.log(operations);
  }
}

module.exports = OperationsProcessor;