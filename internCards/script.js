document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

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
                        <div class="project-card">
                            <div class="card-front">
                                <img src="${project.imageUrl}" class="img-fluid" alt="${project.title}" />
                            </div>
                            <div class="card-back">
                                <h3 style="color: #f37037">${project.title}</h3>
                                <span><b>Technologies used: </b>${project.technologies.join(', ')}</span>
                                <br />
                                <br />
                                <div style="text-align: left">
                                    <ul>
                                        <li>${project.description}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectCard;
            });
    }

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
});
