// const writtenOffAccounts = data.filter(person => person.Id ===");

const closedAccountsContainer = document.querySelector('.closed_accounts .table tbody');

writtenOffAccounts.forEach((account, index) => {
    // Create a new table row for each person
    const newRow = document.createElement('tr');

    // Add data to the main table row
    newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${account.Name}</td>
        <td>31/12/2023</td>
        
    `;
    
    // Append the main table row to the table body
    closedAccountsContainer.appendChild(newRow);

    // Create an object to store the months affected by the pledge for the current person
    const pledgedMonths = {};

    // Iterate through the contributions of the current person
    account.Contributions.forEach(contribution => {
        // Check if the contribution is a pledge (assuming pledge is indicated by a non-zero amount)
        if (contribution.Pledge > 0) {
            // Add the month and amount to the pledgedMonths object
            pledgedMonths[contribution.Month] = contribution.Pledge;
        }
    });

    // Iterate through the months affected by the pledge for the current person
    Object.entries(pledgedMonths).forEach(([month, amount]) => {
        // Create a new table row for each pledged month
        const pledgeRow = document.createElement('tr');
        pledgeRow.innerHTML = `
            <td></td> <!-- Empty cell for spacing -->
            <td></td> <!-- Empty cell for spacing -->
            <td></td> <!-- Empty cell for spacing -->
            <td>${month}</td>
            <td>${amount}</td>
        `;
        closedAccountsContainer.appendChild(pledgeRow); // Append the pledge row to the table body
    });
});

