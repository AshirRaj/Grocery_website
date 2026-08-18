import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios"; 
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
 const [cartItems, setCartItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // check seller status
const fetchSeller = async () => {
  try {
    const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/seller/is-auth`
);
    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
      // Don't show toast for unauthorized
      if (data.message !== "Unauthorized") {
        toast.error(data.message);
      }
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      toast.error(error.message);
    } else {
      setIsSeller(false);
    }
  }
};

// check admin status
const fetchAdmin = async () => {
  try {
    const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/admin/is-auth`
);
    if (data.success) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      if (data.message !== "Unauthorized") {
        toast.error(data.message);
      }
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      toast.error(error.message);
    } else {
      setIsAdmin(false);
    }
  }
};

  // fetch user auth status ,user Data and cart items
const fetchUser = async () => {
  try {
    const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/user/is-auth`
);
    if (data.success) {
      setUser(data.user);
      setCartItems(data.user.cart);
    } else {
      // Don't show toast for unauthorized
      if (data.message !== "Unauthorized") {
        toast.error(data.message);
      }
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      toast.error(error.message);
    }
  }
};
  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/product/list`
);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {}); // safeguard for undefined

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`cart updated`);
  };

  // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };
useEffect(() => {
  fetchSeller();
  fetchAdmin();
  fetchUser();
  fetchProducts();
}, []);


  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/cart/update`,
  { cartItems }
);

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    isAdmin,
    setIsAdmin,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
