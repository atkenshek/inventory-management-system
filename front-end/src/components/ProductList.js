import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                ID
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Price
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Quantity
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Created At
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Location ID
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {product.id}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {product.name}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {product.description}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  ${parseFloat(product.price).toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {product.quantity}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {new Date(product.created_at).toLocaleString()}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {product.location_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
