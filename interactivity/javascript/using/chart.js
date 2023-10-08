      // setup 
      const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'mon'],
        datasets: [{
          label: 'sales',
          data: [4, 7, 16, 9, 12, 3, 9, 30],
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
          barPercentage: 0.6
        }]
      };

      // config 
      const config = {
        type: 'bar',
        data,
        options: {
            maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
  
      // render init block
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
  