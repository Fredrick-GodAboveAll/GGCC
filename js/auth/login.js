// This code handles user login and validation

async function fetchData() {
    try {
        const response = await fetch('helpers/fred.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


// Function to handle the login logic
async function handleLogin() {
    const nameInput = document.getElementById('me').value;
    const IdInput = document.getElementById('Id').value;
    
    const data = await fetchData();
    const match = data.find(person => person.Name === nameInput && person.Id == IdInput);
    

    if (match) {
        const userId = match.Id;
        // console.log(userId);

        // future use 
        // alert('Login successful!');
        
        swal('Good Job', 'You clicked the button!', 'success');
        
        window.location.href = `user.html?.=${userId}`;
    
    } else {
        // alert('User does not exist.');
        swal('oops!', 'Incorrect Username or Password Please Try Again!', 'warning');
    }
}

// When the login form is submitted
document.getElementById('login').addEventListener('submit', async (event) => {
    event.preventDefault();
    handleLogin();
});
