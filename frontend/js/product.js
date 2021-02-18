// JS for Home Page Product Listing
// Bootstrap template is in use
// Fetching a single product and creating its own page
import { addToCart } from '../pages/cart/cart.js'
// Load and/or create new Page with single product within
const query = window.location.search
const parameters = new URLSearchParams(query)
const apiUrl = 'http://localhost:3000/api/cameras/'
const cameraId = parameters.get('id')
const singleCamera = apiUrl + cameraId
// console.log(singleCamera)

// Start creating a Single Product
const createSingleProduct = async function () {
  // Fetching a single camera
  const response = await window.fetch(singleCamera, ['GET'])
  if (response.status !== 200) {
    console.log('Looks like we have a problem: ' + response.status)
    // Hide 'Loader' when a Product has been loaded
  } else if (response.ok) {
    document.getElementById('loading-spinner').style.display = 'none'
  }

  // Give name to the fetched response data
  const cameras = await response.json()
  const cameraName = cameras.name
  const cameraDescription = cameras.description
  const cameraImage = cameras.imageUrl
  // Polishing the look of the Price
  const beautyPrice = cameras.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
  const cameraLenses = cameras.lenses
  singleProduct(cameras, cameraName, cameraDescription, cameraImage, beautyPrice, cameraLenses)
}
createSingleProduct()

function singleProduct (cameras, cameraName, cameraDescription, cameraImage, beautyPrice, cameraLenses) {
  // Dynamic page title - gives Product Name as page title
  document.title = cameraName + ' - ' + cameraDescription
  // Dynamic breadcrumb - shows Product Name as navigation point (breadcrumb)
  document.getElementById('breadcrumb-product-name').textContent = cameraName

  // Lets fill the 'Single Product' container
  const newSingleProduct = document.getElementById('single-product')
  const newSingleProductBody = document.createElement('div')
  newSingleProductBody.setAttribute('class', 'd-flex flex-wrap w-75 shadow rounded bg-primary')
  // Creating a Left and Right side column
  // Left
  const newSingleProductColumnLeft = document.createElement('div')
  newSingleProductColumnLeft.setAttribute('class', 'flex-column w-50 pl-lg-3 pr-lg-3 rounded-left align-content-center bg-primary')
  // Fill it with the Product Image
  const newSingleProductImage = document.createElement('img')
  newSingleProductImage.setAttribute('id', 'product-img')
  newSingleProductImage.setAttribute('alt', 'Image of an old ' + cameraName)
  newSingleProductImage.setAttribute('class', 'w-100 rounded mt-5 mt-md-5 mb-md-5 flex-shrink-1 flex-grow-0')
  newSingleProductImage.src = cameraImage

  // Right
  const newSingleProductColumnRight = document.createElement('div')
  newSingleProductColumnRight.setAttribute('class', 'flex-column w-50 pl-lg-3 pr-lg-3 rounded-right align-content-center mt-3 mt-md-4 mt-lg-5 bg-primary')
  // Fetch Single Product Name and add to page
  const newSingleProductName = document.createElement('h4')
  newSingleProductName.setAttribute('id', 'product-name')
  newSingleProductName.setAttribute('class', 'row text-secondary text-responsive justify-content-center flex-shrink-1 mt-xl-3')
  newSingleProductName.textContent = cameraName
  // Fetch Single Product Description and add to page
  const newSingleProductDescription = document.createElement('p')
  newSingleProductDescription.setAttribute('id', 'product-description')
  newSingleProductDescription.setAttribute('class', 'row font-italic w-100 flex-grow-0 flex-shrink-1 m-1 pt-3')
  newSingleProductDescription.textContent = cameraDescription

  // Then lets create the Lens variation selector button with the Price
  const selectForm = document.createElement('form')
  selectForm.setAttribute('method', 'post')
  const lensSelectorGroup = document.createElement('select')
  lensSelectorGroup.setAttribute('id', 'selector')
  lensSelectorGroup.setAttribute('class', 'custom-select bg-secondary border-primary text-white w-50 mt-3 mb-3 mt-md-4 mt-lg-5')
  lensSelectorGroup.setAttribute('required', '')

  // Select button
  // Lets load the Personalization options - in this case the Lenses
  const lensSelectorButtonDefault = document.createElement('option')
  lensSelectorButtonDefault.setAttribute('class', 'text-white-50')
  lensSelectorButtonDefault.setAttribute('disabled', 'disabled')
  lensSelectorButtonDefault.setAttribute('selected', '')
  lensSelectorButtonDefault.textContent = 'Select'
  lensSelectorGroup.appendChild(lensSelectorButtonDefault)

  // Creating an option for each of the lenses
  cameraLenses.forEach(function (lens) {
    const lensSelectorButton = document.createElement('option')
    const lensId = lens[0] + lens[1]
    lensSelectorButton.setAttribute('class', 'bg-primary text-secondary')
    lensSelectorButton.textContent = lens
    lensSelectorButton.setAttribute('id', lensId)
    lensSelectorButton.setAttribute('value', cameraId + '(' + lensId + ')')
    lensSelectorGroup.appendChild(lensSelectorButton)
    lensSelectorGroup.addEventListener('change', (event) => {
      addToCartButton.textContent = beautyPrice
    })
  })

  // Add to Cart button with Price inside after Selecting a lens
  // Also Item count - product amount added to cart
  const addToCartButton = document.createElement('button')
  // Adding the chosen Product + variation to the cart and
  // showing it on the Cart icon - top of the page
  addToCartButton.addEventListener('click', () => {
    const lensValue = document.getElementById('selector').value
    if (lensValue === 'Select') {
      window.alert('Please select a lens to continue with your order!')
    } else {
      addToCart({
        _id: cameraId,
        name: cameraName,
        image: cameraImage,
        price: cameras.price,
        lens: lensValue
      })
    }
  })
  addToCartButton.setAttribute('id', 'add-to-cart')
  addToCartButton.setAttribute('type', 'submit')
  addToCartButton.textContent = 'Select a lens'
  addToCartButton.setAttribute('class', 'btn btn-secondary mt-sm-3 mt-md-4 mt-lg-5 mr-3 mr-md-3 float-right')

  // Left Column containing
  newSingleProductColumnLeft.appendChild(newSingleProductImage)

  // Right Column containing
  newSingleProductColumnRight.appendChild(newSingleProductName)
  newSingleProductColumnRight.appendChild(newSingleProductDescription)
  newSingleProductColumnRight.appendChild(lensSelectorGroup) // Lens selector group contains the 2 elements below this line
  newSingleProductColumnRight.appendChild(addToCartButton)

  // Product Body Row containing
  newSingleProductBody.appendChild(newSingleProductColumnLeft)
  newSingleProductBody.appendChild(newSingleProductColumnRight)

  // Single Product Page containing
  newSingleProduct.appendChild(newSingleProductBody)

  // If we are being redirected from Cart page to a specified Product page with pre-selected Lens variation
  // then show the user the previously selected product with the selected lens option

  // 1. Lets split up the URL we using to redirect the user to the product page
  const qs = window.location.search.substr(1).split('&').reduce(function (prev, cur) {
    const split = cur.split('=')
    prev[split[0]] = decodeURIComponent(split[1])
    return prev
  }, {})
  // 2. Then ONLY then we show pre-selection when the URL contains '&value='
  if (window.location.href.indexOf('&value=') !== -1) {
    $('#selector').val(qs.value)
    $('#add-to-cart').text(beautyPrice)
    // console.log(qs.value)
  }
}
