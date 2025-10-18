'use client'

import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductItemBtn from './ProductItemBtn'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

export default function ProductItem({ prod }: { prod: ProductInterface }) {
  const { data: session, status } = useSession()
  const [wishlist, setWishlist] = useState<string[]>([])


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
        setWishlist(data?.data?.map((item: { _id: string }) => item._id) || [])
      } catch (err) {
        console.error('Wishlist fetch error:', err)
      }
    }

    fetchWishlist()
  }, [status, session])

  const isInWishlist = wishlist.includes(prod._id)


  const toggleWishlist = async (id: string) => {
    if (status !== 'authenticated' || !session?.user?.token) {
      toast.error('Login First!')
      return
    }

    try {
      if (isInWishlist) {

        await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
          method: 'DELETE',
          headers: { token: session.user.token },
        })
        setWishlist((prev) => prev.filter((itemId) => itemId !== id))
        toast('Product Removed From Wishlist')
      } else {

        await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: session.user.token,
          },
          body: JSON.stringify({ productId: id }),
        })
        setWishlist((prev) => [...prev, id])
        toast.success('Product Added to wishlist')
      }
    } catch (err) {
      console.error('Toggle wishlist error:', err)
    }
  }

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
      <div className='p-5 m-3 mt-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer'>

        <Link href={`/products/${prod._id}`}>
          <Image width={300} height={300} src={prod.imageCover} className='w-full rounded-md' alt={prod.title} />
          <span className='text-main'>{prod.category.name}</span>
          <p className='line-clamp-1'>{prod.title}</p>

          <div className='flex justify-between my-5 items-center'>
            <div>
              <div className={prod.priceAfterDiscount ? 'line-through line-clamp-1' : ''}>{prod.price} EGP</div>
              {prod.priceAfterDiscount && <div>{prod.priceAfterDiscount} EGP</div>}
            </div>
            <span>{prod.ratingsAverage} <i className='fa-solid fa-star text-yellow-400'></i></span>
          </div>
        </Link>

        <div className='flex justify-end mb-3'>
          <i
            onClick={() => toggleWishlist(prod._id)}
            className={`fa-solid fa-heart text-2xl cursor-pointer transition-all duration-200 ${isInWishlist ? 'text-red-500 scale-110' : 'text-gray-700 hover:text-red-400'
              }`}
          ></i>
        </div>

        <ProductItemBtn id={prod._id} />
      </div>
    </div>
  )
}
