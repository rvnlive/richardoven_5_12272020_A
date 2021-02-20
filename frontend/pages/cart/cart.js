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

const orderInformation = {
  contact: {},
  products: []
}

if ((window.location.href.indexOf('/cart/index.html') !== -1) && (window.localStorage.getItem('Cart') === null)) {
  document.getElementById('details-form').style.display = 'none'
  document.getElementById('order-table').style.display = 'none'
} else if ((window.location.href.indexOf('/cart/index.html') !== -1) && (window.localStorage.getItem('Cart') !== null)) {
  function listCartItems () {
    let cartItems = window.localStorage.getItem('Cart')
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
      const cameraId = product._id
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
      cartItemsRow.setAttribute('class', 'd-flex w-50 align-items-center border rounded shadow-lg mb-2')
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

      orderInformation.products.push(cameraId)
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
    // Load into HTML Total Price excluding Tax
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
    // Load into HTML Price including Tax
    const taxedTotalPrice = document.getElementById('taxed-total')
    taxedTotalPrice.textContent = beautyTaxedTotal
    /// ////////////////////////////////////////////////////////////////
    // Lets Create the Customer Details Form requirements for validation
    // Load form elements
    const customerFirstName = document.getElementById('customer-firstname')
    const customerLastName = document.getElementById('customer-lastname')
    const customerEmail = document.getElementById('customer-email')
    const customerAddress = document.getElementById('customer-address')
    const customerAddress2 = document.getElementById('customer-address2')
    const customerTown = document.getElementById('customer-town')
    const customerPostcode = document.getElementById('customer-postcode')

    const validateCustomerInput = () => {
      // Specifying validation criteria
      const isNotEmpty = value => value !== ''
      const isLongEnough = value => value.length >= 3
      const containNumber = /[0-9]/
      const doNotContainNumber = value => !value.match(containNumber)
      const specialCharacter = /[$£°&+,:;=?@#|'<>.^*()!"{}_]/
      const doNotContainSpecialCharacter = value => !value.match(specialCharacter)
      const regexEmail = /.+@.+\..+/
      const isValidEmail = (value) => !!value.match(regexEmail)
      const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value)

      const firstName = customerFirstName.value
      const lastName = customerLastName.value
      const email = customerEmail.value
      const address = customerAddress.value
      const address2 = customerAddress2.value
      const city = customerTown.value
      const postcode = customerPostcode.value

      // Validation Process
      // First Name
      if (isValidInput(firstName)) {
        return firstName
      } else {
        customerFirstName.setAttribute('class', 'form-control alert-danger')
      }
      // Last Name
      if (isValidInput(lastName)) {
        return lastName
      } else {
        customerLastName.setAttribute('class', 'form-control alert-danger')
      }
      // Email
      if (isValidEmail(email)) {
        return email
      } else {
        customerEmail.setAttribute('class', 'form-control alert-danger')
      }
      // Address - Only for the first input
      if (isNotEmpty(address) && isLongEnough(address)) {
        return address
      } else {
        customerAddress.setAttribute('class', 'form-control alert-danger')
      }
      // Town/City
      if (isValidInput(city)) {
        return city
      } else {
        customerTown.setAttribute('class', 'form-control alert-danger')
      }
      // Postcode
      if (isValidInput(postcode)) {
        return postcode
      } else {
        customerPostcode.setAttribute('class', 'form-control alert-danger')
      }
    }

    const contact = {
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      address: customerAddress,
      address2: customerAddress2,
      city: customerTown,
      postcode: customerPostcode
    }
    orderInformation.contact = contact

    const postData = async (method, url, orderInformation) => {
      const response = await window.fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(orderInformation)
      })
      return await response.json()
    }

    document.getElementById('checkout').addEventListener('click', async function (event) {
      event.preventDefault()
      if (validateCustomerInput()) {
        document.getElementById('checkout').textContent = 'Submitting order'
        const validatedForm = validateCustomerInput()
        if (validatedForm !== false) {
          const response = await postData('POST', 'http://localhost:3000/api/cameras/order', orderInformation)
          window.localStorage.setItem('orderId', response.orderId)
          window.localStorage.setItem('orderInformation', JSON.stringify(orderInformation.contact))
          window.setTimeout(function () { window.location = `../confirmation.html?orderId=${response.orderId}` }, 1000)
        }
      } else {
        validateCustomerInput()
      }
    })
    console.log(orderInformation)
  }
  listCartItems()
}
