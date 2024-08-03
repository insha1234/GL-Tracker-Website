const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

async function signup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
        alert('Signup successful');
    } else {
        alert(`Signup failed: ${data.message}`);
    }
}

async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
        alert('Login successful');
        window.location.href = 'index.html'; 
        // Optionally, you can redirect the user to another page
        // window.location.href = 'your-redirect-url.html';
    } else {
        alert(`Login failed: ${data.message}`);
    }
}
