import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const CreateProduct = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    engine: '',
    mileage: '',
    color: '',
    category: 'Scooty', // Default to one of the categories
    price: '',
    stock: '',
    imageType: 'url', // 'url' or 'upload'
    imageUrl: '',
    imageFile: null,
  });
  
  const [snackbarMessage, setSnackbarMessage] = useState(null); // Snackbar message

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setFormValues((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  // Handle image source change (URL or File)
  const handleImageSourceChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      imageType: e.target.value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Construct the product data object
    const productData = {
      name: formValues.name,
      image: formValues.imageType === 'url' ? formValues.imageUrl : '', 
      specs: {
        Engine: formValues.engine,
        Mileage: formValues.mileage,
        Color: formValues.color,
        Category: formValues.category,
        Price: formValues.price,
        Stock: formValues.stock,
      },
    };
  
    if (formValues.imageType === 'file' && formValues.imageFile) {
      // Handle image file upload if necessary
      console.log('Image file selected:', formValues.imageFile);
    }
  
    fetch('http://localhost:5000/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
        return response.json();
      })
      .then((data) => {
        setSnackbarMessage('Product created successfully!');
        setFormValues({
          name: '',
          engine: '',
          mileage: '',
          color: '',
          category: 'Scooty', // Reset to default category
          price: '',
          stock: '',
          imageType: 'url',
          imageUrl: '',
          imageFile: null,
        });
      })
      .catch((error) => {
        setSnackbarMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen p-8 bg-[#1c193a] text-white">
      <h1 className="text-2xl font-bold mb-8">Create New Product</h1>

      {/* Snackbar */}
      {snackbarMessage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 right-4 bg-green-400 text-white p-4 rounded-lg shadow-lg"
        >
          {snackbarMessage}
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Product Name */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Engine */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Engine:</label>
          <input
            type="text"
            name="engine"
            value={formValues.engine}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Mileage */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Mileage:</label>
          <input
            type="text"
            name="mileage"
            value={formValues.mileage}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Color */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Color:</label>
          <input
            type="text"
            name="color"
            value={formValues.color}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Category */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Category:</label>
          <select
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
          >
            <option value="Scooty">Scooty</option>
            <option value="EV">EV</option>
            <option value="Bike">Bike</option>
            <option value="Moped">Moped</option>
          </select>
        </motion.div>

        {/* Price */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Price:</label>
          <input
            type="text"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Stock */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Stock:</label>
          <input
            type="number"
            name="stock"
            value={formValues.stock}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            required
          />
        </motion.div>

        {/* Image Source Selection */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block font-bold">Image Source:</label>
          <select
            name="imageType"
            value={formValues.imageType}
            onChange={handleImageSourceChange}
            className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
          >
            <option value="url">Image URL</option>
            <option value="upload">Upload Image</option>
          </select>
        </motion.div>

        {/* Image URL or Upload */}
        {formValues.imageType === 'url' ? (
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block font-bold">Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            />
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block font-bold">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full p-2 rounded bg-[#211e46] border border-gray-600 text-white"
            />
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Product
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CreateProduct;
