import getProducts from '@/apis/products.api';
import { ProductInterface } from '@/interfaces/product.interface';
import ProductSearchList from './ProductSearch';

export default async function FeaturedProducts() {


  const data: ProductInterface[] = await getProducts();

  return (

    <div className='flex flex-wrap'>

      <ProductSearchList products={data} />

    </div>
  )
}
