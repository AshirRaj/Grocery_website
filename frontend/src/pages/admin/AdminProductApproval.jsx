import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminProductApproval = () => {
  const { axios } = useAppContext();
  const [pendingProducts, setPendingProducts] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchPendingProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/pending-products");
      if (data.success) {
        setPendingProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/approve-product", {
        productId
      });
      if (data.success) {
        toast.success("Product approved successfully");
        fetchPendingProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async (productId) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/reject-product", {
        productId,
        rejectionReason
      });
      if (data.success) {
        toast.success("Product rejected successfully");
        setRejectionReason("");
        setSelectedProduct(null);
        fetchPendingProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openRejectModal = (product) => {
    setSelectedProduct(product);
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setSelectedProduct(null);
    setRejectionReason("");
  };

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Product Approval</h2>
      
      {pendingProducts.length === 0 ? (
        <p className="text-gray-500">No pending products for approval.</p>
      ) : (
        <div className="space-y-4">
          {pendingProducts.map((product) => (
            <div key={product._id} className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <img
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Price: Rs{product.price}</span>
                    <span>Offer Price: Rs{product.offerPrice}</span>
                    <span>Category: {product.category}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleApprove(product._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectModal(product)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Reject Product</h3>
            <p className="mb-2">Product: {selectedProduct.name}</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-2 border border-gray-300 rounded mb-4 h-24 resize-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={closeRejectModal}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedProduct._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductApproval;
