import React, { createContext, useEffect, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartItem{
    [itemId: string]: {
        [size: string]: number
    };
}

export interface Product{
    _id: string;
    price: number;
    [key: string]: any
}

interface ShopContextValue{
    products: Product[];
    currency: string;
    delivery_fee: number;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    cartItem: CartItem;
    addToCart: (itemId: string, size: string) => Promise<void>;
    getCartCount: () => number;
    updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
    getCartAmount: () => number;
    navigate: ReturnType<typeof useNavigate>;
    backendUrl: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    token: string;
    setCartItem: React.Dispatch<React.SetStateAction<CartItem>>;
}


interface ShopContextProviderProps{
  children: ReactNode;
}

export const ShopContext = createContext({} as ShopContextValue);

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<CartItem>({});
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [token, setToken] = useState<string>("");

    const addToCart = async (itemId: string, size: string) => {
        if(!size){
            toast.error("Select Product Size");
            return;
        }

        const cartData = structuredClone(cartItem);

        if(cartData[itemId]){
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        }else{
            cartData[itemId] = { [size]: 1};
        }

        setCartItem(cartData);

        if(token){
            try{
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token }});
            }catch(error: any){
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = (): number => {
        let totalCount = 0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                totalCount += cartItem[items][item] || 0;
            }
        }
        return totalCount;
    };

    const getCartAmount = (): number => {
        let totalAmount = 0;
    
        for (const items in cartItem) {
          const itemInfo = products.find((product) => product._id === items);
          if (itemInfo) {
            for (const item in cartItem[items]) {
              totalAmount += (itemInfo.price || 0) * (cartItem[items][item] || 0);
            }
          }
        }
    
        return totalAmount;
    }

    const updateQuantity = async (itemId: string, size: string, quantity: number) => {
        const cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
    
        setCartItem(cartData);
    
        if (token) {
          try {
            await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
          } catch (error: any) {
            console.error(error);
            toast.error(error.message);
          }
        }
    };

    const getProductsData = async () => {
      
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        console.log(backendUrl);
          if (response.data.success) {
            setProducts(response.data.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error: any) {
          console.error(error);
          toast.error(error.message);
        }
    };

    const getUserCart = async (userToken: string) => {
        try {
          console.log("token", userToken);
          const response = await axios.get(`${backendUrl}/api/cart/get`, { headers: { token: userToken } });
          
          if (response.data.success) {
            setCartItem(response.data.cartData);
          }
        } catch (error: any) {
          console.error("hello" + error);
          toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!token && storedToken) {
          setToken(storedToken);
          getUserCart(storedToken);
        }
    }, [token]);
    
    const value: ShopContextValue = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItem,
    };
    
    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;

}

export default ShopContextProvider;