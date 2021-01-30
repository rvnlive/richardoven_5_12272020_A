// JS for Home Page Product Listing
// Bootstrap template is in use
// Putting ALL products onto front page
// Creating multiple products within a div
export function createProducts (product) {
  const newProductList = document.getElementById('product-list')

  // Creating a ProductCard
  const newProductCard = document.createElement('div')
  newProductCard.setAttribute('class', 'card border-secondary shadow ml-5 mr-5 mt-5')
  // Adding a Tooltip for Visual Feedback
  newProductCard.setAttribute('dataToggle', 'tooltip')
  newProductCard.setAttribute('dataPlacement', 'right')
  newProductCard.setAttribute('title', 'Tap for more information')
  newProductList.appendChild(newProductCard)

  // Then creating the Product within the card
  // Product Price
  const productPrice = product.price / 100
  const beautyPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  beautyPrice.format(productPrice)
  const newProductPrice = document.createElement('span')
  newProductPrice.setAttribute('id', 'product-price')
  newProductPrice.setAttribute('class', 'badge badge-pill badge-primary border-secondary text-secondary price-badge p-2')
  newProductPrice.textContent = '$' + productPrice

  // Then the ProductImage
  const productImage = product.imageUrl
  const newProductImage = document.createElement('img')
  // newProductImage.setAttribute('id', 'product-img', 'class', 'card-img-top flex-shrink-1 mw-25')
  newProductImage.setAttribute('id', 'product-img')
  newProductImage.setAttribute('class', 'card-img-top img-modifier border shadow flex-shrink-1 flex-grow-0')
  newProductImage.src = productImage
  newProductCard.appendChild(newProductImage)

  // Follows the CardBody, which contains the ProductInformation
  const newProductCardBody = document.createElement('div')
  newProductCardBody.setAttribute('class', 'card-body')

  // Lets fill the CardBody with Information
  // Product Name
  const productTitle = product.name
  const newProductTitle = document.createElement('h4')
  newProductTitle.setAttribute('id', 'product-name')
  newProductTitle.setAttribute('class', 'card-title text-secondary flex-shrink-1')
  newProductTitle.textContent = productTitle
  // Product Description
  const productDescription = product.description
  const newProductDescription = document.createElement('p')
  newProductDescription.setAttribute('id', 'product-description')
  newProductDescription.setAttribute('class', 'card-text font-italic text-truncate flex-shrink-1 m-0')
  newProductDescription.textContent = productDescription

  // Lets add them to its parent div - to ProductCardBody
  newProductCardBody.appendChild(newProductTitle)
  newProductCardBody.appendChild(newProductDescription)
  newProductCardBody.appendChild(newProductPrice)
  newProductCard.appendChild(newProductCardBody)
  newProductList.appendChild(newProductCard)

  // Clicking on a 'Product' card takes us to its own page
  newProductCard.addEventListener('click', (event) => {
    document.location.href = './pages/product.html?id=' + product._id
  })
}
