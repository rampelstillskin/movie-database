// ДОБАВЛЕНИЕ В LocalStorage

export const addMovieLocalStorage = movie => {
	localStorage.setItem(`${movie}`, movie);
};

export const removeMovieLocalStorage = movie => {
	localStorage.removeItem(movie);
};

const tabWrapper = document.querySelector(".tab__wrapper");
tabWrapper.addEventListener("click", event => {
	const target = event.target;

	if (target.className === "movie-card__img") {
		if (target.dataset.img === "active-star") {
			target.dataset.img = "not-active-star";
		} else {
			target.dataset.img = "active-star";
		}
	}
	if (target.className === "movie-card__img") {
		const tar = target.parentNode.querySelector(".movie-card__title")
			.textContent;

		if (tar !== localStorage.getItem(tar)) {
			addMovieLocalStorage(tar);
			makeBookmarkCard();
		} else {
			removeMovieLocalStorage(tar);
			deleteBookMarkCard();
		}
	} else {
		makeBookmarkCard();
	}
});

// СОЗДАНИЕ КАРТОЧЕК C ФИЛЬМАМИ

const movieCardList = document.querySelector(".movie-card__list");

export const makeCardMovie = movies => {
	const movieCardHtml = movies.map(card => {
		let activeStarOrNot = localStorage.getItem(card.title)
			? "active-star"
			: "not-active-star";

		return `<li class="movie-card">
			<span class="movie-card__title">${card.title}</span>
			<span class="movie-card__img" data-img="${activeStarOrNot}"></span>
		</li>`;
	});

	movieCardList.innerHTML = movieCardHtml.join("");
};

// movieCardList.addEventListener("click", event => {
// 	const target = event.target;

// 	if (target.className === "movie-card__img") {
// 		if (target.dataset.img === "active-star") {
// 			target.dataset.img = "not-active-star";
// 		} else {
// 			target.dataset.img = "active-star";
// 		}
// 	}
// });

// СОЗДАНИЕ И УДАЛЕНИЕ КАРТОЧЕК В ЗАКЛАДКАХ

const bookmarkList = document.querySelector(".bookmark__list");

const makeBookmarkCard = () => {
	let bookmarkMovieList = [];

	for (let i = 0; i < localStorage.length; i++) {
		let bookmarkItem = `<li class="movie-card">
				<span class="movie-card__title">${localStorage.key(i)}</span>
				<span class="movie-card__img" data-img="active-star"></span>`;

		bookmarkMovieList.push(bookmarkItem);
	}

	bookmarkList.innerHTML = bookmarkMovieList.join("");
};

const deleteBookMarkCard = () => {
	makeBookmarkCard();
};

// РЕАЛИЗАЦИЯ ХОВЕРА НА КАРТЧОКАХ

movieCardList.addEventListener("mouseover", event => {
	const target = event.target;

	if (target.tagName === "LI" || target.className === "movie-card__title") {
		if (target.className === "movie-card__title") {
			const targetParent = target.parentNode;
			targetParent.style.backgroundColor = "gray";
		}
		target.style.backgroundColor = "gray";
	}
});

movieCardList.addEventListener("mouseout", event => {
	const target = event.target;

	target.style.backgroundColor = "";
});

// РЕАЛИЗАЦИЯ ХОВЕРА НА КАРТЧОКАХ В ЗАКЛАДКАХ

bookmarkList.addEventListener("mouseover", event => {
	const target = event.target;

	if (target.tagName === "LI" || target.className === "movie-card__title") {
		if (target.className === "movie-card__title") {
			const targetParent = target.parentNode;
			targetParent.style.backgroundColor = "gray";
		}
		target.style.backgroundColor = "gray";
	}
});

bookmarkList.addEventListener("mouseout", event => {
	const target = event.target;

	target.style.backgroundColor = "";
});
