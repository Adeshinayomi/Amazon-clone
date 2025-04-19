import { orders } from "../data/order.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct,loadProductsFetch,loadProducts} from "../data/products.js";
import { loadCartFetch,addToCart,cart,calculateCartQuantity } from "../data/cart.js";
import { getDeliveryOption,calculateDeliveeryDate} from "../data/deliveryOption.js";
import { renderProductgrid  } from "./amazon.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

console.log(orders)
loadProducts(loadOrder)
  function loadOrder(){
  let html=''
    updateCartQuantity()
    const dayplaced=orders[0].orderTime
    const dayOrderPlace=dayjs(dayplaced).format('MMMM D')
    const orderProducts=orders[0].products
    orderProducts.forEach((orderproduct)=>{
      const productId=orderproduct.productId
      let dateString=''
        cart.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            const deliveryOptionId =cartItem.deliveryOptionId;
        
            const deliveryOption= getDeliveryOption(deliveryOptionId)
            
           const dateObject= calculateDeliveeryDate(deliveryOption) 
           dateString=dateObject.dateString    
          }
        })

      const matchingProduct=getProduct(productId);
      html+=`
          <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayOrderPlace}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orders[0].totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${matchingProduct.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dateString}
            </div>
            <div class="product-quantity">
              Quantity: ${orderproduct.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message js-buy-again" data-product-id="${productId}" data-quantity-num="${orderproduct.quantity}">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${orders[0].id}&&productId=${productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      </div>
  `

  })

  document.querySelector('.orders-grid').innerHTML=html
  document.querySelectorAll('.js-buy-again').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      const productId=btn.dataset.productId
      const quantity=Number(btn.dataset.quantityNum)
      addToCart(productId,quantity)
    })
  })

}
  function updateCartQuantity(){
   let cartQuantity= calculateCartQuantity();
    
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity
  }
document.querySelector('.js-search-btn').addEventListener('click',()=>{
  const search=document.querySelector('.js-search-bar').value;
  window.location=`amazon.html?search=${search}`
  renderProductgrid()
})