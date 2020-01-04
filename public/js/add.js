function id(ele) {
  return document.getElementById(ele);
}

const storeForm = id('store-form');
const storeId = id('store-id');
const storeAddress = id('store-address');

// Send POST request to API to add a store
async function addStore(e) {
  e.preventDefault();

  if (storeId.value === '' || storeAddress === '') {
    alert('Please fill in empty fields');
  }

  // form data
  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  // send form data to API
  try {
    const res = await fetch('/api/v1/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendBody)
    });

    // just to check the response (if any error)
    if (res.status === 400) {
      // for formatting a readable error in the 'catch' statement
      throw Error('Store already exist!');
    }

    // show message on success
    alert('Store added successfully!');

    // for redirecting to the home page
    window.location.href = 'index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addStore);
