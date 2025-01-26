import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const ProductComp: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Product | null>(null);
  const [image, setImage] = useState<string>('');
  const [size, setSize] = useState<string>('');

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item: Product) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0] || '');
      }
    };
    fetchProductData();
  }, [products, productId]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (productData) {
      addToCart(productData._id, size);
    }
  };

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image.map((item: string, index: number) => (
              <img
                key={index}
                src={item}
                alt="Product"
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 cursor-pointer rounded-md ${
                  image === item ? 'ring-2 ring-orange-500' : ''
                }`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="Selected Product" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-semibold text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img key={index} src={assets.star_icon} alt="Star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="Half Star" className="w-4" />
            <p className="pl-2 text-gray-600">(122 Reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-lg">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item: string, index: string) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 rounded-md border transition ${
                    item === size ? 'bg-orange-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm rounded-md shadow-md hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4.5" />
          <div className="text-sm text-gray-600 mt-5 space-y-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <button className="border px-5 py-3 text-sm font-semibold">Description</button>
          <button className="border px-5 py-3 text-sm">Reviews (122)</button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            {productData.description}
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, consequuntur quia. Eum reiciendis
            architecto repudiandae ex iusto ipsam recusandae. Consequuntur, officia. Ut, error esse unde voluptas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductComp;