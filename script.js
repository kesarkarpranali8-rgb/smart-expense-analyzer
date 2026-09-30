/* =========================================================
   SMART EXPENSE ANALYZER
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const expenseForm =
    document.querySelector("#expense-form");

const expenseNameInput =
    document.querySelector("#expense-name");

const expenseAmountInput =
    document.querySelector("#expense-amount");

const expenseCategoryInput =
    document.querySelector("#expense-category");

const paymentMethodInput =
    document.querySelector("#payment-method");

const saveExpenseButton =
    document.querySelector("#save-expense");

const transactionList =
    document.querySelector("#transaction-list");

const emptyTransactions =
    document.querySelector("#empty-transactions");

const totalExpensesElement =
    document.querySelector("#total-expenses");

const totalIncomeElement =
    document.querySelector("#total-income");

const totalBalanceElement =
    document.querySelector("#total-balance");

const balancePercentageElement =
    document.querySelector("#balance-percentage");

const balanceStatusElement =
    document.querySelector("#balance-status");

const budgetAmountInput =
    document.querySelector("#budget-amount");

const saveBudgetButton =
    document.querySelector("#save-budget");

const monthlyBudgetElement =
    document.querySelector("#monthly-budget");

const incomeForm =
    document.querySelector("#income-form");

const incomeAmountInput =
    document.querySelector("#income-amount");

const saveIncomeButton =
    document.querySelector("#save-income");

const setIncomeButton =
    document.querySelector("#set-income-btn");

const searchExpenseInput =
    document.querySelector("#search-expense");

const thisMonthSpendingElement =
    document.querySelector("#this-month-spending");

const averageMonthlySpendingElement =
    document.querySelector("#average-monthly-spending");

const highestSpendingMonthElement =
    document.querySelector("#highest-spending-month");

const insightsContainer =
    document.querySelector("#insights-container");

const currencySelect =
    document.querySelector("#currency-select");

const themeToggle =
    document.querySelector("#theme-toggle");

const clearDataButton =
    document.querySelector("#clear-data-btn");

const monthlyChartCanvases =
    document.querySelectorAll("#monthlyChart");

const categoryChartCanvas =
    document.querySelector("#categoryChart");


/* =========================================================
   2. PROFILE ELEMENTS
========================================================= */

const profileButton =
    document.querySelector("#profile-button");

const profilePopup =
    document.querySelector("#profile-popup");

const profileClose =
    document.querySelector("#profile-close");

const profileNameDisplay =
    document.querySelector("#profile-name-display");

const profileDisplayName =
    document.querySelector("#profile-display-name");

const profileDisplayEmail =
    document.querySelector("#profile-display-email");

const profileDisplayIncome =
    document.querySelector("#profile-display-income");

const profileDisplayAvatar =
    document.querySelector("#profile-display-avatar");

const topProfileAvatar =
    document.querySelector("#top-profile-avatar");

const topProfileName =
    document.querySelector("#top-profile-name");

const sidebarAvatar =
    document.querySelector("#sidebar-avatar");

const sidebarProfileName =
    document.querySelector("#sidebar-profile-name");

const editProfileButton =
    document.querySelector("#edit-profile-btn");

const profilePanel =
    document.querySelector("#profile-panel");

const closeProfileButton =
    document.querySelector("#close-profile");

const cancelProfileButton =
    document.querySelector("#cancel-profile");

const saveProfileButton =
    document.querySelector("#save-profile");

const editProfileName =
    document.querySelector("#edit-profile-name");

const editProfileEmail =
    document.querySelector("#edit-profile-email");

const editProfileIncome =
    document.querySelector("#edit-profile-income");


/* =========================================================
   3. DATA
========================================================= */

let expenses = [];

let totalIncome = 0;

let monthlyBudget = 0;

let selectedCurrency =
    localStorage.getItem("currency") || "₹";

let monthlyChart = null;

let categoryChart = null;


/* =========================================================
   4. PROFILE DATA
========================================================= */

let savedProfileName =
    localStorage.getItem("profileName") || "";

let savedProfileEmail =
    localStorage.getItem("profileEmail") || "";


/* =========================================================
   5. REMOVE OLD DEFAULT VALUES ONCE
========================================================= */

