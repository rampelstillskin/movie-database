import { makeCardMovie } from "./make-card.js";

const tabWrapper = document.querySelector(".tab__wrapper");

tabWrapper.addEventListener("click", event => {
	let target = event.target;
	const films = document.querySelector(".tab__film");
	const bookmarks = document.querySelector(".tab__bookmark");

	if (target.id === "films") {
		bookmarks.style.display = "none";
		films.style.display = "flex";
	} else if (target.id === "bookmarks") {
		bookmarks.style.display = "flex";
		films.style.display = "none";
	}
});

// СОЗДАНИЕ КАРТОЧЕК С ТЕГАМИ

const movieTagList = document.querySelector(".movie-tag__list");
const tagRequest = fetch("../tags.json");

tagRequest
	.then(response => response.json())
	.then(tagList => {
		const tagCard = tagList.map(
			tag =>
				`<li class="movie-tag__item">
				<span class="movie-tag__title">${tag}</span>
			</li>`
		);
		movieTagList.innerHTML = tagCard.join("");
	});

// РЕАЛИЗАЦИЯ ПОИСКА ПО НАЗВАНИЮ

const movieSearch = document.querySelector(".movie-search");

const getMovieTitle = async searchMovie => {
	const movieListRequest = await fetch("../films.json").then(response =>
		response.json()
	);

	let movieMatch = movieListRequest.filter(movie => {
		const regex = new RegExp(`^${searchMovie}`, "gi");
		return movie.title.match(regex);
	});

	if (searchMovie.length === 0) {
		movieMatch = [];
	}

	makeCardMovie(movieMatch);
};

movieSearch.addEventListener("input", event => {
	getMovieTitle(movieSearch.value);
});
