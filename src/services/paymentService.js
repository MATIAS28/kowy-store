const axios = require('axios');

async function paymentService(items, id){
 const url = 'https://api.mercadopago.com/checkout/preferences'

 const body = {
  items: items,

  notification_url:'https://6da9-192-141-93-237.sa.ngrok.io/api/save-order/'+id,

  back_urls: {
    failure: "/failure",
    pending: "/pending",
    success: "/success"
  },
}

  try {
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "aplication/json",
        Authorization: 'Bearer APP_USR-7086059441853470-100416-fcabc8b6e421e0c10b7715ba92196ea5-1203841275' 
      }
    })

    return payment.data.init_point

  } catch (e) {
    return {message: 'Error al generar el link de pago'}
  }
}

module.exports = {
  paymentService
}