import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/car.js'
// import '../data/backend-pratice.js'

// renderOrderSummary();
// renderPaymentSummary();


// async function loadpage(){
//   try{
//     // throw 'error1'
    
//     await loadProductsFetch()
//     await loadCartFetch()
//   } catch(error){
//     console.log('Unexpected error.Please try again later.')
//   }


//   renderOrderSummary();
//   renderPaymentSummary(); 


// }
// loadpage();
Promise.all([
  loadProductsFetch(),
  loadCartFetch()
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary(); 
})
/*
  Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
      loadCart(()=>{
        resolve()
      })
    })

  ]).then((value)=>{
    console.log(value)
    renderOrderSummary();
    renderPaymentSummary(); 
  })

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve('value1')
//   })
// }).then((value)=>{
//   console.log(value)

//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve()
//     })
//   })
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary(); 
// })
/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary(); 
  })
})
*/