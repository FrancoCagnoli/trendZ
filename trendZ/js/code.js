function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    if (username === "admin" && password === "1234") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
}

function irAlLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("main-content").style.display = "none";
}
function irAlInicio() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}
function mostrarRegistro() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("registro-form").style.display = "block";
    document.getElementById("login-title").textContent = "Registro";
}

function mostrarLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("registro-form").style.display = "none";
    document.getElementById("login-title").textContent = "Iniciar Sesión";
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("error-message");

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
}

async function registrar() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const errorMessage = document.getElementById("registro-error-message");

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        mostrarLogin();
        errorMessage.textContent = "Registro exitoso. Ahora inicia sesión.";
        errorMessage.style.color = "green";
    } else {
        errorMessage.textContent = "Error al registrar usuario.";
    }
}
