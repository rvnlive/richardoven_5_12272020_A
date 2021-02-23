if ((window.location.href.indexOf('/cart/index.html') !== -1) && (window.localStorage.getItem('Cart') !== null)) {
// Variables form
  const form = document.querySelector('form') // Binds the form section to the js
  const checkoutButton = document.getElementById('checkout')

  const orderInformation = {
    contact: {},
    totalPrice: [],
    products: []
  }

  let cartItems = window.localStorage.getItem('Cart')
  cartItems = JSON.parse(cartItems)
  for (let i = 0; i < cartItems.length; i++) {
    const product = cartItems[i]
    orderInformation.products.push(product._id)
  }
  const taxedTotal = window.localStorage.getItem('taxedTotal')
  orderInformation.totalPrice.push(taxedTotal)

  const containNumber = /[0-9]/
  const regexEmail = /.+@.+\..+/
  const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/

  const isNotEmpty = value => value !== '' // Checks the field is not empty
  const isLongEnough = value => value.length >= 2 // Check there is enough characters
  const doNotContainNumber = value => !value.match(containNumber) // Checks there's no number
  const doNotContainSpecialCharacter = value => !value.match(specialCharacter) // Checks there's no special character
  const isValidEmail = (value) => !!value.match(regexEmail) // Checks the input is in the right format
  const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value)// renvoie true si toutes les conditions sont vérifiées

  /// ////////////////////////////////////////////////////////////////
  // Lets Create the Customer Details Form requirements for validation
  // Load form elements
  const firstName = form[0]
  const firstNameFeedback = document.getElementById('firstname-feedback')

  const lastName = form[1]
  const lastNameFeedback = document.getElementById('lastname-feedback')

  const email = form[2]
  const emailFeedback = document.getElementById('email-feedback')

  const address = form[3]
  const addressFeedback = document.getElementById('address-feedback')

  const city = form[5]
  const cityFeedback = document.getElementById('town-feedback')

  const postcode = form[7]
  const postcodeFeedback = document.getElementById('postcode-feedback')

  // Lets validate the User Inputs
  const formValidate = () => {
    if (isValidInput(firstName.value)) {
      firstName.setAttribute('class', 'form-control item border-secondary')
      firstNameFeedback.setAttribute('class', 'text-secondary')
      firstNameFeedback.textContent = 'Looks good!'
    } else {
      firstName.focus()
      firstName.setAttribute('class', 'form-control item border-danger')
      firstNameFeedback.setAttribute('class', 'text-danger')
      firstNameFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    if (isValidInput(lastName.value)) {
      lastName.setAttribute('class', 'form-control item border-secondary')
      lastNameFeedback.setAttribute('class', 'text-secondary')
      lastNameFeedback.textContent = 'Looks good!'
    } else {
      lastName.focus()
      lastName.setAttribute('class', 'form-control item border-danger')
      lastNameFeedback.setAttribute('class', 'text-danger')
      lastNameFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    if (isValidEmail(email.value)) {
      email.setAttribute('class', 'form-control item border-secondary')
      emailFeedback.setAttribute('class', 'text-secondary')
      emailFeedback.textContent = 'Looks good!'
    } else {
      email.focus()
      email.setAttribute('class', 'form-control item border-danger')
      emailFeedback.setAttribute('class', 'text-danger')
      emailFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    if (isNotEmpty(address.value) && isLongEnough(address.value) && doNotContainSpecialCharacter(address.value)) {
      address.setAttribute('class', 'form-control item border-secondary')
      addressFeedback.setAttribute('class', 'text-secondary')
      addressFeedback.textContent = 'Looks good!'
    } else {
      address.focus()
      address.setAttribute('class', 'form-control item border-danger')
      addressFeedback.setAttribute('class', 'text-danger')
      addressFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    if (isValidInput(city.value)) {
      city.setAttribute('class', 'form-control item border-secondary')
      cityFeedback.setAttribute('class', 'text-secondary')
      cityFeedback.textContent = 'Looks good!'
    } else {
      city.focus()
      city.setAttribute('class', 'form-control item border-danger')
      cityFeedback.setAttribute('class', 'text-danger')
      cityFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    if (doNotContainSpecialCharacter(postcode.value) && isLongEnough(postcode.value)) {
      postcode.setAttribute('class', 'form-control item border-secondary')
      postcodeFeedback.setAttribute('class', 'text-secondary')
      postcodeFeedback.textContent = 'Looks good!'
    } else {
      postcode.focus()
      postcode.setAttribute('class', 'form-control item border-danger')
      postcodeFeedback.setAttribute('class', 'text-danger')
      postcodeFeedback.textContent = 'Missing or Incorrect!'
      return false
    }

    // After validation, data being saved into orderInformation array
    orderInformation.contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    }
  }

  // Send data to API
  const postData = async (method, url, data) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(data)
    })
    return await response.json()
  }

  // Checkout button: Validating form data, sending this data to server with productID from Cart
  checkoutButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const validForm = formValidate()
    if (validForm !== false) {
      const response = await postData('POST', 'http://localhost:3000/api/cameras/order', orderInformation)
      window.sessionStorage.setItem('orderId', response.orderId)
      window.sessionStorage.setItem('orderInfo', JSON.stringify(orderInformation))
      window.localStorage.clear()
      window.setTimeout(function () { window.location = `../confirmation.html?orderId=${response.orderId}` }, 1000)
    }
  })
}
