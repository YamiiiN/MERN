import { useEffect, useState } from 'react'
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
// User Routes
import Login from './pages/user/Login'
import Register from './pages/user/Register'



import { auth } from './utils/firebase'
import { Navigate } from 'react-router-dom'
import Cart from './pages/Cart'
import OrdersList from './pages/order/OrdersList'


// FCM Notification Import
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./utils/firebase";




function App() {

  const [user, setUser] = useState(null);

  // FCM NOTIF
  const requestPermission = async () => {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BHJEtgBYusoTixGiCiJBaTd96UgsN4UavQBYo9AlsfNekkaEvCRCUm0WMCPtT0HNed0WH7e9FgdEKzaW_UdUXsA",
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }






  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)

      // FCM NOTIF
    requestPermission();

      console.log(user)
    })
  }, [])

  

  return (
    <>


      <BrowserRouter>

        <Routes>

          {/* HOME ROUTE */}
          <Route path='/' element={<Home />} />



          {/* CART ROUTE */}
          {/* <Route path='/cart' element={<Cart />} /> */}
          {/* <Route path='/cart' element={user ? <Cart /> :  <Navigate to={'/login'} /> }/> */}
          <Route path='/cart' element={<Cart />} />


          {/* User Routes */}
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/register'
            element={user ? <Navigate to={'/product/lists'} /> : <Register />}
          />
          <Route path='/login'
            element={user ? <Navigate to={'/product/lists'} /> : <Login />}
          />



          {/* Categories CRUD */}
          <Route path='/category/lists'
            element={user ? <CategoryLists /> : <Navigate to={'/login'} />}
          />
          <Route path='/category/create'
            element={user ? <CategoryCreate /> : <Navigate to={'/login'} />}
          />




          {/* Products CRUD */}
          <Route path='/product/lists'
            element={user ? <ProductLists /> : <Navigate to={'/login'} />}
          />
          <Route path='/product/create'
            element={user ? <ProductCreate /> : <Navigate to={'/login'} />}
          />
          <Route path='/product/update/:id'
            element={user ? <ProductUpdate /> : <Navigate to={'/login'} />}
          />



          {/* Orders */}
          <Route path='/orders'
            element={user ? <OrdersList /> : <Navigate to={'/login'} />}
          />

        </Routes>

      </BrowserRouter>




    </>
  )
}

export default App
