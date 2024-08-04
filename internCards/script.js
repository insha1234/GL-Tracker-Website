document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
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

    // Fetch project data from backend
    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => {
            renderProjects(data);
        })
        .catch(error => console.error('Error fetching projects:', error));

        function renderProjects(projects) {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '';
    
            projects.forEach(project => {
                const projectCard = `
                    <div class="col-md-4">
                        <div class="project-card" onclick="openModal('${project.title}', '${project.imageUrl}', '${project.technologies.join(', ')}', 'Interns Details', 'Mentor Name', 'Time Taken', 'Knowledge Gained')">
                            <div class="card-front">
                                <img src="${project.imageUrl}" class="img-fluid" alt="${project.title}" />
                            </div>
                            <div class="card-back">
                                <h3 style="color: #f37037">${project.title}</h3>
                                <span><b>Technologies used: </b>${project.technologies.join(', ')}</span>
                                <br /><br />
                                <div style="text-align: left">
                                    <ul>
                                        ${project.bulletPoints.map(point => `<li>${point}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectCard;
            });
        }


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

    
        // Function to open the modal
        window.openModal = function(title, imageUrl, technologies, interns, mentor, time, knowledge) {
            document.getElementById('modal-heading').textContent = title;
            document.getElementById('modal-image').src = imageUrl;
            document.getElementById('modal-technologies').textContent = technologies;
            document.getElementById('modal-interns').textContent = interns;
            document.getElementById('modal-mentor').textContent = mentor;
            document.getElementById('modal-time').textContent = time;
            document.getElementById('modal-knowledge').textContent = knowledge;
            document.getElementById('project-modal').style.display = 'flex';
        };
    
        // Close the modal when clicking on the close button
        document.querySelector('.close-btn').addEventListener('click', function() {
            document.getElementById('project-modal').style.display = 'none';
        });
    
        // Close the modal when clicking outside of the modal content
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('project-modal')) {
                document.getElementById('project-modal').style.display = 'none';
            }
        });
    // Existing scroll-up button code...
    window.addEventListener('scroll', function() {
        const scrollUpBtn = document.getElementById('scrollUpBtn');
        if (window.scrollY > 200) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

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