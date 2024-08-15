let budget = 0;
let expenses = [];

function addbudget() {
  const budgetInput = document.getElementById("budget");
  budget = parseFloat(budgetInput.value) || 0;

  if (budget > 0) {
    document.getElementById("initialbudget").textContent = budget;
    updateRemainingBudget();
  } else {
    alert("Please enter a valid budget.");
  }
}

function addExpense() {
  const expenseNameInput = document.getElementById("expensename");
  const expenseAmountInput = document.getElementById("expenseamount");
  const expenseDateInput = document.getElementById("expensedate");

  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseDate = expenseDateInput.value;

  if (
    expenseName !== "" &&
    !isNaN(expenseAmount) &&
    expenseAmount > 0 &&
    expenseDate !== ""
  ) {
    const remainingBudget =
      budget - expenses.reduce((total, expense) => total + expense.amount, 0);

    if (remainingBudget >= expenseAmount) {
      const expense = {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
      };
      expenses.push(expense);
      updateExpensesList();
      updateRemainingBudget();
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
      expenseDateInput.value = "";
    } else {
      alert("Expense exceeds remaining budget!");
    }
  } else {
    alert("Invalid input! Please enter valid expense name, amount, and date.");
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpensesList();
  updateRemainingBudget();
}

function updateExpensesList() {
  const expensesList = document.getElementById("expensesitem");
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense");
    expenseItem.innerHTML = `
    <div class='expense-list flex'> 
    <div> ${expense.name}: </div>
    <div> $${expense.amount.toFixed(2)}  </div>
    <div> ${expense.date} </div>
    <button onclick="deleteExpense(${index})">Delete</button>
                </div> `;
    expensesList.appendChild(expenseItem);
  });
}

function updateRemainingBudget() {
  const remainingBudgetDisplay = document.getElementById("remainingbudget");
  remainingBudgetDisplay.textContent = (
    budget - expenses.reduce((total, expense) => total + expense.amount, 0)
  ).toFixed(2);

  if (
    budget - expenses.reduce((total, expense) => total + expense.amount, 0) <
    0
  ) {
    remainingBudgetDisplay.classList.add("exceeded");
  } else {
    remainingBudgetDisplay.classList.remove("exceeded");
  }
}