const { randomUUID } = require("crypto");

class OperationsGenerator {
  constructor(queue, accounts) {
    this.queue = queue;
    this.accounts = accounts;
    this.operations = [];
    this.types = [ 'DEPOSIT', 'WITHDRAW', 'TRANSFER', 'HISTORIC', 'CANCEL' ];
  }

  getRandomAccount() {
    const random = Math.ceil(Math.random() * 10);

    if(random !== 1) {
      const index = Math.ceil(Math.random() * this.accounts.length);
      return this.accounts[index];
    }

    const agency = Math.ceil(Math.random() * 10000);
    const account = Math.ceil(Math.random() * 100000);
    const agencyStr = agency.toString();
    const accountStr = account.toString();

    return {
      agency: agencyStr,
      account: accountStr,
    };
  }

  generateDeposit() {
    const { account, agency } = this.getRandomAccount();
    return {
      operationId: randomUUID(), 
      account,
      agency,
      quantity: Math.ceil(Math.random() * 10000),
      type: 'DEPOSIT'
    }
  }

  generateTransfer() {
    const from = this.getRandomAccount();
    const to = this.getRandomAccount();
    return {
      operationId: randomUUID(), 
      from,
      to,
      quantity: Math.ceil(Math.random() * 10000),
      type: 'TRANSFER'
    }
  }

  generateWithdraw() {
    const { account, agency } = this.getRandomAccount();
    return {
      operationId: randomUUID(), 
      account,
      agency,
      quantity: Math.ceil(Math.random() * 10000),
      type: 'WITHDRAW'
    }
  }

  generateHistoric() {
    const { account, agency } = this.getRandomAccount();
    return {
      operationId: randomUUID(), 
      account,
      agency,
      type: 'HISTORIC'
    }
  }

  getRandomOperation() {
    const index = Math.floor(Math.random() * this.operations.length);
    return this.operations[index];
  }

  generateCancel() {
    if(this.operations.length === 0) {
      return this.generate();
    }

    const operation = this.getRandomOperation();

    const data = {
      operationId: randomUUID(),
      operation,
      type: 'CANCEL',
      account: operation.account,
      agency: operation.agency
    }

    if(operation.type === 'TRANSFER') {
      data.agency = operation.from.agency;
      data.account = operation.from.account;
    }

    return data;
  }

  getRandomType() {
    const index = Math.floor(Math.random() * this.types.length);
    return this.types[index];
  }

  generate() {
    const type = this.getRandomType();
    let operation;

    if(type === 'TRANSFER') {
      operation = this.generateTransfer();
    }

    if(type === 'DEPOSIT') {
      operation = this.generateDeposit();
    }

    if(type === 'WITHDRAW') {
      operation = this.generateWithdraw();
    }

    if(type === 'HISTORIC') {
      operation = this.generateHistoric();
    }

    if(type === 'CANCEL') {
      operation = this.generateCancel();
    }

    this.operations.push(operation);
    return operation;
  }

  start(interval=500) {
    setInterval(() => this.queue.push(this.generate()), interval);
  }
}

module.exports = OperationsGenerator;