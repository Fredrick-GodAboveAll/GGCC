let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

// for payment 

function enableTextarea() {
    var select = document.getElementById("paymentMeth");

    var textarea = document.getElementById("message");

    if (select.value === "select") {
        textarea.disabled = true;
    }else {
        textarea.disabled = false;
    }
}

// to require

document.getElementById("paymentMeth").addEventListener("change", function() {
    if (this.value === "") {
        this.setCustomValidity("please select an option");
    } else {
        this.setCustomValidity("");
    }
});

// sending 


(function () {
    emailjs.init("yvgEpr9WavK6KgXh3"); // Replace with your EmailJS User ID
})();

document.getElementById("send-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    
    const params = {
        name: document.getElementById("name").value,
        method: document.getElementById("paymentMeth").value,
        date: document.getElementById("paymentDate").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_nkuhy2y", "template_fexre2d", params) // Replace with your Service ID and Template ID
        .then(function (res) {
            alert("Email sent successfully! Status: " + res.status);
            clearFormFields(); // Call the function to clear form fields
        })
        .catch(function (error) {
            alert("An error occurred while sending the email: " + error);
        });
});

function clearFormFields() {
    // Replace these lines with clearing the fields you want
    document.getElementById("name").value = "";
    document.getElementById("paymentMeth").value = "";
    document.getElementById("paymentDate").value = "";
    document.getElementById("message").value = "";
}


