import axios from "axios";
import { useEffect, useState } from "react";

function Recommendations({ userId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/recommend/${userId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      {products.map(p => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
