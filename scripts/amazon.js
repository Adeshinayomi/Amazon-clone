import {cart, addToCart,calculateCartQuantity} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
 function  getSearchProduct(){
  let fetchSearchProduct=''
  const url=new URL(window.location.href);
  const search=url.searchParams.get('search')
  const searchCase=search
  
  if(searchCase){
   fetchSearchProduct=products.filter((product)=>{
    return product.keywords.includes(searchCase.toLowerCase()) || product.name.toLowerCase().includes(searchCase.toLowerCase())
   }) 
  }
    return fetchSearchProduct
}
loadProducts(renderProductgrid)
export function renderProductgrid(){
  let fetchProduct=products
  let productHtml=''
  updateCartQuantity();

  if(getSearchProduct()=== ''){
    fetchProduct = products
  }else{
    fetchProduct = getSearchProduct()
  }
fetchProduct.forEach((product)=>{
  productHtml+= `    
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
             ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;
// console.log(productHtml)
})


  function updateCartQuantity(){
   let cartQuantity= calculateCartQuantity();
    
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity
  }

document.querySelector('.js-product-grid').innerHTML=productHtml

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
button.addEventListener('click',()=>{
  const productId= button.dataset.productId;

  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added')

 const removeClass= setTimeout(()=>{
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added') 
  },2000);
  
  function stopRemoveClass(){
    clearTimeout(removeClass)
  }
  
  const productQuantity=document.querySelector(`.js-quantity-selector-${productId}`).value;

  addToCart(productId,productQuantity)
  updateCartQuantity();

})
})

document.querySelector('.js-search-btn').addEventListener('click',()=>{
  const search=document.querySelector('.js-search-bar').value
  window.location=`amazon.html?search=${search}`
  renderProductgrid()
})
}