import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios, isAdmin, setIsAdmin } = useAppContext();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/admin") ? "/admin" : "/seller";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller || isAdmin) {
      if (basePath === "/admin") {
        navigate("/admin");
      } else {
        navigate("/seller");
      }
    }
  }, [isSeller, isAdmin, basePath, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginUrl = basePath === "/admin" ? "http://localhost:5000/api/admin/login" : "http://localhost:5000/api/seller/login";
      const { data } = await axios.post(loginUrl, {
        email,
        password,
      });
      if (data.success) {
        if (basePath === "/admin") {
          setIsAdmin(true);
          navigate("/admin");
        } else {
          setIsSeller(true);
          navigate("/seller");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Show login form if not authenticated for the current path
  const shouldShowLogin = basePath === "/admin" ? !isAdmin : !isSeller;
  
  if (!shouldShowLogin) return null;

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/50 text-gray-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">{basePath === "/admin" ? "Admin" : "Seller"}</span> Login
        </p>

        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
