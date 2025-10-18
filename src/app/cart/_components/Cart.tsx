'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartRes } from '../typescript/cart.interface'
import Loading from '../../_component/Loading'
import { Product } from '@/app/cart/typescript/cart.interface'
import cartImg from '../../../assets/images/cartempty.png'
import Image from 'next/image'
import { deleteItem } from '../_actions/deleteitem.action'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { clearCart } from '../_actions/clearCart.action'
import { updateCount } from '../_actions/updateCount.action'
import Link from 'next/link'


export default function Cart() {

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery<CartRes>({
    queryKey: ['cart'], queryFn: async () => {

      const res = await fetch(`/api/cart`)
      const payload = await res.json()
      return payload
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: clearCart,

    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
    ,
    onError: () => {
      toast.error('Login first!')
    }

  })

  if (isLoading) return <Loading />

  if (isError)
    return <h2>{error.message}</h2>

  if (data?.numOfCartItems === 0)
    return <div className='flex justify-center items-center vh-[80%]'>

      <Image alt='' src={cartImg} />

    </div>

  return (

    <div className=' py-5'>
      <h2>Total Cart Price: <span className='text-main font-bold '>{data?.data?.totalCartPrice || data?.totalCartPrice || 0}EGP</span></h2>
      <h3>Number Of Cart Items: <span className='text-main font-bold'>{data?.numOfCartItems}Items</span></h3>
      <div className="relative my-5  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

          </thead>
          <tbody>

            {data?.data.products.map(prod => <ProductItemTable
              key={prod._id} prod={prod}></ProductItemTable>)}

          </tbody>
        </table>
      </div>
      <Button className='block ml-auto my-5 cursor-pointer bg-green-500 text-white hover:bg-green-600' onClick={() => mutate()}> {isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Clear Cart'}</Button>

      <Button className='block ml-auto my-2 cursor-pointer bg-green-500 text-white  hover:bg-green-600'>
        <Link href={`/checkout/${data?.data._id}`}>CheckOut</Link>
      </Button>

    </div >
  )
}

function ProductItemTable({ prod }: { prod: Product }) {

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteItem,

    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
    ,
    onError: () => {
      toast.error('Login first!')
    }

  })

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: updateCount,

    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
    ,
    onError: () => {
      toast.error('Login first!')
    }

  })

  function handleUpdate() {
    if (prod.count < prod.product.quantity) {
      updateMutate({ productId: prod.product._id, count: prod.count + 1 })
    } else {
      toast.error('Not Available')
    }
  }

  return (

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <Image width={100} height={100} src={prod.product.imageCover} className="size-[100px] object-cover" alt="Apple Watch" />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.product.title}

      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button onClick={() => updateMutate({ productId: prod.product._id, count: prod.count - 1 })} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <div>

            <span id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" > {updatePending ? <i className='fa-solid fa-spin fa-spinner'></i> : prod.count}</span>

          </div>
          <button onClick={handleUpdate} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.price} EGP
      </td>
      <td className="px-6 py-4">
        <span onClick={() => mutate(prod.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
          {isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : <i className=' cursor-pointer fa-solid fa-trash text-red-500'></i>}
        </span>
      </td>
    </tr>

  )

}
