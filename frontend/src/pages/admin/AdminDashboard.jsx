import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminDashboard = () => {
  return (
    <div className="flex-1 py-10 flex flex-col justify-between bg-white">
      <div className="md:p-10 p-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the Grocery Store Admin Panel</p>
        </div>
        
        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          <Link
            to="/admin/orders"
            className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all duration-200"
          >
            <img src={assets.order_icon} alt="Orders" className="w-12 h-12" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">View All Orders</h3>
              <p className="text-gray-600">Manage and view all customer orders</p>
            </div>
          </Link>
        </div>
        
        <div className="text-center text-gray-500 mt-8">
          <p>Select an option from the sidebar or click on Orders above</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
