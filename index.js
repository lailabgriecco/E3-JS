const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const pizzaInput = document.getElementById("pizza-id");
const searchBtn = document.getElementById("search-btn");
const resultContainer = document.getElementById("result-container");

// Función para renderizar la pizza en el contenedor
function renderPizza(pizza) {
  resultContainer.innerHTML = `
    <div class="card">
      <img src="${pizza.imagen}" alt="${pizza.nombre}">
      <h2>${pizza.nombre}</h2>
      <p>Precio: $${pizza.precio}</p>
      <p>Ingredientes: ${pizza.ingredientes.join(", ")}</p>
    </div>
  `;
}

// Función para renderizar mensajes de error
function renderError(message) {
  resultContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Guardar en localStorage
function saveToLocalStorage(pizza) {
  localStorage.setItem("lastPizza", JSON.stringify(pizza));
}

// Mostrar la última pizza guardada al cargar la página
function loadLastPizza() {
  const lastPizza = localStorage.getItem("lastPizza");
  if (lastPizza) {
    const pizza = JSON.parse(lastPizza);
    renderPizza(pizza);
  }
}

// Event listener para buscar la pizza
searchBtn.addEventListener("click", () => {
  const pizzaId = parseInt(pizzaInput.value);

  // Validar si el input está vacío o no es un número
  if (isNaN(pizzaId)) {
    renderError("Por favor, ingrese un número válido.");
    return;
  }

  // Buscar la pizza por ID
  const pizza = pizzas.find((p) => p.id === pizzaId);

  if (pizza) {
    renderPizza(pizza);
    saveToLocalStorage(pizza);  // Guardar solo si se encontró una pizza válida
  } else {
    renderError("No existe una pizza con ese ID.");
  }
});

// Cargar la última pizza buscada al recargar la página
window.onload = loadLastPizza;
