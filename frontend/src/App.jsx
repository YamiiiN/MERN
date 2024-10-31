import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminSideBar from './layouts/AdminSideBar'


// PAGES
import Home from './Home'
// Categories CRUD
import CategoryLists from './pages/category/CategoryLists'
import CategoryCreate from './pages/category/CategoryCreate'
// Product CRUD
import ProductLists from './pages/product/ProductLists'
import ProductCreate from './pages/product/ProductCreate'
import ProductUpdate from './pages/product/ProductUpdate'



function App() {

  return (
    <>


      <BrowserRouter>

        <Routes>
          
          {/* Categories CRUD */}
          <Route path='/category/lists' element={<CategoryLists />} />
          <Route path='/category/create' element={<CategoryCreate />} />


          {/* Products CRUD */}
          <Route path='/product/lists' element={<ProductLists />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path='/product/update/:id' element={<ProductUpdate />} />

        </Routes>

      </BrowserRouter>




    </>
  )
}

export default App
