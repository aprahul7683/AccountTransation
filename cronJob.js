const cron = require('node-cron');
const createTransaction = require('./createTransactions');

cron.schedule('0 9 * * 1-5', () => {
    createTransaction();
});