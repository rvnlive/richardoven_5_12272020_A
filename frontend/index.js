import { createProducts } from './products.js'
async function fetchCameras () {
  const response = await window.fetch('http://localhost:3000/api/cameras', ['GET'])
  if (response.status !== 200) {
    console.log('Looks like we have a problem: ' + response.status)
  } else if (response.ok) {
    hideLoader()
  }
  function hideLoader () {
    document.getElementById('loading-spinner').style.display = 'none'
  }
  const products = await response.json()
  return products
}
fetchCameras().then(products => {
  for (let i = 0; i < products.length; i++) {
    console.log(products[i])

    createProducts(products[i])
  }
})
