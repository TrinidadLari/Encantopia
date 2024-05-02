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
			const { nombre, id, imagen } = hada;

			$("#cardsBox").innerHTML += `
        <div class="cardBox">
					<h2 class="fairyName">${nombre}</h2>
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
			getFailyDetails(btn.dataset.cardid);
		})
	);
};

//TRAER DETALLES HADAS

const getFailyDetails = (id) => {
	fetch(`${urlApi}/${id}`)
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
};

//MOSTRAR DETALLES DE HADAS

const mostrarDetalleAHada = (hada) => {
	showSpinner();

	setTimeout(() => {
		hideSpinner();
		$("#cardsBox").innerHTML = "";

		const {
			nombre,
			id,
			tipoDeHada,
			elemento,
			color,
			imagen,
			inmortalidad,
			significado,
		} = hada;

		$("#cardsBox").innerHTML = `
        	<div class="cardDetail hidden">
				<div class="cardImg">
					<img src="${imagen}" alt="Imágen de Hada" class="fairyImg" />
				</div>
				<div class="cardText">
					<h2 class="fairyName">${nombre}</h2>
					<p class="fairyKind">Tipo de Hada: ${tipoDeHada}</p>
					<p class="fairyElement">Elemento: ${elemento}</p>
					<p class="failyColor">${color}</p>
					<p class="fairyImmortality">${inmortalidad}</p>
					<p class="failySignify">${significado}</p>
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
				<input type="text" name="" id="colorInput" />
				<label for="inmortalInput">Inmortal?</label>
				<input type="checkbox" name="" id="inmortalInput" />
				<label for="signifyInput">Significado</label>
				<input type="text" name="" id="signifyInput" />
				<button class="cardBtn__return" data-cardid="${id}">Volver</button>
				<input type="submit" value="Editar" />
			</form>
			`;

		//funcion regresar

		$$(".cardBtn__return").addEventListener("click", () => getFaily(urlApi));

		$("#cardEdit").addEventListener("click", () => showCardEdit(hada));

		//Mostrar Form Editar Hada

		const showCardEdit = (hada) => {
			$("#nameInput").value = hada.nombre;
			$("#kindInput").value = hada.tipoDeHada;
			$("#elementInput").value = hada.elemento;
			$("#colorInput").value = hada.color;
			$("#inmortalInput").value = hada.inmortalidad;
			$("#signifyInput").value = hada.significado;

			$("#cardEdit").classList.remove("hidden");
		};
		console.log(showCardEdit);
	}, 2000);
};
