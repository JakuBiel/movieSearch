//searchTool
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "9ac9b2e",
			s: searchTerm,
		},
	});

	return response.data.Search;
};
//debounce
const input = document.querySelector("input");

const onInput = debounce(async (event) => {
	const movies = await fetchData(event.target.value);
	//without await we will return promise, to return array we need await, and if await we need async in front of function too
	console.log(movies);
});

input.addEventListener("input", onInput);
