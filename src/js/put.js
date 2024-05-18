//TRAER DETALLES HADAS

const getFailyDetails = (id) => {
	fetch(`${urlApi}/${id}`)
		.then((res) => res.json())
		.then((data) => showDetailsFaily(data))
		.catch((err) => console.log(err));
};

// //MOSTRAR DETALLES DE HADAS

const showDetailsFaily = (hada) => {
	showSpinner();

	setTimeout(() => {
		hideSpinner();
		$("#cardsBox").innerHTML = "";

		const { nombre, id, verbo, elemento, color, imagen, mensaje } = hada;

		$("#cardsBox").innerHTML = `
        <div id="cardDetail" class="hidden">
				<div class="cardImg">
					<img src="${imagen}" alt="Imágen de Hada" class="fairyImg" />
				</div>
				<div id="cardText">
					<h2 class="fairyName">${nombre}</h2>
					<p class="fairyKind">${verbo}</p>
					<p class="fairyElement">${elemento}</p>
					<p class="failyColor">${color}</p>
					
					<p class="failySignify">${mensaje}</p>
				</div>
				<div id="cardBtn">
					<button class="cardBtn__edit" data-cardid="${id}">Editar</button>
					<button class="cardBtn__delete" data-cardid="${id}">Eliminar</button>
					<button class="cardBtn__return" data-cardid="${id}">Volver</button>
				</div>

				<form id="cardEdit" class="hidden">
					<label for="nameInput">Nombre</label>
					<input type="text" name="" id="nameInput" />
					<label for="kindInput">Acción</label>
					<input type="text" name="" id="kindInput" />
					<label for="elementInput">Elemento</label>
					<input type="text" name="" id="elementInput" />
					<label for="colorInput">Color</label>
					<input type="text" name="" id="colorInput" />
					<label for="messageInput">Mensaje</label>
					<input type="text" name="" id="messageInput" />
					<button class="cardBtn__return" data-cardid="${id}">Volver</button>
					<input type="submit" class="confirmEdit__btn" value="Editar" />
				</form>
			</div>

      <div class="confirmDelete__modal hidden">
        <p>Realmente desea borrar la información de la carta?</p>

        <button id="confirmDelete__btn" data-cardId="${id}">Eliminar Carta</button>
        <button id="cancelDelete__btn">Cancelar</button>
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
			$("#kindInput").value = hada.verbo;
			$("#elementInput").value = hada.elemento;
			$("#colorInput").value = hada.color;
			$("#messageInput").value = hada.mensaje;
		};

		const confirmEditFairy = (hada) => {
			const failyEdited = {
				...hada,
				nombre: $("#nameInput").value,
				verbo: $("#kindInput").value,
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
				.catch((err) => console.log(err));
		};
		$("#cardEdit").addEventListener("submit", (e) => {
			e.preventDefault();
			confirmEditFairy(hada);
		});
	}, 2000);
};
