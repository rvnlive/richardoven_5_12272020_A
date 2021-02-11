// Load, Modify or Clear the Cart
const cart = []
const newProduct = {}
const localCart = window.localStorage.getItem('Cart')

// Only show the Cart page if there is an item within the cart
// otherwise send customer back onto the Products page
function loadCart () {
  if (window.location.href.indexOf('/cart/index.html') !== -1 && window.localStorage.getItem('Cart') === null) {
    window.alert('Your cart is empty. Select an item and add it to you cart.')
    document.location = '../../index.html'
  }
}
loadCart()
// Check for the number of items added to the cart
// and show it on the NavBar Cart icon
function onLoadItemNumber () {
  const itemNumbers = window.localStorage.getItem('allQuantity')
  if (itemNumbers) {
    document.querySelector('#cart span').textContent = itemNumbers
  }
}
onLoadItemNumber()

// Lets create the Cart page and load the items from localStorage
// Add First item to cart
export function addToCart (product) {
  const existingProduct = cart.find((product) => {
    return cart.lens === product.lensValue
  })
  if ((localCart === null) || (localCart !== null)) {
    if (existingProduct) {
      existingProduct.quantity++
    } else {
      cart.push(product)
    }
  }
  saveCart()
  console.log(product)
}

// Save cart to local Storage
function saveCart () {
  window.localStorage.setItem('Cart', JSON.stringify(cart))
}

export function setItem (product) {
  const newProduct = cart.find((product) => {
    return cart.lens !== product.lensValue
  })
  if (localCart !== null) {
    let cart = localCart
    cart = JSON.parse(cart)
    cart.push(product)
    saveCart()
  }
}
// Keep Cart and Reuse Cart after page load
// if (localCart) {
//   cart = JSON.parse(localCart)
// } else {
//   cart = []
// }
// window.localStorage.setItem('Cart', JSON.stringify(localCart))
// const data = JSON.parse(window.localStorage.getItem('Cart'))

function removeSingleItem () {

}
// removeSingleItem()

// Clear the cart completely
const removeAllItemsButton = document.getElementById('remove-all-items')
function removeAllItemsFromCart () {
  if (window.location.href.indexOf('/cart/index.html') !== -1) {
    removeAllItemsButton.addEventListener('click', (event) => {
      window.localStorage.clear()
      window.alert('You successfully emptied your cart. Please select an item and add it to your cart.')
      document.location = '../../index.html'
    })
  }
}
removeAllItemsFromCart()

