// This code handles user login and validation

const userIDs = {
    "fred": "1",
    "muasya": "2",
    "Dan": "3"
};



// When the login form is submitted
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values of username, password, and userID from the form
    const username = document.getElementById('me').value;
    const password = document.getElementById('you').value;
    const userID = document.getElementById('userID').value;

    // Open the IndexedDB database
    const request = indexedDB.open('UserDataDB', 1);

    request.onerror = function(event) {
        alert("IndexedDB error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');

        // Check if the entered credentials match any user in UserDataDB
        const getUserRequest = objectStore.get(username);

        getUserRequest.onsuccess = function(event) {
            const storedUser = event.target.result;

            if (storedUser && storedUser.password === password) {
                // If username and password match, proceed
                // Check if the entered user ID matches the stored user ID
                if (userIDs[username] === userID) {
                    // If the userID matches, it's a successful login
                    alert('Login successful!');
                    window.location.href = '/login/user/user.html';
                } else {
                    // If the userID doesn't match, show an alert
                    alert('User ID does not exist or is incorrect.');
                    window.location.reload();
                }
            } else {
                // If no user with matching credentials is found, show an alert
                alert('Invalid username or password. Please try again.');
                // Redirect to gitin.html or perform other actions as needed
                window.location.reload();
            }
        };

        transaction.oncomplete = function() {
            db.close();
        };
    };
});




