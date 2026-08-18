import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const { axios } = useAppContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/product/seller-products`
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

  useEffect(() => {
    fetchProducts();
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

  return (
    <div className="flex-1 py-10 flex flex-col justify-between bg-white">
      <div className="md:p-10 p-4 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product Status Dashboard</h2>
          <p className="text-gray-600">Track the approval status of your products</p>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${product.image[0]}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.approvalStatus)}`}>
                        {getStatusText(product.approvalStatus)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Price: Rs{product.price}</span>
                      <span>Offer Price: Rs{product.offerPrice}</span>
                      <span>Category: {product.category}</span>
                    </div>
                    
                    {product.approvalStatus === 'rejected' && product.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                        <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                        <p className="text-sm text-red-700 mt-1">{product.rejectionReason}</p>
                        {product.rejectedAt && (
                          <p className="text-xs text-red-600 mt-2">
                            Rejected on: {new Date(product.rejectedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {product.approvalStatus === 'approved' && product.approvedAt && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">Product approved and now visible to customers!</p>
                        <p className="text-xs text-green-600 mt-1">
                          Approved on: {new Date(product.approvedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {product.approvalStatus === 'pending' && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">Your product is under review by admin.</p>
                        <p className="text-xs text-yellow-600 mt-1">
                          Submitted on: {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
