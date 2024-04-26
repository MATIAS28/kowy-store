const axios = require('axios');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago')

const client = new MercadoPagoConfig({accessToken: process.env.MP_AUTH})

const MP_URL = process.env.MP_URL
const MP_NOTIFICATION_URL = process.env.MP_NOTIFICATION_URL
const MP_API = process.env.MP_API

async function paymentService(items, id){
    const preference = new Preference(client)

    const getPaymentLink = await preference.create({ body: 
      {
        items: items,
        notification_url: MP_NOTIFICATION_URL+id
      }
    })
    .then(res => res.init_point)
    .catch(e => console.log(e));

    return getPaymentLink
}

async function validatePaymentService (id){
  const payment = new Payment(client);
  const order = {
    id: undefined,
    date: undefined,
    paid: false
  }

  try {
    const getPayment = await payment.get({ id: id })

    if(getPayment.status === 'approved' && getPayment.status_detail === 'accredited'){
      order.id = id
      order.date = getPayment.date_approved
      order.paid = true
    }

    console.log(order);

    return {paymentInfo: order}
  } catch (e) {
    console.log(e);
    throw e
  }
}

module.exports = {
  paymentService,
  validatePaymentService
}