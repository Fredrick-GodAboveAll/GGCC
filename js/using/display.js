const loggedInUserId = parseInt (localStorage.getItem('loggedInUserId'));

async function fetchUserData(userId) {
    try {
        const response = await fetch('helpers/fred.json');
        if (!response.ok) {
            throw new Error('failed to fetch data');
        }

        const data = await response.json();
        const user = data.find(person => person.Id === userId);
        return user;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

fetchUserData(loggedInUserId)
    .then(user => {
        if (user) {
            const userName = user.Name;
            const contributions = user.Contributions;

            const months = contributions.map(contribution => contribution.Month);
            const amounts = contributions.map(contribution => contribution.Amount);

            const ctx = document.getElementById('myChart').getContext('2d');

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Your Frequency',
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

        } else {
            alert('User not found');
        }

    });
