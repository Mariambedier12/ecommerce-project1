'use server'
import { getTokenAuth } from "@/utlitis/getTokenAuth";

type shippingAddressType = {

  "details": string,
  "phone": string,
  "city": string

}

export async function checkoutOnline(cartId: string, url = "http://localhost:3000/allorders", shippingAddress: shippingAddressType) {

  const token = await getTokenAuth();

  if (!token)
    throw new Error('Unauthorized, login first')

  const res = await fetch(`${process.env.API}/orders/checkout-session/${cartId}?url=${url}`, {
    method: 'POST',
    body: JSON.stringify({
      shippingAddress
    }),
    headers: {
      token,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  return data

}