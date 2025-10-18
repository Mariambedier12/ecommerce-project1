import getSingleProduct from '@/apis/singleproduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import Image from 'next/image';
import ProductItemBtn from '../_components/ProductItemBtn';



export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const data = await getSingleProduct(id) as ProductInterface


  if (!data) {
    return <div>Product not found</div>
  }

  return (
    <div className='flex flex-wrap md:flex-nowrap gap-4 items-center'>

      <div className=' w-full md:w-1/3'>
        <Image width={350} height={350} src={data.imageCover} className=' w-full' alt={data.title} />
      </div>

      <div className='w-full md:w-2/3 p-5'>
        <h3>{data.title}</h3>
        <p className='text-gra-400 my-3'>{data.description}</p>
        <p>{data.category.name}</p>
        <div className='flex justify-between my-5 items-center'>

          <span>{data.price}EGP</span>
          <span>{data.ratingsAverage} <i className="fa-solid fa-star text-rating"></i> </span>

        </div>

        <ProductItemBtn id={data._id}></ProductItemBtn>
      </div>
    </div>
  )
}
