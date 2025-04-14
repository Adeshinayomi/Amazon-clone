import {cart, removeFromCart,updateDeliveryOption,calculateCartQuantity,updateCartQuantity2} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {deliveryOptions ,getDeliveryOption,calculateDeliveeryDate} from '../../data/deliveryOption.js'
import { renderPaymentSummary } from "./paymentSummary.js";


console.log('okay')

export function renderOrderSummary(){
  function updateCartQuantity(){
    let cartQuantity=calculateCartQuantity()
    document.querySelector('.js-display-cartquantity').innerHTML=cartQuantity;
  }
  updateCartQuantity()

let cartSummary='';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  console.log(cartItem)
 const matchingProducts= getProduct(productId)
 console.log(matchingProducts)

  const deliveryOptionId =cartItem.deliveryOptionId;

  const deliveryOption= getDeliveryOption(deliveryOptionId)
  
   const dateString = calculateDeliveeryDate(deliveryOption)

 cartSummary+= `
            <div class="cart-item-container js-cart-item-container js-cart-item-${matchingProducts.id}">
            <div class="delivery-date">
              Delivery date:${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProducts.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProducts.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProducts.id}">
                    Update
                  </span>
                  <input type="text" class="quantity-input js-quantity-input-${matchingProducts.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link"  data-product-id="${matchingProducts.id}">save</span>
                  <span class="delete-quantity-link js-delete-link-${matchingProducts.id} link-primary js-delete-link" data-product-id="${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProducts,cartItem)}
              </div>
            </div>
          </div>
  `
})


function deliveryOptionsHtml(matchingProducts,cartItem){
  let html = ""
  deliveryOptions.forEach((deliveryOption)=>{
  const dateString=calculateDeliveeryDate(deliveryOption)

    const priceString= deliveryOption.priceCents === 0? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)}- Shipping`
    const isChecked= deliveryOption.id === cartItem.deliveryOptionId
    html+=`     
     <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProducts.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
     </div>
    `
  })
  return html
}

document.querySelector('.js-order-summary').innerHTML=cartSummary


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
   renderOrderSummary()
   renderPaymentSummary();
  })
})

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
   const productId= link.dataset.productId
   removeFromCart(productId)
   renderOrderSummary()
  //  const conatainer= document.querySelector(`.js-cart-item-${productId}`)
   
  //  conatainer.remove()
   updateCartQuantity()

   renderPaymentSummary();
  })
})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary()
    renderPaymentSummary()
    
  })
})

}
