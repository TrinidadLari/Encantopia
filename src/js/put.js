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
					<select name="selectVerb" id="verbInput">
							<option value="Acción...">Acción...</option>
							<option value="Paciencia">Paciencia</option>
							<option value="Gratitud">Gratitud</option>
							<option value="Fluir">Fluir</option>
							<option value="Decisión">Decisión</option>
							<option value="Escucha">Escucha</option>
							<option value="Disfrute">Disfrute</option>
							<option value="Confianza">Confianza</option>
							<option value="Silencio">Silencio</option>
							<option value="Amor">Amor</option>
							<option value="Quietud">Quietud</option>
							<option value="Actuar">Actuar</option>
						</select>
					<label for="elementInput">Elemento</label>
					<select name="selectElement" id="elementInput">
							<option value="Elemento...">Elemento...</option>
							<option value="Agua">Agua</option>
							<option value="Tierra">Tierra</option>
							<option value="Fuego">Fuego</option>
							<option value="Aire">Aire</option>
							<option value="Alma">Alma</option>
						</select>
					<label for="colorInput">Color</label>
					<select name="selectColor" id="colorInput">
							<option value="Color...">Color...</option>
							<option value="Aguamarín">Aguamarín</option>
							<option value="Verde">Verde</option>
							<option value="Rosado">Rosado</option>
							<option value="Blanco">Blanco</option>
							<option value="Limón">Limón</option>
							<option value="Madera">Madera</option>
							<option value="Naranja">Naranja</option>
							<option value="Rojo">Rojo</option>
						</select>
					<label for="messageInput">Mensaje</label>
          <textarea name="messageInput" id="messageInput"></textarea>
           <button type="button" class="cardBtn__return" data-cardid="${id}">Volver</button>
					<input type="submit" class="button" id="confirmEdit__btn" value="Editar" >
				</form>
       
			</div>

      <div id="confirmDeleteFaily__modal" class="hidden modal">
				<img
					src="https://img.icons8.com/?size=100&id=U12vJQsF1INo&format=png&color=000000"
					alt=""
				/>
				<p>Está chekeadísimo que desea eliminar la carta para siempre?</p>
        <button id="cancelDelete__btn">Nooo! Cancelar!</button>
				<button id="confirmDeleteFaily__btn" data-cardid="${id}">Eliminar por siempre</button>
				
			</div>
			`;

		//funcion regresar

    document.querySelectorAll(".cardBtn__return").forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("return__btn").classList.add("hidden");
        document.getElementById("oracleBox__btn").classList.remove("hidden");
        document.getElementById("addNewFaily").classList.remove("hidden");
        document.getElementById("searchDiv").classList.remove("hidden");
        document.getElementById("messageRandom__btn").classList.remove("hidden");

        getFaily(urlApi); // Volver a la vista principal
    });
});


		$(".cardBtn__edit").addEventListener("click", () => {
       // Ocultar menu 
	document.getElementById("oracleBox__btn").classList.add("hidden");
	document.getElementById("addNewFaily").classList.add("hidden");
	document.getElementById("messageRandom__btn").classList.add("hidden");
	document.getElementById("searchDiv").classList.add("hidden");

	// Mostrar botón de volver
	return__btn.classList.remove("hidden");
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


	// Validaciones
  const validateForm = () => {
	let hasError = false;

   const nombre = $("#nameInput").value.trim();
  const verbo = $("#verbInput").value.trim();
  const elemento = $("#elementInput").value.trim();
  const color = $("#colorInput").value.trim();
  const mensaje = $("#messageInput").value.trim();
  const imagen = $("#imgUpload__url").value.trim();

	if (!nombre) {
		alert("El campo 'Nombre' es obligatorio.");
		hasError = true;
	} else if (nombre.length > 14) {
		alert("El campo 'Nombre' no puede tener más de 14 caracteres.");
		hasError = true;
	}

	if (!verbo) {
		alert("El campo 'Verbo' es obligatorio.");
		hasError = true;
	}

	if (!elemento) {
		alert("El campo 'Elemento' es obligatorio.");
		hasError = true;
	}

	if (!color) {
		alert("El campo 'Color' es obligatorio.");
		hasError = true;
	}

  	if (!mensaje) {
		alert("El campo 'Mensaje' es obligatorio.");
		hasError = true;
	} else if (mensaje.length > 250) {
		alert("El campo 'Mensaje' no puede tener más de 250 caracteres.");
		hasError = true;
	}

	if (!imagen) {
		alert("El campo 'Imagen' es obligatorio.");
		hasError = true;
	}

	 return hasError;
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

       if (validateForm()) return;

			confirmEditFairy(hada);
		});


    //ELIMINAR

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
