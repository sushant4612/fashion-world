import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Verify: React.FC = () => {
  const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext) 
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'success' | 'failure' | null>(null);

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItem({});
        setStatus('success');
        setTimeout(() => navigate('/orders'), 3000); // Navigate after showing status
      } else {
        setStatus('failure');
        setTimeout(() => navigate('/cart'), 3000);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Verification failed. Please try again.');
      setStatus('failure');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="text-center">
        {loading ? (
          <div>
            <svg
              className="animate-spin h-10 w-10 text-black mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 11-9.33 4.8l1.46 1.46A10 10 0 104 12z"
              ></path>
            </svg>
            <p className="text-lg font-medium">Verifying your payment...</p>
          </div>
        ) : (
          <div>
            {status === 'success' ? (
              <div>
                <p className="text-2xl font-bold text-green-600">Payment Verified!</p>
                <p className="text-gray-600 mt-2">
                  Redirecting to your orders in a moment...
                </p>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold text-red-600">Payment Failed!</p>
                <p className="text-gray-600 mt-2">
                  Redirecting to your cart in a moment...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;