if (window.location.href.indexOf('/cart/index.html') !== -1) {
  function listCartItems () {
    let cartItems = localCart
    cartItems = JSON.parse(cartItems)
    if (cartItems) {
      document.getElementById('loading-spinner').style.display = 'none'
    }
    // Section to merge all product rows
    const cartItemsSection = document.getElementById('cart-items')
    // Lets list all items from Local Storage
    cartItems.forEach((product, index) => {
      const cameraId = product._id
      const cameraName = product.name
      const cameraImage = product.image
      const cameraPrice = product.price
      const beautyCameraPrice = cameraPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
      const quantity = product.quantity
      const lensValue = product.lens
      const totalItemPrice = quantity * cameraPrice
      const beautyItemPrice = totalItemPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
      const totalPrice = quantity * (quantity * cameraPrice)
      const beautyTotalPrice = totalItemPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })

      // First create a row for each of the Cart Items
      const cartItemsRow = document.createElement('div')
      cartItemsRow.setAttribute('id', 'product-row')
      cartItemsRow.setAttribute('class', 'row w-100 align-items-center border rounded shadow-lg mb-2')
      cartItemsSection.appendChild(cartItemsRow)

      // How the ROW made: Image, Details(Name, VariationID), Quantity, Total Price(Quantity*Price), Remove Item
      // Image Column
      const listedProductImageCol = document.createElement('div')
      listedProductImageCol.setAttribute('class', 'col')
      // Product Image
      const listedProductImage = document.createElement('img')
      listedProductImage.setAttribute('id', 'product-image')
      listedProductImage.setAttribute('class', 'img-thumbnail w-50 mt-2 mb-2 w-25')
      listedProductImage.setAttribute('alt', 'Image of an old ' + cameraName)
      listedProductImage.src = cameraImage
      // Merge Image with Column
      listedProductImageCol.appendChild(listedProductImage)
      // Merge Image Column with Row
      cartItemsRow.appendChild(listedProductImageCol)

      // Name and Variation ID Column
      const listedProductDetailsCol = document.createElement('div')
      listedProductDetailsCol.setAttribute('class', 'col mt-3')
      // Merge Name and Variation ID Column with Row
      cartItemsRow.appendChild(listedProductDetailsCol)
      // Product Name
      const listedProductName = document.createElement('h5')
      listedProductName.setAttribute('id', 'product-name')
      listedProductName.setAttribute('class', 'text-center')
      listedProductName.textContent = cameraName
      // Merge Name with Name and Variation ID Column
      listedProductDetailsCol.appendChild(listedProductName)
      // Product Variation ID
      const listedProductVariation = document.createElement('p')
      listedProductVariation.setAttribute('id', 'product-variation')
      listedProductVariation.setAttribute('data-toggle', 'tooltip')
      listedProductVariation.setAttribute('data-placement', 'right')
      listedProductVariation.setAttribute('title', 'Unique ID contains the ProductID and the lens size chosen (last 2 digits)')
      listedProductVariation.setAttribute('data-toggle', 'tooltip')
      listedProductVariation.setAttribute('class', 'text-center font-italic')
      listedProductVariation.textContent = lensValue
      listedProductVariation.addEventListener('click', (event) => {
        document.location.href = '../../pages/product.html?id=' + cameraId
      })
      // Merge Variation with Name and Variation ID Column
      listedProductDetailsCol.appendChild(listedProductVariation)

      // Product Quantity Column
      const listedProductQuantityCol = document.createElement('div')
      listedProductQuantityCol.setAttribute('class', 'col')
      // Merge Name and Variation ID Column with Row
      cartItemsRow.appendChild(listedProductQuantityCol)
      // Product Quantity
      const listedProductQuantity = document.createElement('input')
      listedProductQuantity.setAttribute('id', 'product-quantity')
      listedProductQuantity.setAttribute('type', 'number')
      listedProductQuantity.setAttribute('min', '1')
      listedProductQuantity.setAttribute('class', 'form-control align-middle text-center w-50 float-right')
      listedProductQuantity.setAttribute('value', quantity)

      // Merge Product Quantity with Product Quantity Column
      listedProductQuantityCol.appendChild(listedProductQuantity)

      // Product Price Column
      const listedProductPriceCol = document.createElement('div')
      listedProductPriceCol.setAttribute('class', 'col mt-2')
      // Merge Product Price Column with Row
      cartItemsRow.appendChild(listedProductPriceCol)
      // Product Price (Sum of Single Product - Quantity * Price)
      const listedProductPrice = document.createElement('h5')
      listedProductPrice.setAttribute('id', 'product-price')
      listedProductPrice.setAttribute('class', 'btn btn-md rounded btn-info float-right')
      listedProductPrice.setAttribute('data-toggle', 'popover')
      listedProductPrice.setAttribute('data-trigger', 'focus')
      listedProductPrice.setAttribute('tabindex', '0')
      listedProductPrice.setAttribute('title', 'Price calculated:')
      listedProductPrice.setAttribute('data-content', 'Quantity *' + ` ${beautyCameraPrice}`)
      listedProductPrice.textContent = beautyItemPrice
      // Bootstrap Function for Popover
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
      // Merge Product Price with Product Price Column
      listedProductPriceCol.appendChild(listedProductPrice)

      // Remove Single Item Column
      const removeSingleItemCol = document.createElement('div')
      removeSingleItemCol.setAttribute('class', 'col')
      // Remove Single Item button
      const removeSingleItem = document.createElement('button')
      removeSingleItem.setAttribute('id', 'remove-single-item')
      removeSingleItem.setAttribute('class', 'btn btn-danger float-right mr-4')
      removeSingleItem.setAttribute('onclick', 'removeSingleItem()')
      removeSingleItem.textContent = 'Remove item'
      // Merge Remove Single Item button with Remove Single Item Column
      removeSingleItemCol.appendChild(removeSingleItem)
      // Merge Product Price Column with Row
      cartItemsRow.appendChild(removeSingleItemCol)
    })
  }
  listCartItems()
}
