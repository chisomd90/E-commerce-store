const API_URL = "https://dummyjson.com/products?limit=20";
const SEARCH_API = 'https://dummyjson.com/products/search?q=';

const product = document.querySelector("#product");
const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const hiddenSearch = document.querySelector("#hidden-search");
const span = document.querySelector("#hidden-search span");
const empty = document.querySelector("#empty");

//make an api request to the api
const getProducts = async (url) => {
  empty.style.display = "none";
  product.innerHTML = "";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (data.products.length > 0) {
    displayProducts(data.products);
  } else {
    empty.style.display = "block";
  }
};
getProducts(API_URL);

//display products
function displayProducts(prod) {
  product.innerHTML = "";
  prod.forEach((products) => {
    const { price, thumbnail, title, availabilityStatus } = products;

    const productDiv = document.createElement("div");
    productDiv.className = " w-[300px] rounded-lg bg-[white]";

    productDiv.innerHTML = `
        <img src="${thumbnail}" alt="${title}"/>
        <div class="p-5">
          <h1 class= "text-red-300">${title}</h1>
          <p>${price}</p>
          <p>${availabilityStatus}</p>
        </div>
        `;

    product.appendChild(productDiv);
  });
}

function availabilityStat(status) {
  if (status === "In Stock") {
    return "text-[green]";
  } else {
    return "red";
  }
}

// work on search function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim();

  if (searchValue) {
    span.textContent = searchValue;
    hiddenSearch.style.display = "block";
    getProducts(SEARCH_API + searchValue);
    searchInput.value = "";
  }
});
