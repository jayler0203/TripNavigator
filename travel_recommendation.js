const searchInput = document.getElementById("search_input");
const clearBtn = document.getElementById("clear_btn");
const search_btn = document.getElementById("search_btn");

searchInput.addEventListener("input", () => {
  clearBtn.classList.toggle("hidden", !searchInput.value);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.classList.add("hidden");
});

const fetchData = async () => {
  const url = "./travel_recommendation_api.json";
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};
const searchCondition = async () => {
  const pluralMap = {
    country: "countries",
    temple: "temples",
    beach: "beaches",
  };
  const input = searchInput.value.trim().toLowerCase();
  const travelData = await fetchData();
  const key = pluralMap[input] || input;
  console.log(input);
  const searchResults = travelData[key];
  console.log(searchResults);
  generateHtmlResult(searchResults, key);
};
search_btn.addEventListener("click", () => {
  searchCondition();
});
generateHtmlResult = (searchResults, key) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  if (searchResults) {
    let results = [];
    if (key === "countries") {
      results = searchResults.flatMap((country) => country.cities);
    } else {
      results = searchResults;
    }
    results.forEach((resultElement) => {
      const cardResult = document.createElement("div");
      cardResult.classList.add("card_result");
      cardResult.innerHTML = `
    <img src="${resultElement.imageUrl}" alt="${resultElement.name}" />
    <div class="info_card">
      <h3>${resultElement.name}</h3>
      <p>${resultElement.description}</p>
      <button>Visit</button>
    </div>`;

      resultDiv.appendChild(cardResult);
    });
  } else {
    resultDiv.innerHTML = "Condition not found.";
  }
};
calculateLocalTime = (country) => {
  const timezones = {
    Australia: "Australia/Sydney",
    Japan: "Asia/Tokyo",
    Brazil: "America/Sao_Paulo",
  };

  const timeZone = timezones[country];
  const options = {
    timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const countryTime = new Date().toLocaleTimeString("en-US", options);
  console.log(`Current time in ${country}: ${countryTime}`);
};
calculateLocalTime("Japan");
