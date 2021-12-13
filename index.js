const accounts = require('./database/accounts.json');
const OperationsQueue = require('./src/operationsQueue');
const OperationsGenerator = require('./src/operationsGenerator');
const OperationsProcessor = require('./src/operationsProcessor');

const queue = new OperationsQueue();
const operationGenerator = new OperationsGenerator(queue, accounts);
const operationsProcessor = new OperationsProcessor(queue, accounts);

operationGenerator.start();
operationsProcessor.start();

