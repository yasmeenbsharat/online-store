
let id;
document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  id = urlParams.get('id');
  getProductDetails(id);
});

async function getProductDetails() {
  const request = await fetch(`https://dummyjson.com/products/${id}`);
  const details = await request.json();
  displayProductDetails(details);
}

function displayProductDetails(details) {
  const productDetails = document.getElementById("productDetails");
  let data = ``;
  const discount = details.price * details.discountPercentage / 100;
  console.log(details);
  if (details != null) {
    data += `
    <div class ="product py-5 position-relative h-100" 
    style="background-image: url(${details.images[3]}); background-size: cover;"
   >
       <div class ="overlay">
           <div class ="container">
               <div class="row g-3">
                   <div class ="col-md-3 ">
                   <div class ="Product-img mt-5">
                   <img class ='w-100 h-100 mt-5 rounded-2' src= "${details.images[0]} " alt =" "/>
                   </div>
                   </div>
                   <div class ="col-md-9 mt-5  ps-4 text-white">
                        <div class="rate">
                       <h2 class ='mt-5 text-capitalize fw-7 fs-2'>${details.title}</h2>
                       <span>* Brand : ${details.brand} </span> 
                       <span class ='mt-3 ms-3 d-inline-block '> 
                       * Category : ${details.category}
                       </span>
                       <div class ="mt-3">
                       <span> * Price : ${details.price} $</span>   
                       <span  class ='ms-3 d-inline-block '> * Discount :${discount} $ </span> </div>
                      </div>
                       <div class ="">
                           <div class ="info mt-4 d-flex g-3">
                             <div class ="d-flex">
                             <span class ="circle  border-info text-info fs-6 rounded-circle  text-center  d-inline-block bg-light ">${details.rating}%</span>
                             <span class ='mt-3 ms-2 fs-5 '>rating</span> 
                             </div>
                             <div class ="icons d-flex mt-1 ms-5 gap-5 ">
                           
                             <div class ="icon m-0 rounded-circle bg-info text-center  d-inline-block ">
                             <i class="fa-solid fa-heart"></i>
                             </div>
                          
                             <div class ="icon rounded-circle bg-info text-center  d-inline-block">
                             <i class="fa-solid fa-star"></i>
                             </div>
             
                           </div>
                           </div>
                           </div>
             
                           <div class ="desc text-white">
                             <h4 class ='mt-4 overview text-capitalize'>description</h4>
                             <p class ='mt-2 '>${details.description}</p>
                           </div>                      
                       </div >
            </div>
           </div>              
       </div> 
          </div>
        ` }
  productDetails.innerHTML = data;
}