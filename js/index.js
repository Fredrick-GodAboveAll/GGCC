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


/*=============== NEW SWIPER ===============*/

let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',
    slidesPerView: "auto",
    centeredSlides: true,


    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
        992: {
          spaceBetween: 80,
        },
    },
});



// TIMER 


const countDownData = new Date("Dec 17, 2023 12:00:00").getTime();

const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const discountContainer = document.querySelector(".discount-container");

const x = setInterval(function () {
    const now = new Date().getTime();
    let distance = countDownData - now;

    // Handling negative values
    if (distance < 0) {
        distance = 0;
    }

    let daysValue = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
    let hoursValue = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
    let minutesValue = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    let secondsValue = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

    days.innerHTML = daysValue;
    hours.innerHTML = hoursValue;
    minutes.innerHTML = minutesValue;
    seconds.innerHTML = secondsValue;

    if (distance <= 0) {
        clearInterval(x);
        // Check if discountContainer exists before removing it
        if (discountContainer) {
            discountContainer.remove();

            // Add a red blocking dot
            const dot = document.createElement("div");
            dot.className = "blocking-dot";
            dot.style.backgroundColor = "red";
            discountContainer.appendChild(dot);
        }
    }

}, 1000);
