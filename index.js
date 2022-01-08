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

createAutoComplete({ root: document.querySelector(".ac") });
createAutoComplete({ root: document.querySelector(".ac-two") });
createAutoComplete({ root: document.querySelector(".ac-three") });

const onMovieSelect = async (movie) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "9ac9b2e",
			i: movie.imdbID,
		},
	});
	document.querySelector("#summary").innerHTML = movieTemplate(response.data);
	// console.log(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
  <article class='media'>
    <figure class='media-left'>
      <p class='image'>
        <img src='${movieDetail.Poster}' />
      </p>
    </figure>
    <div class="media-content">
      <div class='content'>
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>
  <article class='notification is-primary'>
    <p class='title'>${movieDetail.Awards}</p>
    <p class='subtitle'>Awards</p>
  </article>
  <article class='notification is-primary'>
    <p class='title'>${movieDetail.BoxOffice}</p>
    <p class='subtitle'>BoxOffice</p>
  </article>
  <article class='notification is-primary'>
    <p class='title'>${movieDetail.Metascore}</p>
    <p class='subtitle'>Metascore</p>
  </article>
  <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbRating}</p>
    <p class='subtitle'>IMDB Raiting</p>
  </article>
  <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbVotes}</p>
    <p class='subtitle'>IMDB Votes</p>
  </article>
  `;
};
