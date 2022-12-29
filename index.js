const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
let nameCountry = [];

async function fetchPays(btn) {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => response.json())
    .then((data) => (nameCountry = data));

  console.log(nameCountry);

  countriesContainer.innerHTML = nameCountry
    .filter((country) =>
      country.translations.fra.common
        .toUpperCase()
        .includes(inputSearch.value.toUpperCase())
    )
    .sort((a, b) => {
      let aCountry = a.translations.fra.common;
      let bCountry = b.translations.fra.common;

      if (btn == "alphabet") {
        for (i = 0; i < 250; i++) {
          if (
            aCountry.localeCompare(bCountry) < bCountry.localeCompare(aCountry)
          ) {
            return -1;
          }
          return 1;
        }
      } else if (btn === "decroissant") {
        return b.population - a.population;
      }
      return a.population - b.population;
    })
    .slice(0, inputRange.value)
    .map(
      (country) => `
      <div class="card">
      <img src="${country.flags.png}"></img>
      <h2>${country.translations.fra.common}</h2>
      <br>
      <h4>Capital : ${country.capital}</h4>
      <br>
      <p>Population : ${country.population.toLocaleString()}</p>
      </div>
      `
    )
    .join("");
}

inputSearch.addEventListener("input", (e) => {
  fetchPays(e.target.value);
});

inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = e.target.value;
  fetchPays(e.target.value);
});

minToMax.addEventListener("click", () => {
  fetchPays("croissant");
});

maxToMin.addEventListener("click", () => {
  fetchPays("decroissant");
});

alpha.addEventListener("click", () => {
  fetchPays("alphabet");
});

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

// ------------------------------------
// countriesContainer.innerHTML = monTableau
// .filter((country) => country.nomdupays.includes(inputSearch.value))
// .sort((a,b) => {
//     if (...) {
//         return ...
//     } else if (..) {
//         return ..
//     }
// })
// .slice(0, inputValue)
// .map((country) => `
// <div class="card">
// </div>
// `)

// ----------------------------------------
