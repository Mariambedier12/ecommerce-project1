import React from 'react'
import CheckOut from '../_components/CheckOut'


export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const data = await params

  console.log(data)



  return (
    <div>

      <CheckOut cartId={data?.id}></CheckOut>

    </div>
  )
}
