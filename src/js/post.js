const addNewFaily__btn = document.getElementById("addNewFaily");
const cardsBox = document.getElementById("cardsBox");
const cardNewFaily = document.getElementById("cardNewFaily");
const cardNewFaily__form = document.getElementById("cardNewFaily__form");

addNewFaily__btn.addEventListener("click", () => {
	cardsBox.innerHTML = "";
	cardNewFaily.classList.remove("hidden");

	cardNewFaily.addEventListener("submit", (e) => {
		e.preventDefault();
		const newFaily = {
			nombre: document.getElementById("nameInput__newF").value,
			verbo: document.getElementById("verbInput__newF").value,
			elemento: document.getElementById("elementInput__newF").value,
			color: document.getElementById("colorInput__newF").value,
			mensaje: document.getElementById("messageInput__newF").value,
			imagen: document.getElementById("imgUpload__url").value,
		};

		fetch(`${urlApi}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFaily),
		})
			.then((res) =>
				res.json().then((data) => {
					cardNewFaily__form.reset();
					cardNewFaily.classList.add("hidden");
					getFaily(urlApi);
					console.log(data);
				})
			)
			.catch((err) => alert("Ocurrió el siguiente error:" + err));

		console.log(newFaily);
	});
});
