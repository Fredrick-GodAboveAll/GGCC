

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('.');


// Function to fetch user data based on userId
async function fetchUserData(userId) {
    try {
        const response = await fetch('helpers/fred.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const user = data.find(Person => Person.Id == userId);

        return user;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

if (userId) {
    // If userId is present, fetch user data and populate the page
    fetchUserData(userId)
        .then(user => {
            if (user) {
                const userName = user.Name;
                const contributions = user.Contributions;

                const months = contributions.map(contribution => contribution.Month);
                const amounts = contributions.map(contribution => contribution.Amount);

                // Chart configuration
                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Chart',
                            data: amounts,
                            backgroundColor: [
                                'rgba(255, 26, 104, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(0, 0, 0, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 26, 104, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(0, 0, 0, 1)'
                            ],
                            borderWidth: 2,
                            barPercentage: 0.7
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                document.getElementById('userName').textContent = userName;
                document.getElementById('user-name').textContent = userName;
            } else {
                alert('User not found');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Failed to fetch user data');
        });
} else {
    // If userId is not present, handle the situation (e.g., redirect or show an error message)
    alert('User ID not provided. Redirect or display an error message as needed.');
}