/*
   Your older version used:

   Income = 10000
   Budget = 5000

   This small migration removes those old defaults once,
   but it will NOT keep deleting values after that.
*/

if (
    !localStorage.getItem("defaultValuesCleaned")
) {

    if (
        localStorage.getItem("totalIncome") === "10000"
    ) {

        localStorage.removeItem("totalIncome");

    }

    if (
        localStorage.getItem("monthlyBudget") === "5000"
    ) {

        localStorage.removeItem("monthlyBudget");

    }

    localStorage.setItem(
        "defaultValuesCleaned",
        "true"
    );

}


const storedIncome =
    localStorage.getItem("totalIncome");

const storedBudget =
    localStorage.getItem("monthlyBudget");


if (storedIncome !== null) {

    totalIncome =
        Number(storedIncome) || 0;

}


if (storedBudget !== null) {

    monthlyBudget =
        Number(storedBudget) || 0;

}


/* =========================================================
   6. MONEY FORMAT
========================================================= */

function formatMoney(amount) {

    const value =
        Number(amount) || 0;

    return (
        selectedCurrency +
        value.toLocaleString("en-IN")
    );

}


/* =========================================================
   7. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   8. SAVE EXPENSES
========================================================= */

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}


/* =========================================================
   9. LOAD EXPENSES
========================================================= */

function loadExpenses() {

    const stored =
        localStorage.getItem("expenses");

    if (!stored) {

        expenses = [];

        return;

    }

    try {

        expenses =
            JSON.parse(stored);

        if (!Array.isArray(expenses)) {

            expenses = [];

        }

    } catch (error) {

        expenses = [];

    }


    expenses =
        expenses.map(function(expense) {

            const date =
                expense.date ||
                new Date().toLocaleDateString(
                    "en-IN"
                );

            const now =
                new Date();

            return {

                id:
                    expense.id ||
                    Date.now() +
                    Math.random(),

                name:
                    expense.name || "Expense",

                amount:
                    Number(expense.amount) || 0,

                category:
                    expense.category || "Other",

                payment:
                    expense.payment || "UPI",

                date:
                    date,

                month:
                    Number.isFinite(
                        Number(expense.month)
                    )
                        ? Number(expense.month)
                        : now.getMonth(),

                year:
                    Number.isFinite(
                        Number(expense.year)
                    )
                        ? Number(expense.year)
                        : now.getFullYear()

            };

        });


    saveExpenses();

}


/* =========================================================
   10. ADD EXPENSE
========================================================= */

function addExpense() {

    const name =
        expenseNameInput.value.trim();

    const amount =
        Number(
            expenseAmountInput.value
        );

    const category =
        expenseCategoryInput.value;

    const payment =
        paymentMethodInput.value;


    if (!name) {

        return;

    }


    if (!amount || amount <= 0) {

        return;

    }


    const now =
        new Date();


    const expense = {

        id:
            Date.now() +
            Math.random(),

        name:
            name,

        amount:
            amount,

        category:
            category,

        payment:
            payment,

        date:
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ),

        month:
            now.getMonth(),

        year:
            now.getFullYear()

    };


    expenses.unshift(expense);


    saveExpenses();


    expenseNameInput.value = "";

    expenseAmountInput.value = "";

    expenseCategoryInput.value =
        "Food";

    paymentMethodInput.value =
        "UPI";


    updateDashboard();

}


/* =========================================================
   11. RENDER TRANSACTIONS
========================================================= */

function renderTransactions(
    list = expenses
) {

    if (!transactionList) {

        return;

    }


    transactionList.innerHTML = "";


    if (!list.length) {

        if (emptyTransactions) {

            emptyTransactions.style.display =
                "block";

        }

        return;

    }


    if (emptyTransactions) {

        emptyTransactions.style.display =
            "none";

    }


    list.forEach(function(expense) {

        const row =
            document.createElement("tr");


        row.dataset.id =
            expense.id;


        row.innerHTML = `

            <td>
                ${escapeHTML(expense.date)}
            </td>

            <td class="expense-name-cell">
                ${escapeHTML(expense.name)}
            </td>

            <td>
                ${escapeHTML(expense.category)}
            </td>

            <td>
                ${escapeHTML(expense.payment)}
            </td>

            <td class="amount-cell">
                - ${formatMoney(expense.amount)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        type="button"
                        class="edit-button edit-expense"
                        data-id="${expense.id}"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-button delete-expense"
                        data-id="${expense.id}"
                    >
                        Delete
                    </button>

                </div>

            </td>
        `;


        transactionList.appendChild(row);

    });

}


