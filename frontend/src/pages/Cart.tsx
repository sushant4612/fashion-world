import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

interface CartItem {
  _id: string;
  size: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const { updateQuantity, products, currency, cartItem, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItem[] = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="border-t pt-14">
      {/* Title Section */}
      <div className="text-2xl mb-3 text-black">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items Section */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-black grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData?.image[0]} alt={productData?.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData?.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData?.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border w-12 sm:w-20 px-2 py-1 text-black"
                type="number"
                min={1}
                defaultValue={item.quantity}
                aria-label="Update quantity"
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total Section */}
      <div className="flex justify-end mt-10">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700 hover:text-white border transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
