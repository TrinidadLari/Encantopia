const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const urlApi = "https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas";


//TRAER HADAS
const getFaily = (fetchUrl) => {
	fetch(fetchUrl)
		.then((res) => res.json())
		.then((data) => showFaily(data))
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
};

getFaily(urlApi);


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
			getFailyDetails(btn.dataset.cardid);
		})   
	);  
};

//menu ocultar-mostrar
	const menu = document.getElementById("burguerMenu");
	const burgerBtn = document.getElementById("burgerBtn");
	const searchSelect = document.getElementById("searchSelect");
	const filterBtn = document.getElementById("spanFilter__btn");

filterBtn.addEventListener("click", () => {
searchSelect.classList.toggle("hidden");
});

burgerBtn.addEventListener("click", () => {
menu.classList.toggle("hidden");
});

//cerrar menu haciendo click en la pantalla


document.addEventListener("click", (e) => {
	
	if (window.innerWidth < 970) {
	
		if (!menu.classList.contains("hidden") && !menu.contains(e.target) && !burgerBtn.contains(e.target)) {
			menu.classList.add("hidden");
		}


		if (!searchSelect.classList.contains("hidden") && !searchSelect.contains(e.target) && !filterBtn.contains(e.target)) {
			searchSelect.classList.add("hidden");
		}
	}
});