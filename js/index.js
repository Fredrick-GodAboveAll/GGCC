let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
let header = document.querySelector('.header');


menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
    
}



/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactProject = document.getElementById('contact-project'),
    contactMessage = document.getElementById('contact-message')


const sendEmail = (e) => {
    e.preventDefault()

    // check if the field has a value 
    if(contactName.value === '' || contactEmail.value === '' || contactProject.value === ''){
        // add and remove color 
        contactMessage.classList.remove('color-blue')
        contactMessage.classList.add('color-red')

        // show message

        contactMessage.textContent = 'write all your input fields 😐'
        //Remove the message after 4 seconds 
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000)

    }else {
        // service Id - template ID - #form - publice key
        emailjs.sendForm('service_nkuhy2y','template_d3ui4ym','#contact-form','yvgEpr9WavK6KgXh3')
            .then(() => {
                //show message and add color
                contactMessage.classList.add('color-blue')
                contactMessage.textContent = 'Message sent ✔'

                //Remove the message after 4 seconds 
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 5000)
              
            }, (error) =>{
                alert('could not sent CONTACT ADMIN!...📩', error)
            })
        
        // to clear the input field 
        contactName.value = ''
        contactEmail.value = ''
        contactProject.value = ''
    }

}

contactForm.addEventListener('submit', sendEmail)



// for the advert 

const countDownData = new Date("Nov 14, 2023 8:00:00").getTime();

