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
async function publicarProducto() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const imageFile = document.getElementById("product-image").files[0];

    if (!name || !description || !imageFile) {
        document.getElementById("publicar-error-message").textContent = "Todos los campos son obligatorios.";
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageFile);

    const response = await fetch("/publicar", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    if (data.success) {
        cargarProductos(); // Recargar productos para que aparezca el nuevo
    } else {
        document.getElementById("publicar-error-message").textContent = "Error al publicar el producto.";
    }
}
async function cargarProductos() {
    const response = await fetch("/productos");
    const productos = await response.json();

    const contenedorProductos = document.querySelector(".productos");
    contenedorProductos.innerHTML = ""; // Limpiar antes de agregar nuevos

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imageUrl}" alt="${producto.name}">
            <p>${producto.name}</p>
            <p>${producto.description}</p>
        `;
        contenedorProductos.appendChild(div);
    });
}

// Cargar productos al inicio
window.onload = cargarProductos;
