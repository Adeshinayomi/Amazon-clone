import {cart, removeFromCart,calculateCartQuantity,updateCartQuantity2} from "../data/cart.js";
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function updateCartQuantity(){
  let cartQuantity=calculateCartQuantity()
  document.querySelector('.js-display-cartquantity').innerHTML=cartQuantity;
}
document.body.onload=updateCartQuantity()

    
let cartSummary='';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  let matchingProducts;

  products.forEach((product)=>{
    if(product.id === productId){
      matchingProducts=product
    }
  })
  
  console.log(matchingProducts);

 cartSummary+= `
            <div class="cart-item-container js-cart-item-${matchingProducts.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProducts.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProducts.id}">
                    Update
                  </span>
                  <input type="text" class="quantity-input js-quantity-input-${matchingProducts.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link"  data-product-id="${matchingProducts.id}">save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
})
document.querySelector('.js-order-summary').innerHTML=cartSummary;

document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId
    const conatainer=document.querySelector(`.js-cart-item-${productId}`);
    conatainer.classList.add('is-editing-quantity');
  })
})
document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId
    const conatainer=document.querySelector(`.js-cart-item-${productId}`);
    conatainer.classList.remove('is-editing-quantity');
    const newQuantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    updateCartQuantity2(productId,newQuantity);
    updateCartQuantity();
  })
})
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
   const productId= link.dataset.productId
   removeFromCart(productId)
   const conatainer= document.querySelector(`.js-cart-item-${productId}`)
   
   conatainer.remove()
   updateCartQuantity()
  })

})