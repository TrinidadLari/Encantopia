const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const urlApi = "https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas";

console.log(urlApi);

//TRAER HADAS
const getFaily = (fetchUrl) => {
	fetch(fetchUrl)
		.then((res) => res.json())
		.then((data) => showFaily(data))
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
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
        <div id="cardBox">
					<h2 class="fairyName">${nombre}</h2>
          <h4 class="fairyElement">${elemento}</h4>
					<img src="${imagen}" alt="Imágen del Hada" class="fairyImg" />
					<button class="cardBtn__detail" data-cardid="${id}">
						VER DETALLES
					</button>
				</div>
      `;
		});

		clickBtn__detail($$(".cardBtn__detail"));
	}, 2000);
};

//MOSTRAR SPINNER
const showSpinner = () => {
	console.log($("#spinnerBox"));
	$("#spinnerBox").classList.remove("hidden");
};

//OCULTAR SPINNER
const hideSpinner = () => {
	$("#spinnerBox").classList.add("hidden");
};

//EVENTO CLICK A BOTON VER DETALLES
const clickBtn__detail = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			console.log("hizo el click el detalle");
			getFailyDetails(btn.dataset.cardid);
			console.log(getFailyDetails);
		})   
	);  
};


document.getElementById("spanFilter__btn").addEventListener("click", () => {
	console.log("Mira como te la clickeo!!");
	document.getElementById("searchSelect").classList.toggle("hidden");
});