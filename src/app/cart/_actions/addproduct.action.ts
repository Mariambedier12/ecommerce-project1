'use server'
import { getTokenAuth } from "@/utlitis/getTokenAuth";

export async function addProduct(productId: string) {

  const token = await getTokenAuth();

  if (!token)
    throw new Error('Unauthorized, login first')

  const res = await fetch(`${process.env.API}/cart`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({ productId })
  })

  const payload = await res.json()
  return payload
}