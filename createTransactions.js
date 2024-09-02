const Transaction = require('./model/transaction');
const connectDB = require('./database');

const accounts = [
    { Account: 'Test_232323344444444444441' },
    { Account: 'Test_232323344444444444442' },
    { Account: 'Test_232323344444444444443' },
    { Account: 'Test_232323344444444444444' },
    { Account: 'Test_232323344444444444445' },
    { Account: 'Test_232323344444444444446' },
    { Account: 'Test_232323344444444444447' },
    { Account: 'Test_232323344444444444448' },
    { Account: 'Test_232323344444444444449' },
    { Account: 'Test_232323344444444444410' },
    { Account: 'Test_232323344444444444411' },
    { Account: 'Test_232323344444444444412' },
    { Account: 'Test_232323344444444444413' }
];

const createTransactions = async () => {
    await connectDB();

    try {
        const baseTransactions = Math.floor(180 / accounts.length);
        const remainder = 180 % accounts.length;

        let transactionsToCreate = [];
        let currentTime = new Date();

        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i].Account;
            const transactionCount = i < remainder ? baseTransactions + 1 : baseTransactions;

            for (let j = 0; j < transactionCount; j++) {
                const transaction = new Transaction({
                    account: account,
                    transactionDate: new Date(currentTime), 
                    amount: Math.floor(Math.random() * 1000),
                    description: `Payment ${j + 1} for account ${account}`
                });

                transactionsToCreate.push(transaction);
            }
        }

        await Transaction.insertMany(transactionsToCreate);
        console.log('Transactions created successfully!');
    } catch (error) {
        console.error('Error creating transactions:', error);
    } finally {
        mongoose.connection.close();
    }
};

module.exports = createTransactions;