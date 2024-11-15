const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, '..', 'public')));



const TELEGRAM_TOKEN = '7820176169:AAF8fm6YNG9mu2m7E8IptEh02YZHhlH8x1s';
const TELEGRAM_CHAT_ID = '1295584711';

app.post('/sendTelegramMessage', async (req, res) => {
  console.log('Отримані дані з форми:', req.body);  

  const { name, phone, product, productName, productPrice, productLenght, Color, ip, shir, dovg} = req.body;


  const message = `
    <b><u>Є новий заказ!</u></b>
    <b>Ім'я:</b> ${name}
    <b>Телефон:</b> ${phone}
    <b>Товар:</b> ${productName} (ID: ${product})
    <b>Ціна:</b> ${productPrice}
    <b>Довжина:</b> ${productLenght}
    <b>Колір:</b> ${Color}

    <b>Geolocation:</b>

    <b>IP-ADRESS</b> ${ip}
    <b>Широта</b> ${shir}
    <b>Довжина</b> ${dovg}
  `;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    res.status(200).send('Повідомлення успішно відправлене');
  } catch (error) {
    console.error('Помилка при відправці до Telegram:', error.response ? error.response.data : error.message);
    res.status(500).send('Помилка при відправці повідомлення');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
