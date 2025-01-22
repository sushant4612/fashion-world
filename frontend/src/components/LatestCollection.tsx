import React, { useContext, useEffect, useState } from 'react'
import { Product, ShopContext } from '../context/ShopContext'
import Title from './Title';
import { ProductItem } from './ProductItem';

const LatestCollection:React.FC = () => {
  const { products } = useContext(ShopContext);

  const [latestProduct, setLatestProduct] = useState<Product[]>([])

  useEffect(() => {
    
    
    setLatestProduct(products.slice(0,10));
    console.log(products);
  }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Discover the latest additions to our store! From trending styles to timeless classics, our collection offers something for everyone. Whether you’re updating your wardrobe or searching for the perfect gift, find your next favorite item here.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProduct.map((item) => (
          <div className='product-item-container transition-transform duration-500 hover:scale-105 hover:shadow-xl transform'>
            <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection