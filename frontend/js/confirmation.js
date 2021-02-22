// Confirmation.js is ONLY being used after Checkout in Cart
const orderId = window.sessionStorage.getItem('orderId')
let orderInfo = window.sessionStorage.getItem('orderInfo')
orderInfo = JSON.parse(orderInfo)
// Call the Customer on His/Her name
const customerFirstName = document.getElementById('customer-firstname')
customerFirstName.textContent = 'Dear ' + orderInfo.contact.firstName + ','

// Show OrderID
const orderConfirmWithId = document.getElementById('order-id')
orderConfirmWithId.textContent = 'Order ID: ' + orderId

// Brief details such as Total Product Quantity, Total Taxed Price
const totalQuantity = orderInfo.products.length
const totalTaxedPrice = orderInfo.totalPrice
// console.log(totalTaxedPrice)
const orderDetails = document.getElementById('order-details')
orderDetails.textContent = 'You\'ve paid a total of ' + totalTaxedPrice + ' (incl. tax) for ' + totalQuantity + ' products.'
