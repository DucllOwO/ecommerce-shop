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
import OrderManagement from './pages/admin/OrderManagement.js';
import ProductManagement from './pages/admin/ProductManagement.js';
import Collection from './pages/admin/Collection.js';
import Delivery from './pages/admin/Delivery.js';
import { ORDER_CANCELED_STATE, ORDER_COMPLETED_STATE, ORDER_WAITING_STATE, RECEIPT_PAID_STATE, RECEIPT_UNPAID_STATE } from './constant/constant.js';
import Tag from './pages/admin/Tag.js';
import Receipt from './pages/admin/Receipt.js';
import Discount from './pages/admin/Discount.js';
import Policy from './pages/admin/Policy.js';
import Feedback from './pages/admin/Feedback.js';
import Voucher from './pages/admin/Voucher.js';
import CustomerManagement from './pages/admin/CustomerManagement.js';
import UserProfileSetting from './pages/customer/UserProfileSetting.js';
import Order from './pages/customer/Order.js';
import OrderDetail from './pages/customer/OrderDetail.js';
import { useContext } from 'react';
import { AppContext } from './context/AppContext.js';
import BankPayment from './pages/customer/payment/BankPayment.js';
import LocalStorage from './helper/localStorage.js';
import { updateUser } from './api/CustomerAPI.js';
import dayjs from 'dayjs';
import ReturnPolicy from './pages/customer/ReturnPolicy.js';
import ImportingList from './pages/admin/ImportingList.js';
import Importing from './pages/admin/Importing.js';
import CashOnDeliveryPayment from './pages/customer/payment/CashOnDeliveryPayment.js';
import NotFound from './pages/customer/NotFound.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import ResetPasswordSuccess from './pages/auth/ResetPasswordSuccess.js';


function App() {
  const appCtx = useContext(AppContext);
  const currentUser = LocalStorage.getItem('user');
  console.log(currentUser);
  if (currentUser) {
    updateUser({ logged_date: dayjs(Date.now()) }, currentUser.id)
  }
  return (
    <BrowserRouter>
      <Routes>
        {appCtx?.user?.is_admin ? <Route key={'admin'} path='/admin' element={<Admin />}>
          <Route key={'dashboard'} path='dashboard' index element={<Dashboard />} />
          <Route key={'order'} path='order'>
            <Route key={'order_waiting'} path='waiting' element={<OrderManagement state={ORDER_WAITING_STATE} />} />
            <Route key={'order_completed'} path='completed' element={<OrderManagement state={ORDER_COMPLETED_STATE} />} />
            <Route key={'order_canceled'} path='canceled' element={<OrderManagement state={ORDER_CANCELED_STATE} />} />
          </Route>
          <Route key={'product'} path='product'>
            <Route key={'collection'} path='collection' element={<Collection />} />
            <Route key={'product'} path='' element={<ProductManagement />} />
            <Route key={'tag'} path='tag' element={<Tag />} />
          </Route>
          <Route key={'delivery'} path='delivery' element={<Delivery />} />
          <Route key={'Receipt'} path='receipt'>
            <Route key={'paid'} path='paid' element={<Receipt state={RECEIPT_PAID_STATE} />} />
            <Route key={'unpaid'} path='unpaid' element={<Receipt state={RECEIPT_UNPAID_STATE} />} />
          </Route>
          <Route key={'delivery'} path='delivery' element={<Delivery />} />
          <Route key={'feedback'} path='feedback' element={<Feedback />} />
          <Route key={'discount'} path='discount' element={<Discount />} />
          <Route key={'voucher'} path='voucher' element={<Voucher />} />
          <Route key={'policy'} path='policy' element={<Policy />} />
          <Route key={'customer-management'} path='customer-management' element={<CustomerManagement />}></Route>
          <Route key={'importing'} path='importing'>
            <Route key={'import'} path='import' element={<Importing />} />
            <Route key={'list'} path='list' element={<ImportingList />} />
          </Route>
        </Route> : null}

        <Route key={'customer'} path='/' element={<Customer />}>
          <Route key={'home'} index element={<Home />}></Route>
          <Route key={'catalog'} path='catalog' element={<Catalog />}></Route>
          <Route key={'product'} path='product/:slug' element={<Product />}></Route>
          <Route key={'cart'} path='cart' element={<Cart />}></Route>
          <Route key={'login'} path='login' element={<Login />}></Route>
          <Route key={'forgot-password'} path='forgot-password' element={<ForgotPassword />}>

          </Route>
          <Route key={'reset-password-success'} path='reset-password-success' element={<ResetPasswordSuccess />}></Route>
          <Route key={'signup'} path='signup' element={<SignUp />}></Route>
          <Route key={'user-profile-setting'} path='profile' element={<UserProfileSetting />}></Route>
          <Route key={'order'} path='orders' element={<Order />}>
          </Route>
          <Route key={'order-detail'} path='orders/:id' element={<OrderDetail />} />

          <Route key={'checkout'} path='checkout'>
            <Route key={'bank'} path='bank/:orderID' element={<BankPayment />} />
            <Route key={'cash-on-delivery'} path='cash-on-delivery/:orderID' element={<CashOnDeliveryPayment />} />
          </Route>
          <Route key={'return-policy'} path='return-policy' element={<ReturnPolicy />} />
          <Route key={'not-found'} path='*' element={<NotFound />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
