'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/app/cart/_actions/addproduct.action'
import { toast } from 'react-toastify';


export default function ProductItemBtn({ id }: { id: string }) {

  const queryClient = useQueryClient()


  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,

    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
    ,
    onError: () => {
      toast.error('Login first!')
    }

  })

  return (
    <Button className='w-full line-clamp-1 bg-green-500 cursor-pointer text-white  hover:bg-green-600 ' onClick={() => mutate(id)}> {isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Add To Cart'}</Button>
  )
}
