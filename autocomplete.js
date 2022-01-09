const createAutoComplete = ({
	root,
	renderOption,
	onOptionSelect,
	inputValue,
	fetchData,
}) => {
	root.innerHTML = `
  <label><b>Search</b></label>
  <input class='input' />
  <div class="dropdown">
          <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
          </div>
        </div>
        <div id="targ"></div>`;

	const dropdown = root.querySelector(".dropdown");
	const resultsWrapper = root.querySelector(".results");
	const input = root.querySelector("input");

	const onInput = debounce(async (event) => {
		const items = await fetchData(event.target.value);
		//without await we will return promise, to return array we need await, and if await we need async in front of function too
		if (!items.length) {
			dropdown.classList.remove("is-active");
			return;
		}

		resultsWrapper.innerHTML = "";
		dropdown.classList.add("is-active");

		for (let item of items) {
			const option = document.createElement("a");

			option.classList.add("dropdown-item");
			option.innerHTML = renderOption(item);

			option.addEventListener("click", () => {
				dropdown.classList.remove("is-active");
				input.value = inputValue(item);
				onOptionSelect(item);
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
};
