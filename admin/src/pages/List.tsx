import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string[];
}

interface ListProps {
    token: string
}

const List: React.FC<ListProps> = ({ token }) => {
    const [list, setList] = useState<Product[]>([]);
    
    const fetchList = async (): Promise<void> => {
        try {
          const response = await axios.get(`${backendUrl}/api/product/list`);
          if (response.data.success) {
            setList(response.data.data);
            console.log(response.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error: any) {
          console.error(error);
          toast.error(error.message || 'An error occurred');
        }
    };

    const removeProduct = async (id: string): Promise<void> => {
        try {
          const response = await axios.post(
            `${backendUrl}/api/product/remove`,
            { id },
            { headers: { token } }
          );
    
          if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error: any) {
          console.error(error);
          toast.error(error.message || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <p className="mb-2 mt-4">All Products List</p>
            <div className="flex flex-col gap-2">
                {/* -------- List Table Title -------- */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>
                {/* -------- Product List -------- */}
                {list.map((item) => (
                <div
                    className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
                    key={item._id}
                >
                    <img className="w-12" src={item.image[0]} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>
                    {currency}
                    {item.price}
                    </p>
                    <p
                    onClick={() => removeProduct(item._id)}
                    className="text-right md:text-center cursor-pointer text-lg"
                    >
                    X
                    </p>
                </div>
                ))}
         </div>
        </>
    )
}

export default List