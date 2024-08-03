document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
    // Initialize the carousel
    $('#hero-carousel').carousel({
      interval: 1000 // Change slide every 5 seconds
    });


    function activateNavLink() {
        let index = sections.length;
    
        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    
      activateNavLink();
      window.addEventListener('scroll', activateNavLink);
    });


    // Function to send email using EmailJS
    function sendEmail(serviceId, templateId, templateParams) {
        emailjs.send(serviceId, templateId, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thanks for contacting us!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again.');
            });
    }

    // Handle form submissions
    document.getElementById('servicesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const templateParams = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            hearAbout: document.getElementById('hearAbout').value,
            message: document.getElementById('message').value,
            subscribe: document.getElementById('subscribe').checked ? 'Yes' : 'No'
        };
        sendEmail('service_5qy51a6', 'template_lu05x9h', templateParams);
    });

    document.getElementById('queriesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const templateParams = {
            name: document.getElementById('queryName').value,
            email: document.getElementById('queryEmail').value,
            message: document.getElementById('queryMessage').value
        };
        sendEmail('service_5qy51a6', 'template_lu05x9h', templateParams);
    });



    

    // Fetch intern data from backend
    fetch('http://localhost:3000/api/interns')
        .then(response => response.json())
        .then(data => {
            const limitedData = data.slice(0, 4); // Only take the first 4 interns
            renderInterns(limitedData);
            renderInternsList(limitedData);
        })
        .catch(error => console.error('Error fetching interns:', error));

    function renderInterns(interns) {
        const gridContainer = document.getElementById('interns-container-grid');
        gridContainer.innerHTML = '';
        
        interns.forEach(intern => {
            const internCard = `
                <div class="col-md-3">
                    <div class="intern-card">
                        <div class="intern-image" style="background-image: url('${intern.photo}');"></div>
                        <div class="intern-info">
                            <h3 class="intern-name">${intern.name}</h3>
                            <p>${intern.role}</p>
                            <p>${intern.description}</p>
                        </div>
                        <div class="social-icons">
                            <a href="${intern.linkedin}" class="social-icon"><i class="fab fa-linkedin"></i></a>
                            <a href="${intern.github}" class="social-icon"><i class="fab fa-github"></i></a>
                            <a href="${intern.website}" class="social-icon"><i class="fas fa-globe"></i></a>
                            <a href="${intern.twitter}" class="social-icon"><i class="fab fa-twitter"></i></a>
                            <a href="${intern.companyProfile}" class="social-icon"><i class="fas fa-building"></i></a>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.innerHTML += internCard;
        });

        adjustFontSize();
    }

    function renderInternsList(interns) {
        const listContainer = document.getElementById('interns-container-list');
        listContainer.innerHTML = `
            <table class="table-interns">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>LinkedIn</th>
                        <th>GitHub</th>
                        <th>Website</th>
                        <th>Twitter</th>
                        <th>Company Profile</th>
                    </tr>
                </thead>
                <tbody>
                    ${interns.map(intern => `
                        <tr>
                            <td>${intern.name}</td>
                            <td>${intern.role}</td>
                            <td>${intern.description}</td>
                            <td><a href="${intern.linkedin}" target="_blank">LinkedIn</a></td>
                            <td><a href="${intern.github}" target="_blank">GitHub</a></td>
                            <td><a href="${intern.website}" target="_blank">Website</a></td>
                            <td><a href="${intern.twitter}" target="_blank">Twitter</a></td>
                            <td><a href="${intern.companyProfile}" target="_blank">Company Profile</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function adjustFontSize() {
        const internNames = document.querySelectorAll(".intern-name");
        internNames.forEach(function(nameElement) {
            const name = nameElement.textContent.trim();
            if (name.length > 15) {
                nameElement.style.fontSize = "14px";
            } else {
                nameElement.style.fontSize = "18px";
            }
        });
    }

    // Toggle between grid and list views
    document.getElementById('toggle-view').addEventListener('click', function() {
        const gridContainer = document.getElementById('interns-container-grid');
        const listContainer = document.getElementById('interns-container-list');
        const isGridView = gridContainer.style.display !== 'none';

        if (isGridView) {
            gridContainer.style.display = 'none';
            listContainer.style.display = 'block';
            this.textContent = 'Grid View';
        } else {
            gridContainer.style.display = 'flex';
            listContainer.style.display = 'none';
            this.textContent = 'List View';
        }
    });


// Show/hide the scroll-up button based on scroll position
window.addEventListener('scroll', function() {
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (window.scrollY > 200) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

// Scroll to the top when the button is clicked
document.getElementById('scrollUpBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showForm(formId) {
    document.querySelectorAll('.contact-form').forEach(form => {
        form.classList.remove('active-form');
    });
    document.getElementById(formId).classList.add('active-form');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (formId === 'servicesForm') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
    } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
    }
}
