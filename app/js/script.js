const tabWrapper = document.querySelector(".tab__wrapper");

tabWrapper.addEventListener("click", event => {
	let target = event.target;
	const tabIndex = document.querySelectorAll("[data-tab]");

	tabIndex.forEach(tab => {
		if (target.className === "tab__radio") {
			tab.style.display = "none";
		}
		if (tab.dataset.tab === target.dataset.tab) {
			tab.style.display = "flex";
		}
	});
});

const movieTagList = document.querySelector(".movie-tag__list");

const tagsRequest = fetch("../tags.json").then(response => response.json());

tagsRequest.forEach(value => console.log(value));

// <li class="movie-tag__item">
// 				<span class="movie-tag__title"></span>
// 			</li>

// tagsRequest..map(element => {
// 	movieTagItem.querySelector(".movie-tag__title").textContent = element;

// 	movieTagList.appendChild(movieTagItem);
// });

// РЕАЛИЗАЦИЯ ПОИСКА ПО НАЗВАНИЮ

const movieCardsList = document.querySelector(".movie-cards__list");
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

	additionalHtml(movieMatch);
};

const additionalHtml = movies => {
	const movieCardHtml = movies.map(
		card =>
			`<li class="movie-card">
				<span class="movie-card__title">${card.title}</span>
			</li>`
	);

	movieCardsList.innerHTML = movieCardHtml.join("");
};

movieSearch.addEventListener("input", () => getMovieTitle(movieSearch.value));
