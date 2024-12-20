import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    location_id: '',
    image: null
  });
  const [updateProduct, setUpdateProduct] = useState({
    product_id: '',
    name: '',
    description: '',
    quantity: '',
    price: '',
    location_id: '',
    image: null
  });

  // Fetch products from backend when component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Load all products from backend
  const loadProducts = () => {
    axios.get('http://localhost:5001/api/products')  
      .then(response => {
        setProducts(response.data); 
      })
      .catch(error => {
        console.error("Error loading products:", error);
      });
  };

  // Handle input changes for new product form
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file input change for image upload in new product form
  const handleNewProductImageChange = (e) => {
    setNewProduct(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  // Handle input changes for update product form
  const handleUpdateProductChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file input change for image upload in update product form
  const handleUpdateProductImageChange = (e) => {
    setUpdateProduct(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  // Add new product
  const addProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    axios.post('http://localhost:5001/api/product', formData)
      .then(response => {
        alert(response.data.message);
        setNewProduct({
          name: '',
          description: '',
          quantity: '',
          price: '',
          location_id: '',
          image: null
        });
        loadProducts();  // Refresh the product list
      })
      .catch(error => {
        alert('Error adding product');
      });
  };

  // Update a product
  const updateProductData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in updateProduct) {
      formData.append(key, updateProduct[key]);
    }

    axios.put(`http://localhost:5001/api/product/${updateProduct.product_id}`, formData)
      .then(response => {
        alert(response.data.message);
        setUpdateProduct({
          product_id: '',
          name: '',
          description: '',
          quantity: '',
          price: '',
          location_id: '',
          image: null
        });
        loadProducts();  // Refresh the product list
      })
      .catch(error => {
        alert('Error updating product');
      });
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>

      <button onClick={loadProducts}>Load Products</button>

      <h2>All Products</h2>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong><br />
                {product.description} <br />
                Price: ${product.price} | Quantity: {product.quantity} | Location ID: {product.location_id} | Product ID: {product.id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <hr />

      <h2>Add New Product</h2>
      <form onSubmit={addProduct}>
        <label>Product Name:</label>
        <input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} required /><br />

        <label>Description:</label>
        <input type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} required /><br />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={newProduct.quantity} onChange={handleNewProductChange} required /><br />

        <label>Price:</label>
        <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleNewProductChange} required /><br />

        <label>Location ID:</label>
        <input type="number" name="location_id" value={newProduct.location_id} onChange={handleNewProductChange} required /><br />

        <label>Product Image:</label>
        <input type="file" name="image" onChange={handleNewProductImageChange} /><br />

        <button type="submit">Add Product</button>
      </form>

      <hr />

      <h2>Update Product</h2>
      <form onSubmit={updateProductData}>
        <label>Product ID:</label>
        <input type="number" name="product_id" value={updateProduct.product_id} onChange={handleUpdateProductChange} required /><br />

        <label>Product Name:</label>
        <input type="text" name="name" value={updateProduct.name} onChange={handleUpdateProductChange} /><br />

        <label>Description:</label>
        <input type="text" name="description" value={updateProduct.description} onChange={handleUpdateProductChange} /><br />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={updateProduct.quantity} onChange={handleUpdateProductChange} /><br />

        <label>Price:</label>
        <input type="number" step="0.01" name="price" value={updateProduct.price} onChange={handleUpdateProductChange} /><br />

        <label>Location ID:</label>
        <input type="number" name="location_id" value={updateProduct.location_id} onChange={handleUpdateProductChange} /><br />

        <label>Product Image:</label>
        <input type="file" name="image" onChange={handleUpdateProductImageChange} /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default App;

