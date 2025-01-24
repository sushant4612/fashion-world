import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

// Define the structure of the ShopContext
interface ShopContextType {
  currency: string;
  delivery_fee: number;
  getCartAmount: () => number;
}

const CartTotal: React.FC = () => {
  // Extracting values from the context
  const { currency, delivery_fee, getCartAmount } = useContext(
    ShopContext
  ) as ShopContextType;

  // Calculating total amount
  const cartAmount = getCartAmount();
  const totalAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
      {/* Title */}
      <div className="text-2xl font-semibold">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-4 mt-4 text-sm">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">
            {`${currency} ${cartAmount.toFixed(2)}`}
          </p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">{`${currency} ${delivery_fee.toFixed(
            2
          )}`}</p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center">
          <b className="text-gray-800">Total</b>
          <b className="text-lg font-bold text-gray-800">
            {`${currency} ${totalAmount.toFixed(2)}`}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;