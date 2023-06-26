// Transaction data
let transactions = [];

// Elements
const balanceAmount = document.getElementById('balance-amount');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsList = document.getElementById('transactions');

// Add transaction
function addTransaction() {
    const description = descriptionInput.value;
   
    const amount = +amountInput.value;
    const type = typeSelect.value;

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        id: generateID(),
        description,
        amount,
        type
    };

    transactions.push(transaction);

    updateBalance();
    updateTransactionsList();

    descriptionInput.value = '';
    amountInput.value = '';
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateBalance();
    updateTransactionsList();
}

// Generate unique ID
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

// Update balance
function updateBalance() {
    const total = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + transaction.amount;
        } else {
            return acc - transaction.amount;
        }
    }, 0);

    balanceAmount.textContent = total.toFixed(2);
}

// Update transaction list
function updateTransactionsList() {
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;

        transactionsList.appendChild(listItem);
    });
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addTransaction);
