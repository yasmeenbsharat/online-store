const categoriesList=document.getElementById("list");
const ProductsOfCategory=document.getElementById("ProductsOfCategory");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
let currentCategory ;
let categories =[];
let searchTerm;
let currentProducts;
document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
  }
async function getAllCategories(){
        const request = await fetch('https://dummyjson.com/products/categories');
        categories  = await request.json();
        // console.log(request)
        // console.log("yes");
        console.log(categories);
        displayCategories(categories);
        getProductsOfCategory(-1);
}

function displayCategories(categories){
    let result='';
    categories.map((category,index)=>{
     result+=`
     <li class="list-group-item py-2 text-info fs-6">
     <a class="text-reset" onclick="getProductsOfCategory(${index})">${category}</a>
   </li>
     `
    });
    categoriesList.innerHTML=result;
    


}

async function getProductsOfCategory(index){
  
    let request; 
    if(index==-1){
        request  = await fetch('https://dummyjson.com/products');
    }else{
   currentCategory=categories[index];
   request  = await fetch(`https://dummyjson.com/products/category/${currentCategory}`);}
    let products = await request.json();
    currentProducts=products.products;
   console.log(request);
   console.log("yes");
   console.log(products);
   displayProductsOfCategory(currentProducts);
}

function displayProductsOfCategory(products){
    let data=``;
    console.log(products);
    products.map((product)=>{
        data+=`
        <div class="Product col-md-4" >
    <div class="Product-img position-relative overflow-hidden border-1 border-info ">
        <img src="${product.images[0]}" class="w-100" alt="popular4">
        <i class="fa-regular fa-heart text-info position-absolute "></i>
        <a href="#" class="bg-info text-light  position-absolute ">Add to cart </a>
    </div>
    <div class="caption" >
        <a href="" class="text-info fs-4" onclick=" ">${product.title} </a>
        <p  class="text-info ">${product.price} $</p>
    </div>
 </div>
        `
       });
 

       ProductsOfCategory.innerHTML=data;
}

function initApp(){

    getAllCategories(); 
   
}


searchInput.addEventListener('input', function () {
    searchTerm = searchInput.value;
  
});
let debounceTimeout;
// searchButton.addEventListener('click', function (e) {
//         e.preventDefault();
//         console.log(products);
//         clearTimeout(debounceTimeout);
//         debounceTimeout = setTimeout(function () {
//             console.log(searchTerm);
//             console.log (currentCategory);
//            getProduct(searchTerm);
//         }, 500);
       
//     });
//  function getProduct(searchTerm){
//     const searchResult = products.products.filter(product => product.title.toLowerCase().includes(searchTerm));
//     console.log(searchResult);
//     displayProductsOfCategory(searchResult);
//  }

 //--------------------------
 searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function () {
        console.log(searchTerm);
        console.log(currentCategory);
        getProduct(searchTerm);
    }, 500);
});

function getProduct(searchTerm) {
    const searchResult = currentProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(searchResult);
    displayProductsOfCategory(searchResult);
}


initApp();