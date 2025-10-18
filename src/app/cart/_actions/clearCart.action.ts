'use server'
import { getTokenAuth } from "@/utlitis/getTokenAuth";

export async function clearCart() {

  const token = await getTokenAuth();
  if (!token)
    throw new Error('Unauthorized, login first')
  const res = await fetch(`${process.env.API}/cart`, {
    cache: 'no-store',
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }

  })

  const payload = await res.json()
  return payload
}