const messageRandom__btn = document.getElementById("messageRandom__btn");
messageRandom__btn.addEventListener("click", () => {
	fetch(urlApi)
		.then((res) => res.json())
		.then((data) => {
			const randomIndex = Math.floor(Math.random() * data.length);
			const randomFaily = data[randomIndex];
			showFailyRandom(randomFaily);
		})
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
});

const showFailyRandom = (hada) => {
	$("#cardsBox").innerHTML = "";
	const { nombre, id, imagen, elemento } = hada;

	$("#cardsBox").innerHTML = `
    <div id="cardBox">
        <h2 class="fairyName">${nombre}</h2>
        <h4 class="fairyElement">${elemento}</h4>
        <img src="${imagen}" alt="Imágen del Hada" class="fairyImg" />
        <button class="cardBtn__detail" data-cardid="${id}">
            Ver detalles
        </button>
    </div>
    `;
	clickBtn__detail($$(".cardBtn__detail"));
};
