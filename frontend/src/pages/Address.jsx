import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });
  const { axios, user, navigate } = useContext(AppContext);
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:5000/api/address/add", { address });
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Address Details
        </h2>
        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
              pattern="^[A-Za-z]+(?:[\s]+[A-Za-z]+)*$"
              maxLength={50}
              title="First name should contain alphabets only"
            />
          </div>

          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
              pattern="^[A-Za-z]+$"
              title="Last name should contain alphabets only"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Street</label>
            <textarea
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded-md resize-none"
              required
              maxLength={100}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s,.-]{1,100}$"
              title="Street must contain both letters and numbers, max 100 characters"
              rows={2}
            />
          </div>



          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
              pattern="^[A-Za-z ]+$"
              title="City should contain alphabets only"
            />
          </div>

          <div>
            <label className="block text-gray-600">State</label>
            <select
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          <div>
  <label className="block text-gray-600">Zip Code</label>
  <input
    type="text"
    name="zipCode"
    value={address.zipCode}
    onChange={handleChange}
    className="w-full p-2 border rounded-md"
    pattern="\d{6}"
    maxLength={6}
    minLength={6}
    required
    title="Zip code must be exactly 6 digits"
  />
</div>


          <div>
            <label className="block text-gray-600">Country</label>
            <select
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Phone</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-200 text-gray-700">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={e => {
                  // Only allow 10 digits
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setAddress({ ...address, phone: val });
                }}
                className="w-full p-2 border rounded-r-md"
                required
                pattern="^[0-9]{10}$"
                title="Phone number should be exactly 10 digits"
                maxLength={10}
                inputMode="numeric"
                placeholder="Enter 10 digit mobile number"
              />
            </div>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Address;
