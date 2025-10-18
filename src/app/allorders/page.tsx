'use client'
import React from 'react'
import Link from 'next/link'

export default function AllOrders() {
  return (
    <div className=" p-20 flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your order 💚<br />
        Your payment has been processed successfully.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Back to Home
      </Link>
    </div>
  )
}



