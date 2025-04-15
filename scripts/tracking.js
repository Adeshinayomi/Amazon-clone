import { getProduct,loadProducts } from "../data/products.js";
import { orders } from "../data/order.js";
import { cart } from "../data/cart.js";
import { getDeliveryOption,calculateDeliveeryDate } from "../data/deliveryOption.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
loadProducts(loadTracking);
function loadTracking(){
  let html=""
  const url=new URL(window.location.href);
  const orderId=url.searchParams.get('orderId')
  const productId=url.searchParams.get('productId');
  console.log(orderId);
  console.log(productId);

  const matchingProduct=getProduct(productId);
  let dateString=''
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      const deliveryOptionId =cartItem.deliveryOptionId;
  
      const deliveryOption= getDeliveryOption(deliveryOptionId)
      
      dateString = calculateDeliveeryDate(deliveryOption)     
    }
  })

  function getQuanity(){
    let orderQuanity=''
    orders.forEach(order => {

      if(order.id === orderId){
        const orderTime=order.orderTime
        const time=dayjs(orderTime).format('')
           
        console.log(time)
        const orderproducts=order.products
        orderproducts.forEach((product)=>{
          if(product.productId === productId){
            orderQuanity = product.quantity
          }
        })
      }
    });
    return orderQuanity
  }

  const orderQuanity= getQuanity()

  html+=`
          <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity:${orderQuanity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `

  document.querySelector('.main').innerHTML=html
}