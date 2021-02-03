// JS for Home Page Product Listing
// Bootstrap template is in use
// Fetching a single product and creating its own page

// Load and/or create new Cart with products within
const localStorage = window.localStorage
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
    hideLoader()
  }
  function hideLoader () {
    document.getElementById('loading-spinner').style.display = 'none'
  }
  // Give name to the fetched response data
  const camera = await response.json()
  const cameraName = camera.name
  const cameraDescription = camera.description
  const cameraImage = camera.imageUrl
  // Polishing the look of the Price
  const cameraPrice = camera.price / 100
  const beautyPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  beautyPrice.format(cameraPrice)
  const cameraLenses = camera.lenses

  function singleProduct () {
    // Dynamic page title - gives Product Name as page title
    document.title = cameraName + ' - ' + cameraDescription
    // Dynamic breadcrumb - shows Product Name as navigation point (breadcrumb)
    document.getElementById('breadcrumb-product-name').textContent = cameraName

    // Lets fill the 'Single Product' container
    const newSingleProduct = document.getElementById('single-product')
    const newSingleProductBody = document.createElement('div')
    newSingleProductBody.setAttribute('class', 'row w-75 shadow rounded bg-primary')
    // Creating a Left and Right side column
    // Left
    const newSingleProductColumnLeft = document.createElement('div')
    newSingleProductColumnLeft.setAttribute('class', 'col-6 rounded-left align-content-center bg-primary')
    // Fill it with the Product Image
    const newSingleProductImage = document.createElement('img')
    newSingleProductImage.setAttribute('id', 'product-img')
    newSingleProductImage.setAttribute('alt', 'Image of an old ' + cameraName)
    newSingleProductImage.setAttribute('class', 'w-100 rounded mt-5 mt-md-5 mb-md-5 flex-shrink-1 flex-grow-0')
    newSingleProductImage.src = cameraImage

    // Right
    const newSingleProductColumnRight = document.createElement('div')
    newSingleProductColumnRight.setAttribute('class', 'col-6 rounded-right align-content-center mt-3 mt-md-4 mt-lg-5 bg-primary')
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
    lensSelectorButtonDefault.setAttribute('disabled', '')
    lensSelectorButtonDefault.setAttribute('selected', '')
    lensSelectorButtonDefault.textContent = 'Select'
    lensSelectorGroup.appendChild(lensSelectorButtonDefault)
    cameraLenses.forEach(function (lens) {
      const lensSelectorButton = document.createElement('option')
      const lensId = lens[0] + lens[1]
      lensSelectorButton.setAttribute('class', 'bg-primary text-secondary')
      lensSelectorButton.textContent = lens
      lensSelectorButton.setAttribute('id', 'option')
      lensSelectorButton.setAttribute('value', cameraId + lensId)
      lensSelectorGroup.appendChild(lensSelectorButton)
      // Modify Add to Cart button after choice given
      lensSelectorGroup.addEventListener('change', (event) => {
        addToCartButton.setAttribute('value', 'Add to cart: $' + cameraPrice)
      })
      //   console.log(lens)
    })

    // Fetch Single Product Price and add to page
    const newSingleProductPrice = document.createElement('h4')
    newSingleProductPrice.setAttribute('id', 'product-price')
    newSingleProductPrice.setAttribute('class', 'text-secondary flex-grow-0 flex-shrink-1 mt-sm-3 mt-md-4 mt-lg-5 pl-md-5 mr-3 mr-md-3 float-right')
    newSingleProductPrice.textContent = '$' + cameraPrice

    // Add to Cart button with Price inside
    const addToCartButton = document.createElement('input')
    addToCartButton.setAttribute('id', 'addtocart')
    addToCartButton.setAttribute('type', 'submit')
    addToCartButton.setAttribute('value', 'Select a lens')
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

    // Lets to give a function to the Add to Cart with Price button
    function addToCart () {

    }
    addToCart()
  }
  singleProduct()
}
createSingleProduct()
