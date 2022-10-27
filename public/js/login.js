const loginBtn = document.getElementById('login');

const LoginFormHandler = async function (event) {
    console.log("clicking button to log in")
    event.preventDefault();

    const usernameEl = document.getElementById('usernameInput');
    const passwordEl = document.getElementById('passwordInput');

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to login! Please try again')
    }
}

loginBtn.addEventListener('click', LoginFormHandler)