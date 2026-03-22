const container = document.getElementById("mealsContainer");

async function loadRandom() {
    container.innerHTML = "Loading...";

    const requests = [];

    for (let i = 0; i < 14; i++) {
        requests.push(fetch("https://www.themealdb.com/api/json/v1/1/random.php"));
    }

    const responses = await Promise.all(requests);

    const results = [];
    for (const res of responses) {
        const data = await res.json();
        results.push(data);
    }

    container.innerHTML = "";

    for (const res of results) {
        addMealCard(res.meals[0]);
    }
}

function addMealCard(meal) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `<img src="${meal.strMealThumb}"><h3>${meal.strMeal}</h3>`;

    div.onclick = () => showDetails(meal);

    container.appendChild(div);
}


async function searchMeals() {
    const query = document.getElementById("searchInput").value;

    if (!query) return;

    container.innerHTML = "Search...";

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    displayMeals(data.meals);
}


function displayMeals(meals) {
    container.innerHTML = "";

    if (!meals) {
        container.innerHTML = "<p>Not found</p>";
        return;
    }

    for (const element of meals) {
        addMealCard(element)
    }
}

loadRandom();

