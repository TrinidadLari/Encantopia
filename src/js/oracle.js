const oracleBox = document.getElementById("oracleBox");
const cardsBox1 = document.getElementById("cardsBox");
const oracleBox__btn = document.getElementById("oracleBox__btn");

const urlTierra =
	"https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas?elemento=tierra";
const urlAgua =
	"https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas?elemento=agua";
const urlAire =
	"https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas?elemento=aire";
const urlFuego =
	"https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas?elemento=fuego";
const urlAlma =
	"https://6619ec20125e9bb9f29afff2.mockapi.io/api/hadas?elemento=alma";

const boxTierra = document.getElementById("oracleBox__faily1");
const boxAgua = document.getElementById("oracleBox__faily2");
const boxAire = document.getElementById("oracleBox__faily3");
const boxFuego = document.getElementById("oracleBox__faily4");
const boxAlma = document.getElementById("oracleBox__faily5");

const getCardTierra = () => getFailyRandom(urlTierra, boxTierra);
const getCardAgua = () => getFailyRandom(urlAgua, boxAgua);
const getCardAire = () => getFailyRandom(urlAire, boxAire);
const getCardFuego = () => getFailyRandom(urlFuego, boxFuego);
const getCardAlma = () => getFailyRandom(urlAlma, boxAlma);

oracleBox__btn.addEventListener("click", () => {
	cardsBox1.classList.add("hidden");
	oracleBox.classList.remove("hidden");
	getCardTierra();
	getCardAgua();
	getCardAire();
	getCardFuego();
	getCardAlma();
});

const getFailyRandom = (url, cardsBox) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			const randomIndex = Math.floor(Math.random() * data.length);
			const randomFaily = data[randomIndex];
			showFailyOracle(randomFaily, cardsBox);
		})
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
};

const showFailyOracle = (hada, cardsBox) => {
	cardsBox.innerHTML = "";
	const { nombre, verbo, imagen, elemento, color, mensaje } = hada;

	cardsBox.innerHTML = `
    <div id="cardOracleBox">
        <h2 class="fairyName">${nombre}</h2>
        <h3 class="fairyKind">${verbo}</h3>
        <h4 class="fairyElement">"${elemento} - ${color}"</h4>
        <img src="${imagen}" alt="Imágen del Hada" class="fairyImg" />
        <p class="failySignify">${mensaje}</p>
    </div>
    `;
};