/* =========================================================
   12. DASHBOARD
========================================================= */

function updateDashboard() {

    const totalExpenses =
        expenses.reduce(
            function(total, expense) {

                return (
                    total +
                    Number(expense.amount || 0)
                );

            },
            0
        );


    const balance =
        totalIncome -
        totalExpenses;


    if (totalIncomeElement) {

        totalIncomeElement.textContent =
            formatMoney(totalIncome);

    }


    if (totalExpensesElement) {

        totalExpensesElement.textContent =
            formatMoney(totalExpenses);

    }


    if (monthlyBudgetElement) {

        monthlyBudgetElement.textContent =
            formatMoney(monthlyBudget);

    }


    if (totalBalanceElement) {

        totalBalanceElement.textContent =
            formatMoney(balance);

    }


    let percentage = 0;


    if (totalIncome > 0) {

        percentage =
            Math.round(
                (balance / totalIncome) * 100
            );

    }


    if (balancePercentageElement) {

        balancePercentageElement.textContent =
            percentage + "%";

    }


    if (balanceStatusElement) {

        if (
            totalIncome === 0 &&
            totalExpenses === 0
        ) {

            balanceStatusElement.textContent =
                "Start tracking";

        } else if (balance < 0) {

            balanceStatusElement.textContent =
                "Over income";

        } else if (
            monthlyBudget > 0 &&
            totalExpenses > monthlyBudget
        ) {

            balanceStatusElement.textContent =
                "Over budget";

        } else {

            balanceStatusElement.textContent =
                "Smart spending";

        }

    }


    renderTransactions();

    updateAnalytics();

    updateMonthlyChart();

    updateCategoryChart();

    updateInsights();

}


/* =========================================================
   13. BUDGET
========================================================= */

function saveBudget() {

    const amount =
        Number(
            budgetAmountInput.value
        );


    if (!amount || amount <= 0) {

        return;

    }


    monthlyBudget =
        amount;


    localStorage.setItem(
        "monthlyBudget",
        String(monthlyBudget)
    );


    budgetAmountInput.value = "";


    updateDashboard();

}


/* =========================================================
   14. INCOME
========================================================= */

function saveIncome() {

    const amount =
        Number(
            incomeAmountInput.value
        );


    if (!amount || amount <= 0) {

        return;

    }


    totalIncome =
        amount;


    localStorage.setItem(
        "totalIncome",
        String(totalIncome)
    );


    incomeAmountInput.value = "";


    incomeForm.style.display =
        "none";


    updateDashboard();

}


/* =========================================================
   15. INLINE EDIT EXPENSE
========================================================= */

function editExpense(id) {

    const expense =
        expenses.find(function(item) {

            return String(item.id) ===
                String(id);

        });


    if (!expense) {

        return;

    }


    const row =
        document.querySelector(
            `tr[data-id="${id}"]`
        );


    if (!row) {

        return;

    }


    row.innerHTML = `

        <td>
            ${escapeHTML(expense.date)}
        </td>

        <td>
            <input
                class="inline-edit edit-name"
                value="${escapeHTML(expense.name)}"
            >
        </td>

        <td>
            <select class="inline-edit edit-category">

                <option
                    value="Food"
                    ${expense.category === "Food" ? "selected" : ""}
                >
                    Food
                </option>

                <option
                    value="Travel"
                    ${expense.category === "Travel" ? "selected" : ""}
                >
                    Travel
                </option>

                <option
                    value="Education"
                    ${expense.category === "Education" ? "selected" : ""}
                >
                    Education
                </option>

                <option
                    value="Shopping"
                    ${expense.category === "Shopping" ? "selected" : ""}
                >
                    Shopping
                </option>

                <option
                    value="Other"
                    ${expense.category === "Other" ? "selected" : ""}
                >
                    Other
                </option>

            </select>
        </td>

        <td>
            <select class="inline-edit edit-payment">

                <option
                    value="UPI"
                    ${expense.payment === "UPI" ? "selected" : ""}
                >
                    UPI
                </option>

                <option
                    value="Cash"
                    ${expense.payment === "Cash" ? "selected" : ""}
                >
                    Cash
                </option>

                <option
                    value="Card"
                    ${expense.payment === "Card" ? "selected" : ""}
                >
                    Card
                </option>

                <option
                    value="Bank"
                    ${expense.payment === "Bank" ? "selected" : ""}
                >
                    Bank Transfer
                </option>

            </select>
        </td>

        <td>
            <input
                class="inline-edit edit-amount"
                type="number"
                min="1"
                value="${expense.amount}"
            >
        </td>

        <td>

            <div class="action-buttons">

                <button
                    type="button"
                    class="save-edit-button save-inline-edit"
                    data-id="${id}"
                >
                    Save
                </button>

                <button
                    type="button"
                    class="cancel-edit-button cancel-inline-edit"
                    data-id="${id}"
                >
                    Cancel
                </button>

            </div>

        </td>
    `;

}


