import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

interface OrderItem {
  name: string;
  image: string[];
  price: number;
  quantity: number;
  size: string;
  date: string;
  paymentMethod: string;
  status: string;
}

const Orders: React.FC = () => {
  const { backendUrl, token, currency } = useContext(ShopContext) as {
    backendUrl: string;
    token: string | null;
    currency: string;
  };
  const [orderData, setOrderData] = useState<OrderItem[]>([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        let allOrderItem: OrderItem[] = [];
        res.data.data.forEach((order: any) => {
          order.items.forEach((item: any) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 bg-white text-black px-6 py-8 rounded-xl ">
      <div className="text-center mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 px-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Order Details */}
            <div className="flex items-start gap-6 text-sm md:text-base">
              <img
                className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-300"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="font-medium text-lg">{item.name}</p>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-sm">
                  Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2 text-sm">
                  Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Status and Action */}
            <div className="md:w-1/2 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;