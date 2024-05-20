const urlFilters = new URLSearchParams(urlApi.search);
console.log(urlFilters);

document.getElementById("selectVerb").addEventListener("change", (e) => {
	verbo = e.target.value;
	urlFilters.set("verbo", e.target.value);
	console.log(urlFilters);
	console.log(`${urlApi}/?${urlFilters}`);
	getFaily(`${urlApi}/?${urlFilters}`);
});

document.getElementById("selectElement").addEventListener("change", (e) => {
	elemento = e.target.value;
	urlFilters.set("elemento", e.target.value);
	console.log(urlFilters);
	console.log(`${urlApi}/?${urlFilters}`);
	getFaily(`${urlApi}/?${urlFilters}`);
});

document.getElementById("selectColor").addEventListener("change", (e) => {
	color = e.target.value;
	urlFilters.set("color", e.target.value);
	console.log(urlFilters);
	console.log(`${urlApi}/?${urlFilters}`);
	getFaily(`${urlApi}/?${urlFilters}`);
});

document.getElementById("cleanSelect__btn").addEventListener("click", () => {
	document.getElementById("selectVerb").value = "";
	document.getElementById("selectElement").value = "";
	document.getElementById("selectColor").value = "";
	urlFilters.delete("verbo");
	urlFilters.delete("elemento");
	urlFilters.delete("color");
});
