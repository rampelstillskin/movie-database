const tabWrapper = document.querySelector(".tab__wrapper");

tabWrapper.addEventListener("click", (event) => {
    let { target } = event;
    const films = document.querySelector(".tab__film");
    const bookmarks = document.querySelector(".tab__bookmark");

    // Фильтрация по тегам

    if (target.className === "movie-tag__title") {
        tagFilter(target);
    }

    // Показ/Скрытие табов

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
    .then((response) => response.json())
    .then((tagList) => {
        const tagCard = tagList.map(
            (tag) => `<li class="movie-tag__item">
				<span class="movie-tag__title">${tag}</span>
			</li>`
        );
        movieTagList.innerHTML = tagCard.join("");
    });

// РЕАЛИЗАЦИЯ ПОИСКА ПО НАЗВАНИЮ

const movieSearch = document.querySelector(".movie-search");

const getMovieTitle = async (searchMovie) => {
    const movieListRequest = await fetch("../films.json").then((response) =>
        response.json()
    );

    let movieMatch = movieListRequest.filter((movie) => {
        const regex = new RegExp(`^${searchMovie}`, "gi");
        return movie.title.match(regex);
    });

    if (searchMovie.length === 0) {
        movieMatch = [];
    }

    makeCardMovie(movieMatch);
};

movieSearch.addEventListener("input", () => {
    getMovieTitle(movieSearch.value);
});

// ФИЛЬТРАЦИЯ ПО ТЕГАМ

const tagFilter = (movie) => {
    const movieCards = document.querySelectorAll(".movie-card");
    const movieCardList = document.querySelector(".movie-card__list");
    const movieTag = document.querySelector(".movie-tag__item");

    const regMovie = new RegExp(
        `(?:^|[^a-zA-Zа-яА-ЯёЁ])(?:${movie.textContent})(?![a-zA-Zа-яА-ЯёЁ])`
    );

    if (movieCards.length !== 0) {
        movieCards.forEach((element) => {
            const movieCardTag = element.querySelector(".movie-card__title")
                .dataset.tag;

            movieCardList.removeChild(element);

            if (regMovie.test(movieCardTag)) {
                movieCardList.appendChild(element);
            }
        });
    }
};

// ДОБАВЛЕНИЕ В LocalStorage

const addMovieLocalStorage = (movie) => {
    localStorage.setItem(`${movie}`, movie);
};

const removeMovieLocalStorage = (movie) => {
    localStorage.removeItem(movie);
};

// СОЗДАНИЕ/УДАЛЕНИЕ КАРТОЧЕК И ДОБАВЛЕНИЕ/УДАЛЕНИЕ КЛАССА

tabWrapper.addEventListener("click", (event) => {
    const { target } = event;

    if (target.className === "movie-card__img") {
        const cardTitle = target.parentNode.querySelector(".movie-card__title")
            .textContent;
        if (cardTitle !== localStorage.getItem(cardTitle)) {
            addMovieLocalStorage(cardTitle);
            makeBookmarkCard();
        }
        if (target.dataset.img !== "active-star") {
            target.dataset.img = "active-star";
        } else {
            removeMovieLocalStorage(cardTitle);
            deleteBookMarkCard();
            target.dataset.img = "not-active-star";
        }
    } else {
        makeBookmarkCard();
    }
});

// СОЗДАНИЕ КАРТОЧЕК C ФИЛЬМАМИ

const movieCardList = document.querySelector(".movie-card__list");

export const makeCardMovie = (movies) => {
    const movieCardHtml = movies.map((card) => {
        let activeStarOrNot = localStorage.getItem(card.title)
            ? "active-star"
            : "not-active-star";

        return `<li class="movie-card">
						<span class="movie-card__title" data-tag="${card.tags}">${card.title}</span>
						<span class="movie-card__img" data-img="${activeStarOrNot}"></span>
				</li>`;
    });

    movieCardList.innerHTML = movieCardHtml.join("");
};

// СОЗДАНИЕ И УДАЛЕНИЕ КАРТОЧЕК В ЗАКЛАДКАХ

const bookmarkList = document.querySelector(".bookmark__list");

const makeBookmarkCard = () => {
    let bookmarkMovieList = [];
    let keys = Object.keys(localStorage);

    for (let key of keys) {
        let bookmarkItem = `<li class="movie-card">
				<span class="movie-card__title">${key}</span>
				<span class="movie-card__img" data-img="active-star"></span>`;

        bookmarkMovieList.push(bookmarkItem);
    }

    bookmarkList.innerHTML = bookmarkMovieList.join("");
};

const deleteBookMarkCard = () => {
    makeBookmarkCard();
};
