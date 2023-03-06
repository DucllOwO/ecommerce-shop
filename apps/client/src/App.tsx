import Admin from './pages/admin/Admin.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from './pages/customer/Customer.js';
import Home from './pages/customer/Home.js';
import Catalog from './pages/customer/Catalog.js';
import Product from './pages/customer/Product.js';
import Cart from './pages/customer/Cart.js';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route key={'admin'} path='/admin' element={<Admin />}>
          </Route>
          <Route key={'customer'} path='/' element={<Customer />}>
            <Route key={'home'} index element={<Home />}></Route>
            <Route key={'catalog'} path='catalog' element={<Catalog />}></Route>
            <Route key={'product'} path='product/:title' element={<Product />}></Route>
            <Route key={'cart'} path='cart' element={<Cart />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