/* =========================================================
   16. SAVE INLINE EDIT
========================================================= */

function saveInlineEdit(id) {

    const expense =
        expenses.find(function(item) {

            return String(item.id) ===
                String(id);

        });


    if (!expense) {

        return;

    }


    const row =
        document.querySelector(
            `tr[data-id="${id}"]`
        );


    if (!row) {

        return;

    }


    const name =
        row.querySelector(".edit-name").value.trim();

    const amount =
        Number(
            row.querySelector(".edit-amount").value
        );

    const category =
        row.querySelector(".edit-category").value;

    const payment =
        row.querySelector(".edit-payment").value;


    if (!name || !amount || amount <= 0) {

        return;

    }


    expense.name =
        name;

    expense.amount =
        amount;

    expense.category =
        category;

    expense.payment =
        payment;


    saveExpenses();

    updateDashboard();

}


/* =========================================================
   17. DELETE EXPENSE
========================================================= */

function deleteExpense(id) {

    expenses =
        expenses.filter(function(expense) {

            return String(expense.id) !==
                String(id);

        });


    saveExpenses();

    updateDashboard();

}


/* =========================================================
   18. TRANSACTION BUTTONS
========================================================= */

if (transactionList) {

    transactionList.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest("button");


            if (!button) {

                return;

            }


            const id =
                button.dataset.id;


            if (
                button.classList.contains(
                    "edit-expense"
                )
            ) {

                editExpense(id);

                return;

            }


            if (
                button.classList.contains(
                    "delete-expense"
                )
            ) {

                deleteExpense(id);

                return;

            }


            if (
                button.classList.contains(
                    "save-inline-edit"
                )
            ) {

                saveInlineEdit(id);

                return;

            }


            if (
                button.classList.contains(
                    "cancel-inline-edit"
                )
            ) {

                renderTransactions();

                return;

            }

        }
    );

}


/* =========================================================
   19. SEARCH
========================================================= */

if (searchExpenseInput) {

    searchExpenseInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchExpenseInput.value
                    .toLowerCase()
                    .trim();


            const filtered =
                expenses.filter(function(expense) {

                    return (

                        expense.name
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        expense.category
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        expense.payment
                            .toLowerCase()
                            .includes(searchText)

                    );

                });


            renderTransactions(filtered);

        }
    );

}


/* =========================================================
   20. ANALYTICS
========================================================= */

