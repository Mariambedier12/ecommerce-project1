import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  if (!token)
    return NextResponse.json({ status: 401, error: 'Unauthorized' })

  const res = await fetch(`${process.env.API}/cart`, {
    headers: {
      token: token.token
    }
  })

  const payload = await res.json()
  return NextResponse.json(payload)
}