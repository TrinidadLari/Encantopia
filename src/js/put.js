//TRAER DETALLES HADAS

const getFailyDetails = (id) => {
	fetch(`${urlApi}/${id}`)
		.then((res) => res.json())
		.then((data) => showDetailsFaily(data))
		.catch((err) => alert("Ocurrió el siguiente error:" + err));
};

// //MOSTRAR DETALLES DE HADAS

const showDetailsFaily = (hada) => {


	
		$("#cardsBox").innerHTML = "";

		const { nombre, id, verbo, elemento, color, imagen, mensaje } = hada;

		$("#cardsBox").innerHTML = `
      <div id="cardDetail">
       
				  <div class="cardImg">
				  	<img src="${imagen}" alt="Imágen de Hada" class="fairyImg" />
				  </div>
        <div class="cardImg-text">
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
				
        </div>
				

				<form id="cardEdit" class="hidden">
         <label for="imgUpload__url" class="imgUpload__title">URL imagen</label>
					<input type="text" class="imgUpload__url" id="imgUpload__url" aria-label="URL de imagen">
					<label for="nameInput">Nombre</label>
					<input type="text" name="nameInput" id="nameInput" >
					<label for="verbInput">Acción</label>
					<input type="text" name="verbInput" id="verbInput" >
					<label for="elementInput">Elemento</label>
					<input type="text" name="elementInput" id="elementInput" >
					<label for="colorInput">Color</label>
					<input type="text" name="colorInput" id="colorInput" >
					<label for="messageInput">Mensaje</label>
          <textarea name="messageInput" id="messageInput"></textarea>
					<button class="cardBtn__return" data-cardid="${id}">Volver</button>
					<input type="submit" class="button" id="confirmEdit__btn" value="Editar" >
				</form>
			</div>

      <div id="confirmDeleteFaily__modal" class="hidden modal">
				<img
					src="https://img.icons8.com/?size=100&id=U12vJQsF1INo&format=png&color=000000"
					alt=""
				/>
				<p>Está chekeadísimo que deseas eliminar la carta para siempre?</p>
				<button id="confirmDeleteFaily__btn" data-cardid="${id}">Eliminar por siempre</button>
				<button id="cancelDelete__btn">Nooo! Cancelar!</button>
			</div>
			`;

		//funcion regresar

		$(".cardBtn__return").addEventListener("click", () => {
      document.getElementById("return__btn").classList.add("hidden");
      document.getElementById("oracleBox__btn").classList.remove("hidden");
      document.getElementById("addNewFaily").classList.remove("hidden");
      document.getElementById("searchDiv").classList.remove("hidden");

			getFaily(urlApi);
		});

		$(".cardBtn__edit").addEventListener("click", () => {
			showCardEdit(hada);
		});

		//Mostrar Form Editar Hada

		const showCardEdit = (hada) => {
			$("#cardText").classList.add("hidden");
			$("#cardBtn").classList.add("hidden");
			$("#cardEdit").classList.remove("hidden");
      $("#imgUpload__url").value = hada.imagen;
			$("#nameInput").value = hada.nombre;
			$("#verbInput").value = hada.verbo;
			$("#elementInput").value = hada.elemento;
			$("#colorInput").value = hada.color;
			$("#messageInput").value = hada.mensaje;
		};

		const confirmEditFairy = (hada) => {
			const failyEdited = {
				...hada,
        imagen: $("#imgUpload__url").value,
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
      $("#cardsBox").classList.add("flex");
		});

		$("#cancelDelete__btn").addEventListener("click", () => {
			$("#confirmDeleteFaily__modal").classList.add("hidden");
			document.getElementById("cardDetail").classList.remove("hidden");
  $("#cardsBox").classList.remove("flex");

		});

		document
			.getElementById("confirmDeleteFaily__btn")
			.addEventListener("click", (e) => {
           $("#confirmDeleteFaily__modal").classList.add("hidden");
        $("#cardsBox").classList.remove("flex");
				fetch(`${urlApi}/${e.currentTarget.dataset.cardid}`, {
					method: "DELETE",
				}).then((res) =>
					res
						.json()
						.then((data) => {
							getFaily(urlApi);
						})
						.catch((err) => alert("Ocurrió el siguiente error:" + err))
				);
     
			});

};
