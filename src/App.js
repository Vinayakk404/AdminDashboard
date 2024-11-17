import React, { useEffect } from 'react'
import SideBar from './Component/SideBar'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Products from './Component/Products'
import Dashboard from './Component/Dashboard'
import Charts from './Component/Charts'
import CreateProduct from './Component/CreateProduct'
import "./App.css"

import Modal from 'react-modal';

const App = () => {
 // Call this at the root of your app (usually in index.js or App.js)
Modal.setAppElement('#root'); 
  return (
    <>

      <div className='flex'>
        <SideBar />
        <div className='flex-1 ml-10 mt-20'>
          <Routes>
            <Route element={<Products />} path="/product" />
            <Route element={<Dashboard />} path="/" />
            <Route element={<Charts />} path="/chart" />
            <Route element={<CreateProduct />} path='create-product' />
          </Routes>
        </div>
      </div>


    </>
  )
}

export default App