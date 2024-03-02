// Set user ID in localStorage
const urlParams = new URLSearchParams(window.location.search);
const parKovComaaadhere = urlParams.get('parKComaaad/s');

const ConLudaMeisMov = parKovComaaadhere;

let data; // Declare data at a higher scope

// Function to fetch user data based on userId
async function fetchUserData(ConLudaMeisMov) {
    try {
        const response = await fetch('helpers/fred.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        data = await response.json(); // Assign data here

        // Find user by ID
        const user = data.find(person => person.Name == ConLudaMeisMov);
        return user;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


if (ConLudaMeisMov) {
    // If userId is present, fetch user data and populate the page
    fetchUserData(ConLudaMeisMov)
        .then(user => {
            if (user) {
                // Populate user data
                const Going = user.Name;
                document.getElementById('userName').textContent = Going;
                document.getElementById('ll').textContent = Going;
                document.getElementById('envelope').textContent = Going;
                document.getElementById('check').textContent = Going;
                const contributions = user.Contributions;

                (function () {
                    emailjs.init("dal5-mlZ73bYmcqth"); // Replace with your EmailJS User ID
                })();
                
                document.getElementById("send-form").addEventListener("submit", function (e) {
                    e.preventDefault();
                    
                    const params = {
                        name: Going,
                        method: document.getElementById("paymentMeth").value,
                        date: document.getElementById("paymentDate").value,
                        message: document.getElementById("using").value,
                    };

                    
                    emailjs.send("service_9b8a14i", "template_ow136vh", params) // Replace with your Service ID and Template ID
                        .then(function (res) {
                            // alert("Email sent successfully! Status: " + res.status);
                            iziToast.success({
                                title: 'Great, !',
                                message: 'Your message was delivered successfully',
                                position: 'topRight'
                            });
                            clearFormFields(); // Call the function to clear form fields
                        })
                        .catch(function (error) {
                            // alert("An error occurred while sending the email: " + error);
                            iziToast.error({
                                title: 'Not sent, !',
                                message: 'Message not sent kindly contact Tresurer to resolve',
                                position: 'topRight'
                              });
                        });
                });
                
                function clearFormFields() {
                    // Replace these lines with clearing the fields you want
                    document.getElementById("paymentMeth").value = "";
                    document.getElementById("paymentDate").value = "";
                    document.getElementById("using").value = "";
                }


                // Extract months and amounts for contributions
                const months = contributions.map(contribution => contribution.Month);
                // const amounts = contributions.map(contribution => contribution.Amount);

                let totalAmount = 0;
                let pledgedAmount = 0;

                for (const person of data) {
                    let isWrittenOff = person.Id === "6565"; // Check if the person is marked as written off
                    // console.log(person.Name, "Is Written Off:", isWrittenOff); // Debugging output
                    for (const contribution of person.Contributions) {
                        totalAmount += contribution.Amount; // Always add contribution amount to the total amount
                        // Check if the person is not marked as written off
                        if (!isWrittenOff) {
                            pledgedAmount += contribution.Pledge; // Add pledge amount only if not marked as written off
                        }
                    }
                }
                

                // Update total amount and pledged amount on the page
                document.getElementById('AllContributions').textContent = totalAmount;
                document.getElementById('PledgeAmountNotHonored').textContent = pledgedAmount;

                // Populate table staff here
                const tbody = document.getElementById('tii');
                let rowsHTML = '';

                
                // Assuming contributions array is available here
                const tbi = document.getElementById('what');
                let taktak = '';



                contributions.forEach((contribution, num) => {
                    const checkboxWM = `checkbox_${num}`;
                    
                    taktak += `
                        <tr>
                            <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="${checkboxWM}">
                                    <label for="${checkboxWM}" class="custom-control-label">&nbsp;</label>
                                </div>
                            </td>
                            <td>${contribution.Month}</td>
                            <td>${contribution.Amount}</td>
                            <td>${contribution.Pledge}</td>
                            <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                        </tr>
                    `;
                });

                // Append taktak to the table body
                tbi.innerHTML = taktak;


                

                months.forEach((month, index) => {
                    let totalContribution = 0;
                    let totalPledge = 0;

                    data.forEach(person => {
                        const contribution = person.Contributions.find(c => c.Month === month);
                        if (contribution) {
                            // Check if the person is not marked as written off
                            totalContribution += contribution.Amount;
                            if (person.Id !== "6565") {
                                
                                totalPledge += contribution.Pledge;
                            }
                        }
                    });

                    // Calculate percentage
                    const percentage = totalContribution / (totalContribution + totalPledge) * 100;

                    // Determine color based on percentage
                    let color;
                    if (percentage >= 0 && percentage < 21) {
                        color = 'grey';
                    } else if (percentage >= 21 && percentage < 50) {
                        color = 'red'; // Adjust color as needed
                    } else if (percentage >= 50 && percentage < 70) {
                        color = 'goldenrod';
                    } else if (percentage >= 71 && percentage < 80) {
                        color = 'chocolate';
                    } else if (percentage >= 81 && percentage < 99) {
                        color = 'palegreen'; // Adjust color as needed
                    } else if (percentage >= 100) {
                        color = 'limegreen'; // Default to green if percentage is 100 or more
                    }

                    // Generate unique checkbox ID
                    const checkboxId = `checkbox_${month}_${index}`;

                    // Construct table row HTML
                    rowsHTML += `
                    <tr>
                        <td class="p-0 text-center">
                            <div class="custom-checkbox custom-control">
                                <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="${checkboxId}">
                                <label for="${checkboxId}" class="custom-control-label">&nbsp;</label>
                            </div>
                        </td>
                        <td>${month}</td>
                        <td class="text-truncate">
                            <ul class="list-unstyled order-list m-b-0 m-b-0">
                                <li class="team-member team-member-sm"><img class="rounded-circle" src="assets/img/products/product-2.png" alt="user" data-toggle="tooltip" title="" data-original-title="Wildan Ahdian"></li>
                                <li class="avatar avatar-sm"><span class="badge badge-primary">+12</span></li>
                            </ul>
                        </td>
                        <td class="align-middle">
                            <div class="progress-text">${percentage.toFixed(2)}%</div>
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                            </div>
                        </td>
                        <td>${totalContribution}</td>
                        <td>${totalPledge}</td>
                        <td>
                            <div>-</div>
                        </td>
                        <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                    </tr>`;
                });

                const writtenOffAccounts = data.filter(person => person.Id === "6565");

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


                // Update table body with constructed rows
                tbody.innerHTML = rowsHTML;
            } else {
                alert('User not found');
            }
        })
        .catch(error => {
            console.error(error);
            alert('nope');
        });
} else {
    // If userId is not present, handle the situation (e.g., redirect or show an error message)
    alert('User ID not provided. Kindly Log-In.');
}


// to require an option from the user

document.getElementById("paymentMeth").addEventListener("change", function() {
    if (this.value === "") {
        this.setCustomValidity("please select an option");
    } else {
        this.setCustomValidity("");
    }
});


// to set the textarea and require it at the same time


function enableTextarea() {
    var select = document.getElementById("paymentMeth");

    var textarea = document.getElementById("using");

    if (select.value === "select") {
        textarea.disabled = true;
    }else {
        textarea.disabled = false;
    }
}


// sending the actual payment


