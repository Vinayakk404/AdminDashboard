import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Modal for editing products
import { motion, AnimatePresence } from 'framer-motion'; // Framer Motion for animations

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products data from the JSON server
  const fetchData = () => {
    fetch('http://localhost:5000/vehicle')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open the modal to edit product details
  const openModal = (product) => {
    setSelectedProduct(product);
    setFormValues(product.specs);
    setIsModalOpen(true);
  };

  // Handle changes in the input form inside the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited product (both locally and server-side)
  const saveProduct = () => {
    const updatedProduct = { ...selectedProduct, specs: formValues };

    // Update the product on the server
    fetch(`http://localhost:5000/vehicle/${selectedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        // Update the product in the frontend state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product
          )
        );
        setIsModalOpen(false); // Close the modal after saving
        fetchData(); // Refetch the updated data
      })
      .catch((err) => console.error(err));
  };

  // Delete the product
  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/vehicle/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  // Filter products based on the search term
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) =>
        Object.values(product).some((val) =>
          val.toString().toLowerCase().includes(term)
        )
      )
    );
  };

  // Modal styling
  const modalStyles = {
    content: {
      backgroundColor: '#181333',
      color: 'white',
      borderRadius: '10px',
      padding: '20px',
      width: '50%',
      margin: '0 auto',
    },
  };

  return (
    <div className="min-h-screen p-8">
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full bg-[#1c193a] text-white"
        />
      </div>

      {/* Display product cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-[#211e46] rounded-lg shadow-lg overflow-hidden text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <motion.h2
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {product.name}
                </motion.h2>
                <div>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <motion.p
                      key={key}
                      className="mb text-gray-300 flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="font-bold mr-3">{key}:</span>
                      <span>{value}</span>
                    </motion.p>
                  ))}
                </div>

                {/* Edit button */}
                <motion.button
                  onClick={() => openModal(product)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Edit
                </motion.button>

                {/* Delete button */}
                <motion.button
                  onClick={() => deleteProduct(product.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal for editing */}
      <AnimatePresence>
        {selectedProduct && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={modalStyles}
            contentLabel="Edit Product"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">
                Edit Product: {selectedProduct.name}
              </h2>

              <div className="grid gap-4">
                {Object.entries(formValues).map(([key, value]) => (
                  <div key={key}>
                    <label className="font-bold">{key}:</label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="border p-2 rounded w-full bg-[#1c193a] text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveProduct}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
