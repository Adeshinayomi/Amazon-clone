import { getProduct,loadProducts } from "../data/products.js";
import { orders } from "../data/order.js";
import { cart,calculateCartQuantity } from "../data/cart.js";
import { getDeliveryOption,calculateDeliveeryDate,todayDate } from "../data/deliveryOption.js";
import { renderProductgrid } from "./amazon.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

loadProducts(loadTracking);
function loadTracking(){
  let html=""
  updateCartQuantity()
  const url=new URL(window.location.href);
  const orderId=url.searchParams.get('orderId')
  const productId=url.searchParams.get('productId');
  console.log(orderId);
  console.log(productId);

  const matchingProduct=getProduct(productId);
  let dateString=''
  let Deliverydaystring=''
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      const deliveryOptionId =cartItem.deliveryOptionId;
  
      const deliveryOption= getDeliveryOption(deliveryOptionId)
      
     const dateObject = calculateDeliveeryDate(deliveryOption) 
      dateString=dateObject.dateString    
      Deliverydaystring=dateObject.daystring
    }
  })

  function getQuanity(){
    let orderQuanity=''
    orders.forEach(order => {

      if(order.id === orderId){
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
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
      </div>
  `

  document.querySelector('.main').innerHTML=html
  const currentdate=todayDate()
  let progress=''
  orders.forEach((order)=>{
    if(order.id === orderId){
      const orderTime=order.orderTime
      const time=dayjs(orderTime).format('D')
         
       progress=(Number(currentdate)-Number(time))/(Number(Deliverydaystring)-Number(time))
       const widte=Math.floor(progress*100)
       
       document.querySelector('.js-progress-bar').style=`width:${widte}%`

       if(widte>= 0 && widte <=49){
        document.querySelectorAll('.progress-label').forEach((label)=>{
          if(label.textContent.includes('Preparing')){
            label.classList.add('current-status')
          }
        })
       }else if(widte>=50 && widte <=99){
        document.querySelectorAll('.progress-label').forEach((label)=>{
          if(label.textContent.includes('Shipped')){
            label.classList.add('current-status')
          }
        })
       }else if(widte>=100){
        document.querySelectorAll('.progress-label').forEach((label)=>{
          if(label.textContent.includes('Delivered')){
            label.classList.add('current-status')
          }
        })
       }
    }
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
