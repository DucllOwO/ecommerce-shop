import Admin from './pages/admin/Admin.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from './pages/customer/Customer.js';
import Home from './pages/customer/Home.js';
import Catalog from './pages/customer/Catalog.js';
import Product from './pages/customer/Product.js';
import Cart from './pages/customer/Cart.js';
import Login from './pages/auth/Login.js';
import SignUp from './pages/auth/SignUp.js';
import Dashboard from './pages/admin/Dashboard.js';
import Order from './pages/admin/Order.js';
import ProductManagement from './pages/admin/ProductManagement.js';


function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        <Routes>

          <Route key={'admin'} path='/admin' element={<Admin />}>
            <Route key={'dashboard'} path='dashboard' index element={<Dashboard />} />
            <Route key={'order'} path='order' element={<Order />} />
            <Route key={'product'} path='product' element={<ProductManagement />} />
          </Route>
          <Route key={'customer'} path='/' element={<Customer />}>
            <Route key={'home'} index element={<Home />}></Route>
            <Route key={'catalog'} path='catalog' element={<Catalog />}></Route>
            <Route key={'product'} path='product/:title' element={<Product />}></Route>
            <Route key={'cart'} path='cart' element={<Cart />}></Route>
            <Route key={'login'} path='login' element={<Login />}></Route>
            <Route key={'signup'} path='signup' element={<SignUp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
