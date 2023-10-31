
const ac = '$2a$10$40khDRVUGnUYQJHxbuqguOHP0fxU1bh4yYdZZY1h9Kl63ZZi3fvhC'
function verifyName() {

    const verifyName = document.getElementById("verifyName").value;
    const name = ac

    if (dcodeIO.bcrypt.compareSync(verifyName, name)) {
        document.getElementById("verificationResult");
        alert("God is good")
        location.reload()

    } else {
        document.getElementById("verificationResult");
        alert("NOOOOO!!")
    }
    
}


