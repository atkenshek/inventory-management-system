import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ product = {}, onSuccess }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [quantity, setQuantity] = useState(product.quantity || "");
  const [price, setPrice] = useState(product.price || "");
  const [locationId, setLocationId] = useState(product.location_id || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("location_id", locationId);
    if (image) formData.append("image", image);

    try {
      if (product.id) {
        // Update product
        await axios.put(`http://localhost:5000/api/product/${product.id}`, formData);
      } else {
        // Add new product
        await axios.post("http://localhost:5000/api/product", formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product.id ? "Edit Product" : "Add Product"}</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </label>
      <br />
      <label>
        Price:
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <br />
      <label>
        Location ID:
        <input type="number" value={locationId} onChange={(e) => setLocationId(e.target.value)} required />
      </label>
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <br />
      <button type="submit">{product.id ? "Update Product" : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;
