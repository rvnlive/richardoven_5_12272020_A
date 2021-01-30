// JS for Home Page Product Listing
// Bootstrap template is in use
// Fetching a single product and creating its own page
const query = window.location.search
const parameters = new URLSearchParams(query)
const apiUrl = 'http://localhost:3000/api/cameras/'
const cameraId = parameters.get('id')
const singleCamera = apiUrl + cameraId
console.log(singleCamera)

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
  const cameraPrice = camera.price / 100
  const beautyPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  beautyPrice.format(cameraPrice)

  function singleProduct () {
    // Dynamic page title - gives Product Name as page title
    document.title = cameraName + ' - ' + cameraDescription
    // Dynamic breadcrumb - shows Product Name as navigation point (breadcrumb)
    document.getElementById('breadcrumb-product-name').textContent = cameraName

    // Lets fill the 'Single Product' container
    const newSingleProduct = document.getElementById('single-product')
    const newSingleProductBody = document.createElement('div')
    newSingleProductBody.setAttribute('class', 'row w-100 shadow rounded')
    // Creating a Left and Right side column
    // Left
    const newSingleProductColumnLeft = document.createElement('div')
    newSingleProductColumnLeft.setAttribute('class', 'col-6 rounded-left bg-primary')
    // Fill it with the Product Image
    const newSingleProductImage = document.createElement('img')
    newSingleProductImage.setAttribute('id', 'product-img')
    newSingleProductImage.setAttribute('class', 'w-100 rounded mt-3 mb-3 flex-shrink-1 flex-grow-0')
    newSingleProductImage.src = cameraImage

    // Right
    const newSingleProductColumnRight = document.createElement('div')
    newSingleProductColumnRight.setAttribute('class', 'col-6 rounded-right align-content-center bg-primary')
    // Fetch Single Product Name and add to page
    const newSingleProductName = document.createElement('h4')
    newSingleProductName.setAttribute('id', 'product-name')
    newSingleProductName.setAttribute('class', 'row text-secondary justify-content-center mt-2 mt-md-3 flex-shrink-1')
    newSingleProductName.textContent = cameraName
    // Fetch Single Product Description and add to page
    const newSingleProductDescription = document.createElement('h6')
    newSingleProductDescription.setAttribute('id', 'product-description')
    newSingleProductDescription.setAttribute('class', 'row font-italic w-100 flex-shrink-1 m-1 pt-3')
    newSingleProductDescription.textContent = cameraDescription

    // Fetch Single Product Description and add to page
    const newSingleProductPrice = document.createElement('h6')
    newSingleProductPrice.setAttribute('id', 'product-price')
    newSingleProductPrice.setAttribute('class', 'row text-secondary float-right mt-5 mr-3')
    newSingleProductPrice.textContent = '$' + cameraPrice

    newSingleProductColumnLeft.appendChild(newSingleProductImage)
    newSingleProductColumnRight.appendChild(newSingleProductName)
    newSingleProductColumnRight.appendChild(newSingleProductDescription)
    newSingleProductColumnRight.appendChild(newSingleProductPrice)
    newSingleProductBody.appendChild(newSingleProductColumnLeft)
    newSingleProductBody.appendChild(newSingleProductColumnRight)
    newSingleProduct.appendChild(newSingleProductBody)
  }
  singleProduct()
}
createSingleProduct()
