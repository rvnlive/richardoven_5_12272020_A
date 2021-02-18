// Load, Modify or Clear the Cart
/// /////////////////////////////
let cart = []

// Save Cart
function saveCart () {
  window.localStorage.setItem('Cart', JSON.stringify(cart))
}
// Add item to cart
export function addToCart (product) {
  cart.push(product)
  saveCart()
  document.location.reload()
  // console.log(cart)
}
// Load existing Cart on Page load
function loadCart () {
  cart = JSON.parse(window.localStorage.getItem('Cart'))
}
if (window.localStorage.getItem('Cart') != null) {
  loadCart()
}

// Check for the number of items added to the cart
// and show it on the NavBar Cart icon
const itemNumbers = cart.length
if (itemNumbers) {
  document.querySelector('#cart span').textContent = itemNumbers
}
// Only show the Cart page if there is an item within the cart
// otherwise send customer back onto the Products page
if (window.location.href.indexOf('/cart/index.html') !== -1 && window.localStorage.getItem('Cart') === null) {
  window.alert('Your cart is empty. Select an item and add it to you cart.')
  document.location = '../../index.html'
}

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
  const groupByLensValue = cart.reduce((product, value) => {
    product[value.lens] = product[value.lens] + 1 || 1
    return product
  }, {})
  // console.log(groupByLensValue)

  function listCartItems () {
    let cartItems = window.localStorage.getItem('Cart')
    cartItems = JSON.parse(cartItems)
    if (cartItems) {
      document.getElementById('loading-spinner').style.display = 'none'
      document.getElementById('cart').style.display = 'none'
    }
    // Products are being duplicated in our Cart array,
    // so lets get rid of the duplicates on our Cart Listing page
    const reducedCartItems = cartItems.reduce((x, y) => x.findIndex(product => product.lens === y.lens) < 0 ? [...x, y] : x, [])

    // Remove a single item (even if its added multiple times) from our Cart array
    function removeSingleItemFunction () {
      cartItems.filter((v, i, a) => a.findIndex(product => (product.lensValue === v.lensValue)) === i)
    }
    // Section to merge all product rows
    const cartItemsSection = document.getElementById('cart-items')
    // Lets list all items from the previously Reduced Local Storage Cart
    reducedCartItems.forEach((product, index) => {
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
      const lensValue = product.lens
      // console.log(lensValue.length)
      const quantity = groupByLensValue[lensValue]
      // console.log(totalCartQuantity)

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
      listedProductImage.setAttribute('class', 'img-thumbnail w-75 mt-2 mb-2')
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
      const listedProductName = document.createElement('h6')
      listedProductName.setAttribute('id', 'product-name')
      listedProductName.setAttribute('class', 'text-center font-weight-bold text-uppercase')
      listedProductName.textContent = cameraName + ' with ' + lensValue[25] + lensValue[26] + 'mm lenses'
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
        window.location.href = '../../pages/product.html?id=' + cameraId + '&value=' + lensValue
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
      listedProductPrice.setAttribute('tabIndex', '0')
      listedProductPrice.setAttribute('title', 'Price calculated:')
      listedProductPrice.setAttribute('data-content', 'Quantity: ' + '(' + quantity + ')' + ` * ${beautyCameraPrice}`)
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
      // Remove a single item of the cart
      // removeSingleItem.addEventListener('click', removeSingleItemFunction)

      removeSingleItem.textContent = 'Remove item'
      // Merge Remove Single Item button with Remove Single Item Column
      removeSingleItemCol.appendChild(removeSingleItem)
      // Merge Product Price Column with Row
      cartItemsRow.appendChild(removeSingleItemCol)
    })
  }
  listCartItems()
}
