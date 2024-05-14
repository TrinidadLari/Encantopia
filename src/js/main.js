const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const urlApi = "https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas";

console.log(urlApi);

//TRAER HADAS
const getFaily = (fetchUrl) => {
	fetch(fetchUrl)
		.then((res) => res.json())
		.then((data) => showFaily(data))
		.catch((err) => console.log(err));
};

getFaily(urlApi);
console.log(getFaily);

//MOSTRAR HADAS
const showFaily = (hadas) => {
	showSpinner();

	setTimeout(() => {
		hideSpinner();
		$("#cardsBox").innerHTML = "";
		hadas.forEach((hada) => {
			const { nombre, id, imagen, elemento } = hada;

			$("#cardsBox").innerHTML += `
        <div class="cardBox">
					<h2 class="fairyName">${nombre}</h2>
          <h4 class="fairyElement">${elemento}</h4>
					<img src="${imagen}" alt="Imágen del Hada" class="fairyImg" />
					<button class="cardBtn__detail" data-cardid="${id}">
						Ver detalles
					</button>
				</div>
      `;
		});

		clickBtn__detail($$(".cardBtn__detail"));
	}, 2000);
};

//MOSTRAR SPINNER
const showSpinner = () => {
	$("#cardsBox").innerHTML = "";
	$("#spinnerBox").classList.remove("hidden");
};

//OCULTAR SPINNER
const hideSpinner = () => {
	$("#spinnerBox").classList.add("hidden");
};

console.log(showSpinner);
console.log(hideSpinner);

//EVENTO CLICK A BOTON VER DETALLES
const clickBtn__detail = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			//mostrarDetalleAHada(btn.dataset.cardid);
			getFailyDetails(btn.dataset.cardid);
		})
	);
};

//TRAER DETALLES HADAS

const getFailyDetails = (id) => {
	fetch(`${urlApi}/${id}`)
		.then((res) => res.json())
		.then((data) => mostrarDetalleAHada(data))
		.catch((err) => console.log(err));
};

// //MOSTRAR DETALLES DE HADAS

const mostrarDetalleAHada = (hada) => {
	showSpinner();

	setTimeout(() => {
		hideSpinner();
		$("#cardsBox").innerHTML = "";

		const { nombre, id, tipoDeHada, elemento, color, imagen, origen, mensaje } =
			hada;

		$("#cardsBox").innerHTML = `
        	<div id="cardDetail" class="cardDetail hidden">
				<div class="cardImg">
					<img src="${imagen}" alt="Imágen de Hada" class="fairyImg" />
				</div>
				<div class="cardText">
					<h2 class="fairyName">${nombre}</h2>
					<p class="fairyKind">Tipo de Hada: ${tipoDeHada}</p>
					<p class="fairyElement">Elemento: ${elemento}</p>
					<p class="failyColor">${color}</p>
					<p class="fairyImmortality">${origen}</p>
					<p class="failySignify">${mensaje}</p>
				</div>
				<div class="cardBtn">
					<button class="cardBtn__edit" data-cardid="${id}">Editar</button>
					<button class="cardBtn__delete" data-cardid="${id}">Eliminar</button>
          <button class="cardBtn__return" data-cardid="${id}">Volver</button>
				</div>
			</div>

      			<form id="cardEdit" class="hidden">
				<label for="nameInput">Nombre</label>
				<input type="text" name="" id="nameInput" />
				<label for="kindInput">Tipo de Hada</label>
				<input type="text" name="" id="kindInput" />
				<label for="elementInput">Elemento</label>
				<input type="text" name="" id="elementInput" />
				<label for="colorInput">Color</label>
				<input type="color" name="" id="colorInput" />
				<label for="originInput">Origen</label>
				<input type="checkbox" name="" id="originInput" />
				<label for="messageInput">Mensaje</label>
				<input type="text" name="" id="messageInput" />
				<button class="cardBtn__return" data-cardid="${id}">Volver</button>
				<input type="submit" class="confirmEdit__btn" value="Editar" />
			</form>

      <div class="confirmDelete__modal hidden">
        <p>Estás seguro que deseas borrar la información de la alumna?</p>

        <button id="confirmDelete__btn" data-cardId="${id}">Eliminar Alumna</button>
        <button id="cancelDelete__btn">Cancelar</button>
      </div>
			`;

		//funcion regresar

		$(".cardBtn__return").addEventListener("click", () => {
			console.log("clickReturn");
			getFaily(urlApi);
		});

		//$("#cardEdit").addEventListener("click", () => showCardEdit(hada));
		$(".cardBtn__edit").addEventListener("click", () => {
			console.log("clickEdit");
			$("#cardDetail").classList.add("hidden");
			showCardEdit();
		});

		//Mostrar Form Editar Hada

		const showCardEdit = (hada) => {
			$("#cardEdit").classList.remove("hidden");
			$("#nameInput").value = hada.nombre;
			$("#kindInput").value = hada.tipoDeHada;
			$("#elementInput").value = hada.elemento;
			$("#colorInput").value = hada.color;
			$("#originInput").value = hada.inmortalidad;
			$("#messageInput").value = hada.significado;
		};
		console.log(showCardEdit);
	}, 2000);
};
