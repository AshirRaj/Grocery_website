import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { confirmAlert } from 'react-confirm-alert';

const ProductList = () => {
  const { axios } = useAppContext();
  const [products, setProducts] = useState([]);

  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product/seller-products");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Approval';
      default:
        return 'Unknown';
    }
  };

  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/product/remove", { id });
      if (data.success) {
        fetchSellerProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/product/stock", { id, inStock });
      if (data.success) {
        fetchSellerProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/product/update", { id, ...updatedData });
      if (response.data.success) {
        fetchSellerProducts();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("Server error: " + (error.response?.data?.message || "Please check server logs"));
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else {
        toast.error("An error occurred while updating the product.");
      }
    }
  };

  const handleUpdateProduct = (product) => {
    // Prompt for new product name
    const newName = prompt("Enter new product name:", product.name);
    if (newName === null) return;

    // Prompt for new product price
    const newProductPrice = prompt("Enter new product price:", product.price);
    if (newProductPrice === null) return;

    // Prompt for new offer price
    const newOfferPrice = prompt("Enter new offer price:", product.offerPrice);
    if (newOfferPrice === null) return;

    // Prompt for new category
    const newCategory = prompt("Enter new category:", product.category);
    if (newCategory === null) return;

    // Validate inputs
    if (!newName.trim()) {
      toast.error("Product name cannot be empty");
      return;
    }

    const price = parseFloat(newProductPrice);
    const offerPrice = parseFloat(newOfferPrice);

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid product price (greater than 0)");
      return;
    }

    if (isNaN(offerPrice) || offerPrice <= 0) {
      toast.error("Please enter a valid offer price (greater than 0)");
      return;
    }

    if (offerPrice >= price) {
      toast.error("Offer price must be less than product price");
      return;
    }

    if (!newCategory.trim()) {
      toast.error("Category cannot be empty");
      return;
    }

    const updatedData = {
      name: newName.trim(),
      price,
      offerPrice,
      category: newCategory.trim()
    };

    confirmAlert({
      title: 'Confirm update',
      message: 'Are you sure you want to update this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => updateProduct(product._id, updatedData)
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  const handleRemoveProduct = (id) => {
    confirmAlert({
      title: 'Confirm removal',
      message: 'Are you sure you want to remove this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeProduct(id)
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Update</th>
                <th className="px-4 py-3 font-semibold truncate">Remove</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={`http://localhost:5000/images/${product.image[0]}`}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">Rs{product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.approvalStatus)}`}>
                      {getStatusText(product.approvalStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onClick={() => toggleStock(product._id, !product.inStock)}
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={product.inStock}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleUpdateProduct(product)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;