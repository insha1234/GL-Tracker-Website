document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/photos')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('photo-container');
        container.innerHTML = data.map(photo => `
          <div class="card" style="background-image: url(${photo.imageUrl});">
            <div class="profile">
              <h6>${photo.title}</h6>
              <p>${photo.location}</p>
            </div>
          </div>
        `).join('');
      })
      .catch(error => console.error('Error loading photos:', error));
  });
