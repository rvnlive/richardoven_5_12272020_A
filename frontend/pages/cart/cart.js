// Load, Modify or Clear the Cart
/// /////////////////////////////
let cart = []

// Save Cart
function saveCart () {
  window.sessionStorage.setItem('Cart', JSON.stringify(cart))
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
  cart = JSON.parse(window.sessionStorage.getItem('Cart'))
}
if (window.sessionStorage.getItem('Cart') != null) {
  loadCart()
}

// Check for the number of items added to the cart
// and show it on the NavBar Cart icon
const itemNumbers = cart.length
if (itemNumbers) {
  document.querySelector('#cart span').textContent = itemNumbers
}

// The following code is only going to be loaded on the Cart page (/cart/index.html) if the cart IS empty
if ((window.location.href.indexOf('/cart/index.html') !== -1) && (window.sessionStorage.getItem('Cart') === null)) {
  document.getElementById('details-form').style.display = 'none'
  document.getElementById('order-table').style.display = 'none'
  // The following code is only going to be loaded on the Cart page (/cart/index.html) if the cart IS NOT empty
} else if ((window.location.href.indexOf('/cart/index.html') !== -1) && (window.sessionStorage.getItem('Cart') !== null)) {
  // Remove All items from Cart
  document.getElementById('remove-all').addEventListener('click', () => {
    window.sessionStorage.clear()
    window.location.reload()
  })
  function listCartItems () {
    let cartItems = window.sessionStorage.getItem('Cart')
    cartItems = JSON.parse(cartItems)
    if (cartItems) {
      document.getElementById('loading-spinner').style.display = 'none'
    }

    // Function for Total Cart Price
    function sum (cart) {
      let sum = 0
      for (let i = 0; i < cart.length; i++) { sum += cart[i].price }
      return sum
    }
    const totalCartPrice = sum(cartItems)
    // console.log(totalPrice)

    // Section to merge all product rows
    const cartItemsSection = document.getElementById('cart-items')
    // Lets list all items from the Local Storage Cart
    cartItems.forEach((product, index) => {
      const cameraName = product.name
      const cameraImage = product.image
      const cameraPrice = product.price
      const beautyItemPrice = cameraPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })

      // First create a row for each of the Cart Items
      const cartItemsRow = document.createElement('div')
      cartItemsRow.setAttribute('id', 'product-row')
      cartItemsRow.setAttribute('class', 'd-flex align-items-center border rounded shadow-lg mb-2')
      cartItemsSection.appendChild(cartItemsRow)

      // How the ROW made: Image, Details(Name), Total Price, Remove Item
      // Image Column
      const listedProductImageCol = document.createElement('div')
      listedProductImageCol.setAttribute('class', 'col')
      // Product Image
      const listedProductImage = document.createElement('img')
      listedProductImage.setAttribute('id', 'product-image')
      listedProductImage.setAttribute('class', 'img-thumbnail mt-2 mb-2')
      listedProductImage.setAttribute('width', '50%', 'height', '50%')
      listedProductImage.setAttribute('alt', 'Image of an old ' + cameraName)
      listedProductImage.src = cameraImage
      // Merge Image with Column
      listedProductImageCol.appendChild(listedProductImage)
      // Merge Image Column with Row
      cartItemsRow.appendChild(listedProductImageCol)

      // Name Column
      const listedProductDetailsCol = document.createElement('div')
      listedProductDetailsCol.setAttribute('class', 'col mt-3')
      // Merge Name Column with Row
      cartItemsRow.appendChild(listedProductDetailsCol)
      // Product Name
      const listedProductName = document.createElement('h6')
      listedProductName.setAttribute('id', 'product-name')
      listedProductName.setAttribute('class', 'text-center font-weight-bold text-uppercase')
      listedProductName.textContent = cameraName
      // Merge Name with Name Column
      listedProductDetailsCol.appendChild(listedProductName)

      // Product Price Column
      const listedProductPriceCol = document.createElement('div')
      listedProductPriceCol.setAttribute('class', 'col mt-2')
      // Merge Product Price Column with Row
      cartItemsRow.appendChild(listedProductPriceCol)
      // Product Price
      const listedProductPrice = document.createElement('h5')
      listedProductPrice.setAttribute('id', 'product-price')
      listedProductPrice.setAttribute('class', 'btn btn-md rounded btn-info float-right')
      listedProductPrice.textContent = beautyItemPrice
      // Merge Product Price with Product Price Column
      listedProductPriceCol.appendChild(listedProductPrice)
    })

    /// /////////////////////////////////////////////////////////////
    // Lets load the numbers into the Order Total
    //
    // Final Quantity
    const finalQuantity = document.getElementById('final-quantity')
    finalQuantity.textContent = cart.length + ' product(s)'
    //
    // Beautify Total Price - Currency Sign etc.
    const beautyTotalPrice = totalCartPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    // Load into HTML the Total Price excluding Tax
    const totalPrice = document.getElementById('total-price')
    totalPrice.textContent = beautyTotalPrice
    //
    // Tax the Total Price to get Final Price
    const taxedTotal = totalCartPrice + ((totalCartPrice / 100) * 7.25)
    // Beautify Taxed Total - Currency Sign etc.
    const beautyTaxedTotal = taxedTotal.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    window.sessionStorage.setItem('taxedTotal', beautyTaxedTotal)
    // Load into HTML the Price including Tax
    const taxedTotalPrice = document.getElementById('taxed-total')
    taxedTotalPrice.textContent = beautyTaxedTotal
  }
  listCartItems()
}
