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

  getAccount(operations) {
    for(let i = 0; i < this.accounts.length; i++) {
      if(operations.account == this.accounts[i].account && operations.agency == this.accounts[i].agency) {
        return i;
      }
    }
    return -1;
  }

  deposit(account, quantity) {
    if(account == -1) {
      console.log('Invalid account.')
      return;
    }
    console.log(this.accounts[account]);
    this.accounts[account].balance += quantity;
    console.log(this.accounts[account]);
  }

  withdraw(account, quantity) {
    if(account == -1) {
      console.log("Invalid account.");
    }
    if(this.accounts[account].balance - quantity >= 0) {
      console.log(this.accounts[account]);
      this.accounts[account].balance -= quantity;
      console.log(this.accounts[account]);
    }
    console.log('Not enought balance.');
    return;
  }

  transfer(from, to, quantity) {
    if(to == -1) {
      console.log("This account doesn't exist.")
      return;
    }

    if(from == -1) {
      console.log("This account doesn't exist.");
      return;
    }

    if(this.accounts[from].balance - quantity >= 0) {
      console.log(`${quantity}`);
      console.log('From: ')
      console.log(this.accounts[from]);
      console.log('To: ')
      console.log(this.accounts[to]);
      this.accounts[from].balance -= quantity;
      this.accounts[to].balance += quantity;
      console.log('Accounts after transfer: ');
      console.log(this.accounts[from]);
      console.log(this.accounts[to]);
    } 

    console.log('Not enought balance.');
    return;
  }
    
  processOperations(operations) {
    for(const operation of operations) {
      if(operation.type == 'DEPOSIT') {
        console.log(operation.type);
        const account = this.getAccount(operation);
        this.deposit(account, operation.quantity);
      }

      if(operation.type == 'WITHDRAW') {
        console.log(operation.type);
        const account = this.getAccount(operation);
        this.withdraw(account, operation.quantity)
      }

      if(operation.type == 'TRANSFER') {
        console.log(operation.type);
        const from = this.getAccount(operation.from);
        const to = this.getAccount(operation.to);
        this.transfer(from, to, operation.quantity)
      }
    }
  }
}

module.exports = OperationsProcessor;