function updateAnalytics() {

    const now =
        new Date();


    const currentMonth =
        now.getMonth();

    const currentYear =
        now.getFullYear();


    let thisMonthTotal = 0;


    expenses.forEach(function(expense) {

        if (
            Number(expense.month) ===
                currentMonth
            &&
            Number(expense.year) ===
                currentYear
        ) {

            thisMonthTotal +=
                Number(expense.amount || 0);

        }

    });


    if (thisMonthSpendingElement) {

        thisMonthSpendingElement.textContent =
            formatMoney(thisMonthTotal);

    }


    const monthTotals =
        {};


    expenses.forEach(function(expense) {

        const month =
            Number(expense.month);

        const year =
            Number(expense.year);

        const key =
            `${year}-${month}`;


        if (!monthTotals[key]) {

            monthTotals[key] = 0;

        }


        monthTotals[key] +=
            Number(expense.amount || 0);

    });


    const values =
        Object.values(monthTotals);


    let average = 0;


    if (values.length) {

        average =
            values.reduce(
                function(a, b) {

                    return a + b;

                },
                0
            ) / values.length;

    }


    if (averageMonthlySpendingElement) {

        averageMonthlySpendingElement.textContent =
            formatMoney(
                Math.round(average)
            );

    }


    if (
        highestSpendingMonthElement
    ) {

        if (!values.length) {

            highestSpendingMonthElement.textContent =
                "No data";

        } else {

            let highestKey = null;

            let highestValue = -1;


            Object.keys(monthTotals)
                .forEach(function(key) {

                    if (
                        monthTotals[key] >
                        highestValue
                    ) {

                        highestValue =
                            monthTotals[key];

                        highestKey =
                            key;

                    }

                });


            const parts =
                highestKey.split("-");

            const year =
                Number(parts[0]);

            const month =
                Number(parts[1]);


            const monthName =
                new Date(
                    year,
                    month,
                    1
                ).toLocaleString(
                    "en-IN",
                    {
                        month: "long"
                    }
                );


            highestSpendingMonthElement.textContent =
                `${monthName} ${year}`;

        }

    }

}


/* =========================================================
   21. MONTHLY CHART
========================================================= */

