document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];

    // Load stored expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpenseToTable(expense));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const expense = document.getElementById('expense').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const newExpense = { expense, description, category };
        expenses.push(newExpense);

        // Save to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Add to table
        addExpenseToTable(newExpense);

        form.reset();
    });

    function addExpenseToTable(expense) {
        const row = table.insertRow();

        row.insertCell(0).textContent = expense.expense;
        row.insertCell(1).textContent = expense.description;
        row.insertCell(2).textContent = expense.category;

        const actions = row.insertCell(3);

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(row, expense));
        actions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(row, expense));
        actions.appendChild(deleteButton);
    }

    function editExpense(row, expense) {
        const expenseIndex = expenses.indexOf(expense);

        document.getElementById('expense').value = expense.expense;
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;

        form.addEventListener('submit', function updateExpense(e) {
            e.preventDefault();

            expense.expense = document.getElementById('expense').value;
            expense.description = document.getElementById('description').value;
            expense.category = document.getElementById('category').value;

            // Update local storage
            localStorage.setItem('expenses', JSON.stringify(expenses));

            // Update table row
            row.cells[0].textContent = expense.expense;
            row.cells[1].textContent = expense.description;
            row.cells[2].textContent = expense.category;

            form.removeEventListener('submit', updateExpense);
            form.reset();
        }, { once: true });
    }

    function deleteExpense(row, expense) {
        const expenseIndex = expenses.indexOf(expense);
        expenses.splice(expenseIndex, 1);

        // Update local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Remove row from table
        row.remove();
    }
});
