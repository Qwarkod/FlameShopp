fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip-adress').value = data.ip;
  })
  .catch(error => console.error('Помилка при отриманні IP:', error));


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById('shir').value = position.coords.latitude;
      document.getElementById('dovg').value = position.coords.longitude;
    });
  } else {
    console.log("Геолокація не підтримується вашим браузером.");
  }



function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
      product: params.get('product'),
      productName: params.get('productName'),
      productLength: params.get('Length'), 
      productPrice: params.get('Price'),
      productColor: params.get('Color'),

  };
}

const queryParams = getQueryParams();

// Заповнення значень у hidden полях
if (queryParams.product) {
  document.getElementById('product').value = queryParams.product;
}
if (queryParams.productName) {
  document.getElementById('product-name').value = queryParams.productName;
}
if (queryParams.productLength) {
  document.getElementById('product-lenght').value = queryParams.productLength; 
}
if (queryParams.productPrice) {
  document.getElementById('product-price').value = queryParams.productPrice; 
}

if (queryParams.productColor) {
  document.getElementById('product-color').value = queryParams.productColor; 
}








document.getElementById('phone').addEventListener('input', function(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); 

  if (value.length > 16) {
    value = '+380 ' +
      value.slice(3, 5) + ' ' +
      value.slice(5, 8) + ' ' +
      value.slice(8, 10) + ' ' +
      value.slice(10, 16);
  } else if (value.length > 3) {
    value = '+380 ' +
      value.slice(3, 5) + ' ' +
      value.slice(5, 8) + ' ' +
      value.slice(8, 16);
  } else if (value.length > 0) {
    value = '+380 ' + value.slice(3);
  } else {
    value = '+380';
  }

  input.value = value;
});



document.getElementById('orderForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const productName = document.getElementById('product-name').value;
  const product = document.getElementById('product').value;
  const ip = document.getElementById('ip-adress').value;
  const shir = document.getElementById('shir').value;
  const dovg = document.getElementById('dovg').value;

  const productLenght = document.getElementById('product-lenght').value;
  const productPrice = document.getElementById('product-price').value;

  const Color = document.getElementById('product-color').value;


  const phoneInput = document.getElementById('phone');
  const phoneValue = phoneInput.value.replace(/\D/g, ''); 



  console.log(productPrice)
  console.log(productLenght)

  if (name.trim() === '') {
    alert('Заповніть поле!'); 
    return; 
  }
  
  if (phoneValue.length < 11) {
    alert('Номер повинен мати 11 цифр');
    return; 
  }

  // Отримання довжини в метрах
;

  try {
    const response = await fetch('/sendTelegramMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, productName, product, productLenght, productPrice, Color, ip, shir, dovg})
    });

    if (response.ok) {
      alert('Замовлення успішно відправлене!');
      window.location.href = 'https://qwarkod.github.io/ATLANT-shop/other/index.html';
    } else {
      alert('Сталася помилка при відправці замовлення.');
    }
  } catch (error) {
    console.error('Помилка:', error);
    alert('Не вдалося відправити замовлення.');
  }
});




