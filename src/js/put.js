//TRAER DETALLES HADAS

const getFailyDetails = (id) => {
	fetch(`${urlApi}/${id}`)
		.then((res) => res.json())
		.then((data) => showDetailsFaily(data))
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
};

// //MOSTRAR DETALLES DE HADAS

const showDetailsFaily = (hada) => {
	showSpinner();

	setTimeout(() => {
		hideSpinner();
		$("#cardsBox").innerHTML = "";

		const { nombre, id, verbo, elemento, color, imagen, mensaje } = hada;

		$("#cardsBox").innerHTML = `
        <div id="cardDetail">
				<div class="cardImg">
					<img src="${imagen}" alt="Imágen de Hada" class="fairyImg" />
				</div>
				<div id="cardText">
					<h2 class="fairyName">${nombre}</h2>
					<h3 class="fairyKind">${verbo}</h3>
					<h4 class="fairyElement">${elemento} - ${color}</h4>
					
					
					<p class="failySignify">${mensaje}</p>
				</div>
				<div id="cardBtn">
					<button class="cardBtn__edit" data-cardid="${id}">Editar</button>
					<button class="cardBtn__delete">Eliminar</button>
					<button class="cardBtn__return" data-cardid="${id}">Volver</button>
				</div>

				<form id="cardEdit" class="hidden">
					<label for="nameInput">Nombre</label>
					<input type="text" name="" id="nameInput" />
					<label for="verbInput">Acción</label>
					<input type="text" name="" id="verbInput" />
					<label for="elementInput">Elemento</label>
					<input type="text" name="" id="elementInput" />
					<label for="colorInput">Color</label>
					<input type="text" name="" id="colorInput" />
					<label for="messageInput">Mensaje</label>
          <textarea name="" id="messageInput"></textarea>
					<button class="cardBtn__return" data-cardid="${id}">Volver</button>
					<input type="submit" class="button" id="confirmEdit__btn" value="Editar" />
				</form>
			</div>

      <div id="confirmDeleteFaily__modal" class="hidden modal">
				<img
					src="https://thumbs.dreamstime.com/b/escolta-stop-de-la-historieta-ejemplo-un-que-soporta-una-muestra-parada-135524686.jpg"
					alt=""
				/>
				<p>Está chekeadísimo que deseas eliminar la carta para siempre?</p>
				<button id="confirmDeleteFaily__btn" data-cardid="${id}">Eliminar por siempre</button>
				<button id="cancelDelete__btn">Nooo! Cancelar!</button>
			</div>
			`;

		//funcion regresar

		$(".cardBtn__return").addEventListener("click", () => {
			console.log("clickReturn");
			getFaily(urlApi);
		});

		$(".cardBtn__edit").addEventListener("click", () => {
			console.log("clickEdit");
			showCardEdit(hada);
		});

		//Mostrar Form Editar Hada

		const showCardEdit = (hada) => {
			$("#cardText").classList.add("hidden");
			$("#cardBtn").classList.add("hidden");
			$("#cardEdit").classList.remove("hidden");
			$("#nameInput").value = hada.nombre;
			$("#verbInput").value = hada.verbo;
			$("#elementInput").value = hada.elemento;
			$("#colorInput").value = hada.color;
			$("#messageInput").value = hada.mensaje;
		};

		const confirmEditFairy = (hada) => {
			const failyEdited = {
				...hada,
				nombre: $("#nameInput").value,
				verbo: $("#verbInput").value,
				elemento: $("#elementInput").value,
				color: $("#colorInput").value,
				mensaje: $("#messageInput").value,
			};

			fetch(`${urlApi}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(failyEdited),
			})
				.then((res) => {
					if (res.ok) {
						getFailyDetails(id);
					}
				})
				.catch((err) => alert("Ocurrió el siguiente error:" + err));
		};
		$("#cardEdit").addEventListener("submit", (e) => {
			e.preventDefault();
			confirmEditFairy(hada);
		});

		$(".cardBtn__delete").addEventListener("click", () => {
			$("#confirmDeleteFaily__modal").classList.remove("hidden");
			document.getElementById("cardDetail").classList.add("hidden");
		});

		$("#cancelDelete__btn").addEventListener("click", () => {
			$("#confirmDeleteFaily__modal").classList.add("hidden");
			document.getElementById("cardDetail").classList.remove("hidden");
		});

		document
			.getElementById("confirmDeleteFaily__btn")
			.addEventListener("click", (e) => {
				fetch(`${urlApi}/${e.currentTarget.dataset.cardid}`, {
					method: "DELETE",
				}).then((res) =>
					res
						.json()
						.then((data) => {
							getFaily(urlApi);
							console.log(data);
						})
						.catch((err) => alert("Ocurrió el siguiente error:" + err))
				);
			});
	}, 2000);
};