function updateMonthlyChart() {

    if (
        typeof Chart === "undefined"
    ) {

        return;

    }


    const now =
        new Date();


    const currentYear =
        now.getFullYear();


    const monthlyTotals =
        new Array(12).fill(0);


    expenses.forEach(function(expense) {

        const month =
            Number(expense.month);

        const year =
            Number(expense.year);


        if (
            year === currentYear &&
            month >= 0 &&
            month <= 11
        ) {

            monthlyTotals[month] +=
                Number(expense.amount || 0);

        }

    });


    const labels = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"

    ];


    /*
       The HTML contains two canvases with the same ID
       because one is used in Dashboard and one in Analytics.

       Chart.js needs separate chart instances.
    */

    monthlyChartCanvases.forEach(
        function(canvas, index) {

            const existingChart =
                Chart.getChart(canvas);


            if (existingChart) {

                existingChart.destroy();

            }


            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: labels,

                        datasets: [

                            {

                                label:
                                    "Monthly Spending",

                                data:
                                    monthlyTotals,

                                borderWidth: 3,

                                tension: 0.35,

                                fill: true

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        plugins: {

                            legend: {

                                display: false

                            }

                        },

                        scales: {

                            y: {

                                beginAtZero: true

                            }

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
   22. CATEGORY CHART
========================================================= */

function updateCategoryChart() {

    if (
        !categoryChartCanvas ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    const categories = {

        Food: 0,

        Travel: 0,

        Education: 0,

        Shopping: 0,

        Other: 0

    };


    expenses.forEach(function(expense) {

        if (
            categories[
                expense.category
            ] !== undefined
        ) {

            categories[
                expense.category
            ] +=
                Number(expense.amount || 0);

        }

    });


    const existingChart =
        Chart.getChart(
            categoryChartCanvas
        );


    if (existingChart) {

        existingChart.destroy();

    }


    new Chart(
        categoryChartCanvas,
        {

            type: "doughnut",

            data: {

                labels:
                    Object.keys(categories),

                datasets: [

                    {

                        data:
                            Object.values(
                                categories
                            ),

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }
    );

}


/* =========================================================
   23. SMART INSIGHTS
========================================================= */

function updateInsights() {

    if (!insightsContainer) {

        return;

    }


    insightsContainer.innerHTML = "";


    if (!expenses.length) {

        insightsContainer.innerHTML = `

            <div class="insight-card">

                <div class="insight-icon">
                    ✦
                </div>

                <h3>
                    Start tracking
                </h3>

                <p>
                    Add a few expenses and Smart Expense Analyzer
                    will generate useful spending insights.
                </p>

            </div>

        `;

        return;

    }


    const totalExpenses =
        expenses.reduce(
            function(total, expense) {

                return (
                    total +
                    Number(expense.amount || 0)
                );

            },
            0
        );


    const categoryTotals = {};


    expenses.forEach(function(expense) {

        if (
            !categoryTotals[
                expense.category
            ]
        ) {

            categoryTotals[
                expense.category
            ] = 0;

        }


        categoryTotals[
            expense.category
        ] +=
            Number(expense.amount || 0);

    });


    let topCategory =
        "Other";

    let topCategoryAmount =
        0;


    Object.keys(categoryTotals)
        .forEach(function(category) {

            if (
                categoryTotals[category] >
                topCategoryAmount
            ) {

                topCategory =
                    category;

                topCategoryAmount =
                    categoryTotals[category];

            }

        });


    const budgetMessage =
        monthlyBudget > 0
            ? (
                totalExpenses >
                monthlyBudget
                    ? "Your spending is above your monthly budget."
                    : "Your spending is currently within your monthly budget."
            )
            : "Set a monthly budget to receive budget insights.";


    const averageExpense =
        totalExpenses /
        expenses.length;


    const insights = [

        {

            icon: "◔",

            title:
                "Top spending category",

            text:
                `${topCategory} is currently your highest spending category with ${formatMoney(topCategoryAmount)} spent.`

        },

        {

            icon: "₹",

            title:
                "Average transaction",

            text:
                `Your average expense is ${formatMoney(Math.round(averageExpense))}.`

        },

        {

            icon: "◫",

            title:
                "Budget status",

            text:
                budgetMessage

        },

        {

            icon: "✦",

            title:
                "Total tracked spending",

            text:
                `You have recorded ${formatMoney(totalExpenses)} across ${expenses.length} transaction${expenses.length === 1 ? "" : "s"}.`

        }

    ];


    insights.forEach(function(insight) {

        const card =
            document.createElement("div");

        card.className =
            "insight-card";


        card.innerHTML = `

            <div class="insight-icon">
                ${insight.icon}
            </div>

            <h3>
                ${escapeHTML(insight.title)}
            </h3>

            <p>
                ${escapeHTML(insight.text)}
            </p>

        `;


        insightsContainer.appendChild(card);

    });

}


/* =========================================================
   24. EXPENSE BUTTON
========================================================= */

if (saveExpenseButton) {

    saveExpenseButton.addEventListener(
        "click",
        addExpense
    );

}


/* =========================================================
   25. BUDGET BUTTON
========================================================= */

if (saveBudgetButton) {

    saveBudgetButton.addEventListener(
        "click",
        saveBudget
    );

}


/* =========================================================
   26. INCOME BUTTON
========================================================= */

if (saveIncomeButton) {

    saveIncomeButton.addEventListener(
        "click",
        saveIncome
    );

}


/* =========================================================
   27. SHOW INCOME FORM
========================================================= */

if (setIncomeButton) {

    setIncomeButton.addEventListener(
        "click",
        function() {

            if (!incomeForm) {

                return;

            }


            incomeForm.style.display =
                incomeForm.style.display === "none"
                    ? "block"
                    : "none";


            if (
                incomeForm.style.display ===
                "block"
            ) {

                incomeAmountInput.focus();

            }

        }
    );

}


/* =========================================================
   28. CURRENCY
========================================================= */

if (currencySelect) {

    currencySelect.value =
        selectedCurrency;


    currencySelect.addEventListener(
        "change",
        function() {

            selectedCurrency =
                currencySelect.value;


            localStorage.setItem(
                "currency",
                selectedCurrency
            );


            updateDashboard();

            updateProfileDisplay();

        }
    );

}


/* =========================================================
   29. DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    if (themeToggle) {

        themeToggle.checked =
            true;

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "change",
        function() {

            if (
                themeToggle.checked
            ) {

                document.body.classList.add(
                    "dark-mode"
                );

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            } else {

                document.body.classList.remove(
                    "dark-mode"
                );

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


/* =========================================================
   30. CLEAR DATA
========================================================= */

if (clearDataButton) {

    clearDataButton.addEventListener(
        "click",
        function() {

            /*
               No popup/confirm.
               The button immediately clears the data.
            */

            expenses = [];

            totalIncome = 0;

            monthlyBudget = 0;

            localStorage.removeItem(
                "expenses"
            );

            localStorage.removeItem(
                "totalIncome"
            );

            localStorage.removeItem(
                "monthlyBudget"
            );

            localStorage.removeItem(
                "profileName"
            );

            localStorage.removeItem(
                "profileEmail"
            );

            savedProfileName = "";

            savedProfileEmail = "";

            updateDashboard();

            updateProfileDisplay();

        }
    );

}


/* =========================================================
   31. PROFILE DISPLAY
========================================================= */

function getProfileInitial() {

    const name =
        savedProfileName.trim();


    if (!name) {

        return "P";

    }


    return name
        .charAt(0)
        .toUpperCase();

}


function updateProfileDisplay() {

    const displayName =
        savedProfileName.trim() ||
        "Your Name";


    const displayEmail =
        savedProfileEmail.trim() ||
        "No email added";


    const initial =
        getProfileInitial();


    if (profileNameDisplay) {

        profileNameDisplay.textContent =
            displayName;

    }


    if (profileDisplayName) {

        profileDisplayName.textContent =
            displayName;

    }


    if (profileDisplayEmail) {

        profileDisplayEmail.textContent =
            displayEmail;

    }


    if (profileDisplayIncome) {

        profileDisplayIncome.textContent =
            formatMoney(totalIncome);

    }


    if (topProfileName) {

        topProfileName.textContent =
            displayName;

    }


    if (topProfileAvatar) {

        topProfileAvatar.textContent =
            initial;

    }


    if (sidebarAvatar) {

        sidebarAvatar.textContent =
            initial;

    }


    if (sidebarProfileName) {

        sidebarProfileName.textContent =
            displayName;

    }


    if (profileDisplayAvatar) {

        profileDisplayAvatar.textContent =
            initial;

    }

}


/* =========================================================
   32. OPEN PROFILE POPUP
========================================================= */

if (profileButton) {

    profileButton.addEventListener(
        "click",
        function() {

            updateProfileDisplay();

            profilePopup.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   33. CLOSE PROFILE POPUP
========================================================= */

function closeProfilePopup() {

    profilePopup.classList.remove(
        "show"
    );

}


if (profileClose) {

    profileClose.addEventListener(
        "click",
        closeProfilePopup
    );

}


if (profilePopup) {

    profilePopup.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                profilePopup
            ) {

                closeProfilePopup();

            }

        }
    );

}


/* =========================================================
   34. OPEN EDIT PROFILE
========================================================= */

function openEditProfile() {

    closeProfilePopup();


    editProfileName.value =
        savedProfileName;

    editProfileEmail.value =
        savedProfileEmail;

    editProfileIncome.value =
        totalIncome || "";


    profilePanel.classList.add(
        "show"
    );


    profilePanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        openEditProfile
    );

}


/* =========================================================
   35. CLOSE EDIT PROFILE
========================================================= */

function closeEditProfile() {

    profilePanel.classList.remove(
        "show"
    );

}


if (closeProfileButton) {

    closeProfileButton.addEventListener(
        "click",
        closeEditProfile
    );

}


if (cancelProfileButton) {

    cancelProfileButton.addEventListener(
        "click",
        closeEditProfile
    );

}


/* =========================================================
   36. SAVE PROFILE
========================================================= */

if (saveProfileButton) {

    saveProfileButton.addEventListener(
        "click",
        function() {

            const name =
                editProfileName.value.trim();

            const email =
                editProfileEmail.value.trim();

            const income =
                Number(
                    editProfileIncome.value
                );


            savedProfileName =
                name;

            savedProfileEmail =
                email;


            localStorage.setItem(
                "profileName",
                savedProfileName
            );

            localStorage.setItem(
                "profileEmail",
                savedProfileEmail
            );


            if (
                income >= 0 &&
                editProfileIncome.value !== ""
            ) {

                totalIncome =
                    income;


                localStorage.setItem(
                    "totalIncome",
                    String(totalIncome)
                );

            }


            updateProfileDisplay();

            updateDashboard();

            closeEditProfile();

        }
    );

}


/* =========================================================
   37. SIDEBAR NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                link.getAttribute("href");


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            navLinks.forEach(
                function(item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================================
   38. INITIAL LOAD
========================================================= */

loadExpenses();

updateProfileDisplay();

updateDashboard();


if (incomeForm) {

    incomeForm.style.display =
        "none";

}