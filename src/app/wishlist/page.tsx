'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from '../_component/Loading'
import { toast } from 'react-toastify'


interface WishlistItem {
  _id: string
  title: string
  imageCover: string
  price: number
}


export default function WishlistPage() {
  const { data: session, status } = useSession()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      if (status !== 'authenticated' || !session?.user?.token) return
      try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            token: session.user.token,
          },
        })
        const data = await res.json()
        console.log('Wishlist response:', data)
        setWishlist(data?.data || [])
      } catch (err) {
        console.error('Wishlist fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [status, session])

  if (loading) return <Loading />

  if (wishlist.length === 0)
    return (
      <div className="text-center text-gray-600 py-10 text-lg">Wishlist Is Empty!</div>
    )

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center border-b-2 border-gray-200 inline-block pb-2">
        WishList
      </h2>

      <div className="flex flex-col gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white border rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
          >

            <div className="flex items-center gap-5 w-full sm:w-2/3">
              <Image
                src={item.imageCover}
                alt={item.title}
                width={140}
                height={140}
                className="rounded-lg object-cover w-[140px] h-[140px]"
              />

              <div>
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-main font-bold text-xl">{item.price} EGP</p>
              </div>
            </div>


            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => handleRemove(item._id)}
                className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => handleAddToCart(item._id)}
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )


  async function handleRemove(id: string) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        method: 'DELETE',
        headers: { token: session?.user?.token || '' },
      })
      const data = await res.json()
      console.log('Removed:', data)
      setWishlist((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error('Remove error:', err)
    }
  }

  async function handleAddToCart(id: string) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: session?.user?.token || '',
        },
        body: JSON.stringify({ productId: id }),
      })
      const data = await res.json()
      console.log('Added to cart:', data)
      toast.success('Item Added To Cart')
    } catch (err) {
      console.error('Cart error:', err)
    }
  }
}
