'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )

      const data = await res.json()
      if (res.ok) {
        toast.success('Reset code sent to your email!')
        window.location.href = '/auth/verify-code'
      } else {
        toast.error(data.message || 'Something went wrong!')
      }
    } catch {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="example@email.com"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all"
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>
      </form>
    </div>
  )
}
