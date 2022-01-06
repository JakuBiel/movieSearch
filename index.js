//searchTool
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "9ac9b2e",
			s: searchTerm,
		},
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class='input' />
<div class="dropdown">
				<div class="dropdown-menu">
					<div class="dropdown-content results"></div>
				</div>
			</div>
			<div id="targ"></div>`;

const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");
const input = document.querySelector("input");

const onInput = debounce(async (event) => {
	const movies = await fetchData(event.target.value);
	//without await we will return promise, to return array we need await, and if await we need async in front of function too
	if (!movies.length) {
		dropdown.classList.remove("is-active");
		return;
	}

	resultsWrapper.innerHTML = "";
	dropdown.classList.add("is-active");

	for (let movie of movies) {
		const option = document.createElement("a");
		const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

		option.classList.add("dropdown-item");
		option.innerHTML = `
      <img src="${imgSrc}">
      ${movie.Title} (${movie.Year})
    `;
		option.addEventListener("click", () => {
			dropdown.classList.remove("is-active");
			input.value = movie.Title;
		});
		resultsWrapper.appendChild(option);
	}
});

input.addEventListener("input", onInput);

document.addEventListener("click", (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove("is-active");
	}
});
