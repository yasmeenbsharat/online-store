document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
}

const categoriesList = document.getElementById("list");
const ProductsOfCategory = document.getElementById("ProductsOfCategory");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
let searchTerm;
let currentProducts;

function initApp() {

    getAllCategories();
    getProductsOfCategory('All');

}


async function getAllCategories() {
    const request = await fetch('https://dummyjson.com/products/categories');
    const categories = await request.json();
    console.log(categories);
    displayCategories(categories);
}


function displayCategories(categories) {
    let result = '';
    categories.map((category, index) => {
        result += `
     <li class="list-group-item py-2 text-info fs-6">
     <a class="text-reset" onclick="getProductsOfCategory(${index})">${category}</a>
   </li>
     ` });
    categoriesList.innerHTML = result;
}


async function getProductsOfCategory(index) {
    let request;
    if (index == 'All') {
        request = await fetch('https://dummyjson.com/products');
    } else {
        let currentCategory = categories[index];
        request = await fetch(`https://dummyjson.com/products/category/${currentCategory}`);
    } let products = await request.json();
    currentProducts = products.products;
    displayProductsOfCategory(currentProducts);
}

function displayProductsOfCategory(products) {
    let data = ``;
    products.map((product) => {
        data += `
        <div class="Product col-md-4" >
    <div class="Product-img position-relative overflow-hidden border-1 border-info  rounded-3">
        <img src="${product.images[0]}" class="w-100" alt="popular4">
        <i class="fa-regular fa-heart text-info position-absolute "></i>
        <a  class="bg-info text-light  position-absolute ">Add to cart </a>
    </div>
    <div class="caption" >
        <a href="pages/productDetails.html?id=${product.id}" class="text-info fs-4" >${product.title}</a>
        <p  class="text-info">${product.price} $</p>
        
    </div>
 </div>
    ` });
    ProductsOfCategory.innerHTML = data;
}

searchInput.addEventListener('input', function () {
    searchTerm = searchInput.value;
});

let debounceTimeout;
searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function () {
        getProduct(searchTerm);
    }, 500);
});

function getProduct(searchTerm) {
    const searchResult = currentProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    displayProductsOfCategory(searchResult);
    searchInput.value = '';
}
initApp();