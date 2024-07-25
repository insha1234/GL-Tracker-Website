document.addEventListener("DOMContentLoaded", function() {
    // Fetch intern data from backend
    fetch('http://localhost:3000/api/interns')
        .then(response => response.json())
        .then(data => {
            renderAllInterns(data);
        })
        .catch(error => console.error('Error fetching interns:', error));

    function renderAllInterns(interns) {
        const container = document.getElementById('all-interns-container');
        container.innerHTML = '';
        
        interns.forEach(intern => {
            const internCard = `
                <div class="col-md-3 mb-4">
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
                            <a href="${intern.instagram}" class="social-icon"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += internCard;
        });

        adjustFontSize();
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
});