const addNewFaily__btn = document.getElementById("addNewFaily");
const cardsBox = document.getElementById("cardsBox");
const cardNewFaily = document.getElementById("cardNewFaily");
const cardNewFaily__form = document.getElementById("cardNewFaily__form");
const return__btn = document.getElementById("return__btn");


addNewFaily__btn.addEventListener("click", () => {
	cardsBox.classList.add("hidden");
	cardNewFaily.classList.remove("hidden");

  // Ocultar menu 
	document.getElementById("oracleBox__btn").classList.add("hidden");
	document.getElementById("addNewFaily").classList.add("hidden");
	document.getElementById("messageRandom__btn").classList.add("hidden");
	document.getElementById("searchDiv").classList.add("hidden");

	// Mostrar botón de volver
	return__btn.classList.remove("hidden");
});


cardNewFaily__form.addEventListener("submit", (e) => {
	e.preventDefault();

	const nombre = document.getElementById("nameInput__newF").value.trim();
	const verbo = document.getElementById("verbInput__newF").value.trim();
	const elemento = document.getElementById("elementInput__newF").value.trim();
	const color = document.getElementById("colorInput__newF").value.trim();
	const mensaje = document.getElementById("messageInput__newF").value.trim();
	const imagen = document.getElementById("imgUpload__url").value.trim();

	// Validaciones
	let hasError = false;
	if (!nombre) {
		alert("El campo 'Nombre' es obligatorio.");
		hasError = true;
	}
	if (!verbo) {
		alert("El campo 'Verbo' es obligatorio.");
		hasError = true;
	}
	if (!elemento) {
		alert("El campo 'Elemento' es obligatorio.");
		hasError = true;
	}
	if (!color) {
		alert("El campo 'Color' es obligatorio.");
		hasError = true;
	}
	if (!mensaje) {
		alert("El campo 'Mensaje' es obligatorio.");
		hasError = true;
	}
	if (!imagen) {
		alert("El campo 'Imagen' es obligatorio.");
		hasError = true;
	}


	if (hasError) return;

	
	const newFaily = { nombre, verbo, elemento, color, mensaje, imagen };

	
	fetch(`${urlApi}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newFaily),
	})
		.then((res) =>
			res.json().then((data) => {
				alert("Hada agregada con éxito.");
				cardNewFaily__form.reset();
				cardNewFaily.classList.add("hidden");
				return__btn.classList.add("hidden");

			
				cardsBox.classList.remove("hidden");
				document.getElementById("oracleBox__btn").classList.remove("hidden");
				document.getElementById("addNewFaily").classList.remove("hidden");
				document.getElementById("messageRandom__btn").classList.remove("hidden");
				document.getElementById("searchDiv").classList.remove("hidden");

				
				getFaily(urlApi);
			})
		)
		.catch((err) => alert("Ocurrió el siguiente error: " + err));
});